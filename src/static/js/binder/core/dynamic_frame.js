import { Controller } from "../controller.js";
import { parseDuration, parseBoolean } from "../util.js";

/*
This is the base controller for DynamicFrames
Extend this and override params() and optionally replaceContent()

The root HTML node must have a `:url` attribute - this can be relative or absolute
To pass params use the attribute format `:param-name`

Example HTML:
<dynamic-frame :url="/some/url" :param-day="Monday"></dynamic-frame>
*/

/**
 * @class
 * @name DynamicFrame
 * @namespace DynamicFrame
 * @property url - The URL to fetch
 * @property executeScripts - If true will find and execute scripts in the response body
 * @property mode - The mode to use for adding the response content, either `replace`, `append` or `prepend` (Defaults to `replace`)
 * @property mountPoint - A selector used to find the element to mount to within the element (defaults to the root element)
 * @property autoRefresh - Will call `refresh()` automatically at the specified interval (Intervals are in the format `${num}${unit}` where unit is one of ms, s, m, h: `10s` = 10 seconds)
 * @property delay - An artificial delay applied before displaying the content
 * @property stateKey - An optional key, if specified the frame state will be stored and loaded from the page query string
 * @property contained - If `true` then the frame will be self contained, clicking links and submitting forms will be handled within the frame and **not** impact the surrounding page
 * @example
 *  <dynamic-frame :url="/some/url" :param-day="Monday" :mount-point=".content">
 *     <div class="content"></div>
 *  </dynamic-frame>
 */
class DynamicFrame extends Controller {
    /**
     * Setup the DynamicFrame and do the initial request/load
     * @memberof! DynamicFrame
     *
     */
    async init() {
        this.contents = "";

        // Keep track of pending requests so we can cancel when updating multiple things
        this._reqAbort = [];

        this.args.executeScripts = parseBoolean(this.args.executeScripts);

        if (this.args.autoRefresh) {
            this.setAutoRefresh();
        }

        if (!this.args.delay) this.args.delay = 0;

        // If we have a stateKey then track and handle the state
        if (this.args.stateKey) {
            const handleStateChange = () => {
                let frameState = this.loadState();

                // Update and refresh
                if (frameState && Object.keys(frameState).length > 0 && this._internal.frameState !== frameState) {
                    this.args.url = frameState[`${this.args.stateKey}-url`];
                    this._internal.frameState = frameState;
                    this.refresh();
                }
            };

            // Initial state load
            handleStateChange();

            // When the history state changes then reload our state
            // This is triggered when going back and forward in the browser
            window.addEventListener("popstate", () => handleStateChange());
            window.addEventListener("pushstate", () => handleStateChange());
        }

        this.containFrame(parseBoolean(this.args.contained));

        if (this.renderOnInit) await this.loadContent();
    }

    /**
     * Reload the frame content then call `render()`
     * @memberof! DynamicFrame
     */
    async refresh(method="get") {
        let ok = await this.loadContent(null, method);
        if (ok) await this.render();
    }

    /**
     * Call the base `bind()` and re-find the mountPoint in case it's changed
     * @memberof! DynamicFrame
     */
    bind() {
        super.bind();

        // Find the mount point
        if (this.args.mountPoint && typeof this.args.mountPoint === "string") {
            this.mountPoint = this.querySelector(this.args.mountPoint);
        }

        if (!this.mountPoint) {
            this.mountPoint = this.root;
        }
    }

    /**
     * Sets an interval to auto call `this.refresh()`
     * Overwrites previously set refresh intervals
     * @memberof! DynamicFrame
     */
    setAutoRefresh() {
        const interval = parseDuration(this.args.autoRefresh);

        if (interval === undefined) {
            console.error(`[${this.tag}] Undefined interval passed to setAutoRefresh`);
            return;
        }

        if (this._internal.autoRefreshInterval) {
            window.clearInterval(this._internal.autoRefreshInterval);
        }

        this._internal.autoRefreshInterval = window.setInterval(() => this.refresh(), interval);
    }

    /**
     * [async] Makes a new request and replaces or appends the response to the mountPoint
     * Returns true on success
     * Multiple calls will abort previous requests and return false
     * @returns boolean - true on success
     * @memberof! DynamicFrame
     */
    async loadContent(e, method="get") {
        let url = this.endpoint();
        url.search = new URLSearchParams(this.params());

        // Keep track of all pending requests so we can abort them on duplicate calls
        this._reqAbort.forEach(controller => controller.abort());
        this._reqAbort = [];

        const abortController = new AbortController();
        this._reqAbort.push(abortController);

        let ok = true;
        const sendReq = async () => {
            try {
                let response = await fetch(url, {
                    signal: abortController.signal,
                    method: method,
                });

                // If no content then delete self
                if (response.status === 204) {
                    this.destroySelf();
                    ok = false;
                    return;
                }

                let text = await response.text();
                this.updateContent(text);
            } catch (err) {
                console.error(err);
                ok = false;
            }
        };

        await Promise.allSettled([new Promise(resolve => setTimeout(resolve, this.args.delay)), sendReq()]);

        if (ok) {
            this.saveState();
            this.bind(); // The new DOM content might need to be bound to the controller
        }

        return ok;
    }

    /**
     * Actually updates the content
     * This is where the artificial delay is applied
     * @param content - The content to use
     * @param mode - replace or append, defaults to `this.args.mode`
     * @memberof! DynamicFrame
     */
    updateContent(content, mode = null) {
        if (!mode) mode = this.args.mode || "replace";

        const template = document.createElement("template");
        template.innerHTML = content;

        // If we want to execute scripts then go through our template and turn script tags into real scripts
        if (this.args.executeScripts) {
            let scripts = template.content.querySelectorAll("script");

            [...scripts].forEach(script => {
                let newScript = document.createElement("script");

                // Copy all attributes to the new script
                [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));

                // Copy the content of the script tag
                if (script.innerHTML) newScript.appendChild(document.createTextNode(script.innerHTML));

                // Add the script tag back in
                script.replaceWith(newScript);
            });
        }

        if (mode === "replace") {
            this.mountPoint.replaceChildren(template.content);
        } else if (mode === "append") {
            this.mountPoint.appendChild(template.content);
        } else if (mode === "prepend") {
            this.mountPoint.prepend(template.content);
        }

        this.emit("frame-updated", { from: this, mode: mode });
    }

    /**
     * Returns the query string params for the request - expected to be overridden
     * Handles arrays as duplicated params (ie. a: [1,2] => ?a=1&a=2)
     * @returns {URLSearchParams}
     * @memberof! DynamicFrame
     */
    params(values = {}) {
        let params = new URLSearchParams(values);

        // Annoyingly URLSearchParams can't handle array params unless you call .append each time
        // So find any array params and re-add them manually
        Object.entries(values).forEach(([key, val]) => {
            if (Array.isArray(val)) {
                params.delete(key);
                val.forEach(item => params.append(key, item));
            }
        });

        for (let attr of this.attributes) {
            if (attr.nodeName.startsWith(":param-")) {
                params.append(attr.nodeName.substring(7), attr.nodeValue);
            }
        }
        return params;
    }

    /**
     * Set key/value pairs of params in the element attributes
     * @param {object} values
     */
    setParams(values = {}) {
        // Wipe out all current attributes
        for (let attr of this.attributes) {
            if (attr.nodeName.startsWith(":param-")) {
                this.removeAttribute(attr.nodeName);
            }
        }

        // Set the new params
        Object.entries(values).forEach(([key, val]) => {
            this.setAttribute(`:param-${key}`, val);
        });
    }

    /**
     * Returns the endpoint to call - from the :url attr on the root element
     * @returns {string}
     * @memberof! DynamicFrame
     */
    endpoint() {
        let url = this.args.url;

        if (!this.args.url) {
            console.error(`${this.tag}: No :url attribute specified`);
            return;
        }

        if (!url.startsWith("http")) url = window.location.origin + url;
        return new URL(url);
    }

    /**
     * Load the frame state based on the main page URL query string
     * @returns {object} The frame state
     */
    loadState() {
        if (!this.args.stateKey) return;

        let qs = window.location.search;

        if (!qs) return;
        qs = qs.substring(1);
        let qsParts = Object.fromEntries(qs.split("&").map(part => part.split("=")));

        let frameState = {}
        let params = {};
        for (let [key, value] of Object.entries(qsParts)) {
            if (key.startsWith(this.args.stateKey + "-")) {
                if (key.startsWith(this.args.stateKey + "-param-")) {
                    params[key.replace(this.stateKey + "-param-", "")] = value;
                }

                frameState[key] = value;
            }
        }

        // Update our params
        this.setParams(params);

        return frameState;
    }

    /**
     * Loads a URL into the frame by updating the url and param attributes and then reload
     * @param {*} url
     */
    loadUrl(url, method="get") {
        let [origin, query] = url.split("?");
        if (!query) query = "";

        if (query) {
            const params = Object.fromEntries(query.split("&").map(part => part.split("=")));
            this.setParams(params);
        }

        this.args.url = origin;
        this.refresh(method);
    };

    /**
     * Save the frame state to the outer page URL query string and add to history
     * Only saves if the state has changed
     */
    saveState() {
        // If no stateKey then we can't save the state
        if (!this.args.stateKey) return;

        // Get the main page query string
        let mainPageQs = Object.fromEntries(new URLSearchParams(window.location.search));

        // Strip out any params that belong to this frame
        // We will re-add them below
        for (const key of Object.keys(mainPageQs)) {
            if (key.startsWith(`${this.args.stateKey}-`)) {
                delete mainPageQs[key];
            }
        }

        // Build our frame state object
        let frameState = {}
        frameState[`${this.args.stateKey}-url`] = this.args.url.replace(window.location.origin, "");

        // Add the params for this frame
        for (const [key, value] of this.params()) {
            frameState[`${this.args.stateKey}-param-${key}`] = value;
        }

        // Merge our frame state into the page params
        mainPageQs = { ...mainPageQs, ...frameState };

        // If our state changed then update the main page URL and add to history
        if (this._internal.frameState !== frameState) {
            const qs = Object.entries(mainPageQs)
                .map(part => `${part[0]}=${part[1]}`)
                .join("&");

            window.history.pushState(qs, "", `?${qs}`);
            this._internal.frameState = frameState;
        }
    }

    /**
     * Makes the frame self contained
     * Clicking any links or submitting any forms will only impact the frame, not the surrounding page
     * @param {bool} containAll Whether to automatically contain all `a` and `form` elements
     *                          If not set then it will be opt in per element.
     */
    containFrame(containAll = false) {
        // Capture all clicks and if it was on an <a> tag load the href within the frame
        this.addEventListener("click", e => {
            let target = e.target || e.srcElement;

            if (target.tagName === "A" && this.belongsToController(target)) {
                if (!containAll && !target.hasAttribute(":contained")) {
                    return;
                }

                e.preventDefault();
                const href = target.getAttribute("href");
                this.loadUrl(href);
            }
        });

        // Intercept form submits
        // To do this we need to submit the form ourselves
        // Aims to have near-full feature parity with regular HTML forms
        // We do not support the `target` attribute or the `method="dialog"` value
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
        this.addEventListener("submit", async e => {
            if (!containAll && !e.target.hasAttribute(":contained")) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const method = e.target.getAttribute("method") || "GET";
            const action = e.target.getAttribute("action") || "/";
            const encoding = e.target.getAttribute("enctype") || "application/x-www-form-urlencoded";
            const skipValidation = e.target.getAttribute("novalidate") !== undefined;

            // Base HTML5 validation
            if (!skipValidation && !e.target.checkValidity()) {
                return;
            }

            // Build the form data to send
            const formData = new FormData(e.target);
            let params = new URLSearchParams();
            for (const pair of formData) {
                params.append(pair[0], pair[1]);
            }

            if (method.toUpperCase() == "POST") {
                let request = {
                    method: "POST",
                };

                if (encoding === "application/x-www-form-urlencoded") {
                    request.body = params;
                    request.headers = {
                        "Content-Type": "application/x-www-form-urlencoded",
                    };
                } else {
                    // If sending as multipart then we omit the content-type
                    request.body = formData;
                }

                let response = await fetch(action, request);
                if (response.redirected) {
                    // If we have a redirect then follow it
                    this.loadUrl(response.url);
                } else {
                    // Otherwise show the response body
                    this.updateContent(await response.text());
                }
            } else if (method.toUpperCase() == "GET") {
                const query = Object.fromEntries(new URLSearchParams(formData));
                this.setParams(query);
                this.args.url = action;
                this.refresh();
            }

            return false;
        });
    }

    /**
     * Remove self from DOM and remove state from query string
     */
    destroySelf() {
        this.parentElement.removeChild(this);

        if (this.args.stateKey) {
            // Get main page query string
            let qs = window.location.search;
            qs = qs.substring(1);
            if (!qs) return;

            // Remove any parts that belong to this frame
            let qsParts = Object.fromEntries(qs.split("&").map(part => part.split("=")));
            for (const [key, value] of Object.entries(qsParts)) {
                if (key.startsWith(this.args.stateKey + "-")) {
                    delete qsParts[key];
                }
            }

            // Back to string and save
            qs = Object.entries(qsParts)
                .map(part => `${part[0]}=${part[1]}`)
                .join("&");

            window.history.pushState(qs, "", `?${qs}`);
        }
    }
}

export { DynamicFrame };
