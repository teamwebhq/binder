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
            const interval = parseDuration(this.args.autoRefresh);
            this.setAutoRefresh(interval);
        }

        if (!this.args.delay) this.args.delay = 0;

        // If we have a stateKey then track and handle the state
        if (this.args.stateKey) {
            this.loadState();

            const handleStateChange = () => {
                let qs = this.loadState();

                if (this._internal.currentQs !== qs) {
                    this._internal.currentQs = qs;
                    this.refresh();
                }
            };

            // When the history state changes then reload our state
            // This is triggered when going back and forward in the browser
            window.addEventListener("popstate", () => handleStateChange());
            window.addEventListener("pushstate", () => handleStateChange());
        }

        if (parseBoolean(this.args.contained)) {
            this.containFrame();
        }
    }

    /**
     * Alias for `render()`
     * @memberof! DynamicFrame
     */
    async refresh() {
        await this.render();
    }

    /**
     * Reload the frame content
     * @memberof! DynamicFrame
     */
    async render() {
        await this.loadContent();
        await super.render();
        this.saveState();
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
     * @param {*} interval Duration in milliseconds
     * @memberof! DynamicFrame
     */
    setAutoRefresh(interval) {
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
    async loadContent(e) {
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
                let response = await fetch(url, { signal: abortController.signal });
                let text = await response.text();
                this.updateContent(text);
                this.findAndExecuteScripts();
            } catch (err) {
                console.error(err);
                ok = false;
            }
        };

        await Promise.allSettled([new Promise(resolve => setTimeout(resolve, this.args.delay)), sendReq()]);

        return ok;
    }

    /**
     * Called during `loadContent()`
     * Will find all script tags within the frame and execute them
     * Only if the frame has the `execute-scripts` attribute set to true
     * @memberof! DynamicFrame
     */
    findAndExecuteScripts() {
        if (!this.args.executeScripts) return;

        let scripts = this.querySelectorAll("script");
        if (!scripts) return;

        [...scripts].forEach(script => {
            let newScript = document.createElement("script");
            newScript.setAttribute("type", script.type || "text/javascript");

            if (script.getAttribute("src")) {
                newScript.setAttribute("src", script.getAttribute("src"));
                this.appendChild(newScript);
            } else {
                newScript.appendChild(document.createTextNode(script.innerHTML));
                this.appendChild(newScript);
            }
        });
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

        if (mode === "replace") {
            this.mountPoint.innerHTML = content;
        } else if (mode === "append") {
            this.mountPoint.insertAdjacentHTML("beforeEnd", content);
        } else if (mode === "prepend") {
            this.mountPoint.insertAdjacentHTML("afterBegin", content);
        }
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
                params.append(attr.nodeName.substr(7), attr.nodeValue);
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
     * Returns the endpoint to call - from the data-url attr on the root element
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
     * Load the frame state based on the URL query string
     */
    loadState() {
        if (!this.args.stateKey) return;

        let qs = window.location.search;
        if (!qs) return;

        qs = qs.substring(1);
        let qsParts = Object.fromEntries(qs.split("&").map(part => part.split("=")));

        if (qsParts[`${this.args.stateKey}-url`]) {
            this.args.url = qsParts[`${this.args.stateKey}-url`];
            delete qsParts[`${this.args.stateKey}-url`];
        }

        // TODO: Rewrite this to use `setParams`

        // Wipe out the default param attributes on this frame as we add the correct ones below
        for (let attr of this.attributes) {
            if (attr.nodeName.startsWith(":param-")) {
                this.removeAttribute(attr.nodeName);
            }
        }

        for (let [key, value] of Object.entries(qsParts)) {
            // Ignore other state keys
            // TODO: It might be better to make the state keys easier to identify
            // I can see these two cases being used for real parameters, in which case we drop them
            if (key.endsWith("-url")) continue;
            if (!key.startsWith(this.args.stateKey)) continue;

            key = key.replace(`${this.args.stateKey}-param-`, "");
            this.setAttribute(`:param-${key}`, value);
        }

        return qs;
    }

    /**
     * Save the frame state to the URL query string
     * Only saves if the state has changed
     */
    saveState() {
        if (!this.args.stateKey) return;

        let qsParts = Object.fromEntries(new URLSearchParams(window.location.search));
        qsParts[`${this.args.stateKey}-url`] = this.args.url;

        // Strip out any params that belong to this frame
        // We re-add them below
        for (const key of Object.keys(qsParts)) {
            if (key.startsWith(`${this.args.stateKey}-param-`)) {
                delete qsParts[key];
            }
        }

        // Add the params for this fra,e
        for (const [key, value] of this.params()) {
            qsParts[`${this.args.stateKey}-param-${key}`] = value;
        }

        const qs = Object.entries(qsParts)
            .map(part => `${part[0]}=${part[1]}`)
            .join("&");

        if (this._internal.currentQs !== qs) {
            window.history.pushState(qs, "", `?${qs}`);
            this._internal.currentQs = qs;
        }
    }

    /**
     * Makes the frame self contained
     * Clicking any links or submitting any forms will only impact the frame, not the surrounding page
     */
    containFrame() {
        /**
         * Loads a URL into the frame by updating the url and param attributes
         * @param {*} url
         */
        const loadUrl = url => {
            const [origin, query] = url.split("?");
            const params = Object.fromEntries(query.split("&").map(part => part.split("=")));

            this.setParams(params);
            this.args.url = origin;
        };

        // Capture all clicks and if it was on an <a> tag load the href within the frame
        this.addEventListener("click", e => {
            let target = e.target || e.srcElement;

            if (target.tagName === "A" && this.belongsToController(target)) {
                const href = target.getAttribute("href");
                loadUrl(href);
                this.render();
                e.preventDefault();
            }
        });

        // Intercept form submits
        // To do this we need to submit the form ourselves
        // Aims to have near-full feature parity with regular HTML forms
        // We do not support the `target` attribute or the `method="dialog"` value
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
        this.addEventListener("submit", async e => {
            e.preventDefault();

            const method = e.target.getAttribute("method") || "GET";
            const action = e.target.getAttribute("action") || "/";
            const encoding = e.target.getAttribute("enctype") || "application/x-www-form-urlencoded";
            const skipValidation = e.target.getAttribute("novalidate") !== undefined;

            // Base HTML5 validation
            if (!skipValidation && !e.target.checkValidity()) {
                console.warn("Form is not valid");
                return;
            }

            const formData = new FormData(e.target);

            if (method.toUpperCase() == "POST") {
                let response = await fetch(action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": encoding,
                    },
                });

                if (response.redirected) {
                    // If we have a redirect then follow it
                    loadUrl(response.url);
                    this.render();
                } else {
                    // Otherwise show the response body
                    this.innerHTML = await response.text();
                }
            } else if (method.toUpperCase() == "GET") {
                const query = Object.fromEntries(new URLSearchParams(formData));
                this.setParams(query);
                this.args.url = action;
                this.render();
            }

            return false;
        });
    }
}

export { DynamicFrame };
