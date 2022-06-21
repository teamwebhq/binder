import { kebabToCamel, permutations, parseDuration, parseBoolean } from "./util.js";

/**
 * Dynamically create a new Controller class extending an existing element class
 * @param {Element} base The element to inherit from
 * @param {string} name The name of the built in HTML tag to extend
 * @returns Controller class
 */
const makeController = (base = HTMLElement, extendTag = null) => {
    /**
     * @class
     * @name Controller
     * @namespace Controller
     */
    const CoreController = class extends base {
        static _extendTag = extendTag;

        /**
         * @static
         * @name observedAttributes
         * @type String[]
         * @memberof! Controller
         * @description These are the attributes to watch for and react to changes
         * This is handled by `attributeChangedCallback()`
         * The default implementation will call `set{AttributeName}(oldValue, newValue)`
         */
        static observedAttributes = [];

        /**
         * Create a new custom controller element
         * @param {*} args
         */
        constructor(args) {
            super();

            // Store for internal data
            this._internal = {};

            this.root = this;
            this.args = args;

            // Keep track of all attached events
            this._events = [];

            // Handle <self> node
            // By default an empty element will only contain it's `self` content
            // Can also be added manually using <self></self>
            if (this.innerHTML.trim() === "") this.innerHTML = "<self></self>";
            this.self = this.querySelector("self");

            // Add the data-controller attribute to the element
            this.setAttribute("data-controller", this.localName);

            this.template = this.root.querySelector("template");

            // If the component has a template then we will clone it and render that to the DOM
            // If the template has the :use-shadow attribute then we will clone it onto the shadow DOM
            // This allows isolating the component from the regular DOM (including styles)

            // The template is optional, if not specified then we will do everything directly on the DOM within the component
            if (this.template) {
                this.content = this.template.content.cloneNode(true);

                // Only use the shadowDOM when specified
                if (this.template.hasAttribute(":use-shadow")) {
                    this.attachShadow({ mode: "open" }).appendChild(this.content.cloneNode(true));

                    this.root = this.shadowRoot;
                    this.hasShadow = true;
                } else {
                    this.appendChild(this.content.cloneNode(true));
                    this.hasShadow = false;
                }
            }
        }

        /**
         * @method
         * @name connectCallback
         * @memberof! Controller
         * @description Called when element is rendered in the DOM
         * See: {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks}
         */
        async connectedCallback() {
            if (!this.isConnected) return;

            this.renderOnInit = parseBoolean(this.renderOnInit || "true");

            this.bind();
            await this.init(this.args);

            if (this.autoRender) {
                const interval = parseDuration(this.autoRender);
                this.setAutoRender(interval);
            }

            if (this.renderOnInit) this.render();
        }

        /**
         * Runs when the element in removed from the DOM
         */
        disconnectedCallback() {
            this._events.forEach(e => e.el.removeEventListener(e.eventType, e.event));
            this._events = [];
        }

        /**
         * @method
         * @name attributeChangedCallback
         * @memberof! Controller
         * @description The default implementation of attributeChangedCallback
         * See: {@link https://developers.google.com/web/fundamentals/web-components/customelements#attrchanges}
         * We will convert the attribute name to camel case, strip out the leading `data-` or `aria-` parts and call `set{AttributeName}(oldValue, newValue)` (if it exists)
         * Eg. A change to `data-disabled` will call `setDisabled(oldValue, newValue)`
         * @param {string} name The name of the attribute that changed
         * @param {string} oldValue The old value of the attribute
         * @param {string} newValue The new value of the attribute
         */
        attributeChangedCallback(name, oldValue, newValue) {
            let handler = name.replace(/^data-/, "");
            handler = handler.replace(/^aria-/, "");
            handler = kebabToCamel(handler);
            handler = `set${handler.charAt(0).toUpperCase()}${handler.slice(1)}`;

            if (handler in this && typeof this[handler] === "function") {
                this[handler](oldValue, newValue);
            }
        }

        /**
         * @method
         * @name Controller#emit
         * @memberof! Controller
         * @description Emit a new event from this controller
         * @param {string} eventName The name of the event, automatically prefixed with `${this.localName}:`
         * @param {object} detail Optional object that is passed in the event under the key `detail`
         * @param {object} config Optional configuration object that can be passed to `new CustomEvent()`
         */
        emit(eventName, detail = {}, config = {}) {
            window.dispatchEvent(
                new CustomEvent(eventName, {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    detail: detail,
                    ...config,
                })
            );
        }

        /**
         * @method
         * @name listenFor
         * @memberof! Controller
         * @description Listens for an event to be fired from a child element
         * @param {string} elementName The child element tag name to listen for
         * @param {string} eventName The name of the event to listen for
         * @param {function} callback The callback to call when the event is fired
         */
        listenFor(eventName, callback) {
            window.addEventListener(eventName, e => callback(e));
        }

        /**
         * @method
         * @name bind
         * @memberof! Controller
         * @description Initializes the controller instance
         * Can be called manaually when the child elements change to force refreshing the controller state
         * eg. re-attach events etc...
         */
        bind() {
            // TODO: Might be useful to bind a specific node/tree

            // We only want to configure the arguments on the first bind()
            if (!this._internal.bound) {
                this.#bindArgs();
            }

            this.#bindEvents();
            this.#bindDataValues();

            this._internal.bound = true;
        }

        /**
         * @method
         * @name setAutoRender
         * @memberof! Controller
         * @description Sets an interval to auto call `this.render()`
         * Overwrites previously set render intervals
         * @param {*} interval Duration in milliseconds
         */
        setAutoRender(interval) {
            if (interval === undefined) {
                console.error(`[${this.localName}] Undefined interval passed to setAutoRender`);
                return;
            }

            if (this._internal.autoRenderInterval) {
                window.clearInterval(this._internal.autoRenderInterval);
            }

            this._internal.autoRenderInterval = window.setInterval(() => this.render(), interval);
        }

        /**
         * @method
         * @name init
         * @memberof! Controller
         * @description Called during the `connectedCallback()` (when an element is created in the DOM)
         * Expected to be overridden
         * @param {*} args
         */
        async init(args) {}

        /**
         * @method
         * @name render
         * @memberof! Controller
         * @description Re-renders everything with the @render attribute
         */
        async render() {
            // TODO: Might be handy to be able to render one element or element tree

            // Render self
            // TODO: Better way to do this?
            if (this.renderSelf && typeof this.renderSelf === "function") {
                this.renderSelf();
            }

            this.#findRenderableElements().forEach(el => {
                // Store the original template as an attribute on the element on first render
                let template = el.getAttribute("_template");
                if (!template) {
                    template = el.innerText;
                    el.setAttribute("_template", template);
                }

                // If the element has the attribute with .eval then eval the template
                // This should be used sparingly and only when the content is trusted
                const evalMode = el.hasAttribute(`@render.eval`);

                let replacerRegex = /\$\{(.*?)\}/g; // Find template vars: ${var}

                template.replace(replacerRegex, (replacer, key) => {
                    if (evalMode) {
                        const fn = new Function(`return ${key}`);
                        template = template.replace(replacer, fn.call(this));
                    } else {
                        // If not in `evalMode` then we do an eval-like replacement
                        // We will dig into the controller instance and replace in the variables
                        // This handles dot notation and array notation
                        let pos = null;

                        // Split on dots and brackets and strip out any quotes
                        key.split(/[\.\[\]]/)
                            .filter(item => !!item)
                            .forEach(part => {
                                part = part.replace(/["']/g, ""); // Strip out square brackets
                                part = part.replace(/\(\)/g, ""); // Strip out function parens

                                if (pos == null && part === "this") {
                                    pos = this;
                                    return;
                                }

                                if (pos && part in pos) {
                                    pos = pos[part];
                                } else {
                                    pos = null;
                                    return;
                                }
                            });

                        if (pos == null) pos = "";
                        if (typeof pos === "function") pos = pos.call(this);
                        template = template.replace(replacer, pos.toString() || "");
                    }
                });

                // TODO: This may be innefecient
                el.innerHTML = template;
            });
        }

        /**
         * @method
         * @private
         * @name findRenderableElements
         * @memberof! Controller
         * @description Find all elements on the controller which have @render attributes
         * @render is a special action that let's the controller know to render this elements content when the render() method is called
         */
        #findRenderableElements() {
            return [...this.root.querySelectorAll(`[\\@render]`), ...this.root.querySelectorAll(`[\\@render\\.eval]`)].filter(el => this.belongsToController(el));
        }

        /**
         * @method
         * @private
         * @name bindArgs
         * @memberof! Controller
         * @description Bind all attributes on the controller tag into the instance under `this`
         * Convert kebab-case to camelCase
         * EG. <controller :some-arg="150" /> will set `this.someArg = 150`
         */
        #bindArgs() {
            this.args = {};

            this.getAttributeNames().forEach(attr => {
                const value = this.getAttribute(attr);
                const key = kebabToCamel(attr).replace(":", "");
                this.args[key] = value;
            });
        }

        /**
         * @method
         * @private
         * @name bindEvents
         * @memberof! Controller
         * @description Finds all events within a controller element
         * Events are in the format `@{eventType}={method}"`
         * EG. @click="handleClick"
         *
         * The attribute key can also end with a combination of modifiers:
         * - `.prevent`: Automatically calls `event.preventDefault()`
         * - `.eval`: Will evaluate the attribute value
         */
        #bindEvents() {
            // We need to delete all events and before binding
            // Otherwise we would end up with duplicate events upon muliple bind() calls
            this._events.forEach(e => e.el.removeEventListener(e.eventType, e.event));
            this._events = [];

            const bindEvent = (el, eventType, modifier) => {
                const value = el.getAttribute(`@${eventType}${modifier}`);
                const action = value.replace("this.", "").replace("()", "");

                const callable = event => {
                    if (modifier.includes(".prevent")) event.preventDefault();

                    if (modifier.includes(".eval")) {
                        const fn = new Function(`${value}`);
                        fn.call(this);
                    } else {
                        this[action](event);
                    }
                };

                el.addEventListener(eventType, callable);

                this._events.push({
                    el: el,
                    event: callable,
                    eventType: eventType,
                });
            };

            // Find all controller child nodes with attributes that start with `@`
            // TODO: Not sure of the performance impact of this
            // Need to benchmark and compare to plain querySelector
            // Another option is to parse the DOM as a string ourselves
            const nodesWithEvents = document.evaluate(`.//*[@*[starts-with(name(), "@")]]`, this.root);

            let eventNode = nodesWithEvents.iterateNext();
            while (eventNode) {
                for (let attr of eventNode.getAttributeNames()) {
                    if (!attr.startsWith("@")) continue;

                    let [event, modifiers] = attr.replace("@", "").split(".", 2);
                    modifiers = modifiers ? `.${modifiers}` : "";

                    // @render and @bind are handled separately
                    if (event === "render" || event === "bind") continue;

                    bindEvent(eventNode, event, modifiers);
                }

                eventNode = nodesWithEvents.iterateNext();
            }

            // The above does not match attributes on the root node itself so check that manually
            // TODO: This section is the same as the above, de-dupe it
            for (let attr of this.root.getAttributeNames()) {
                if (!attr.startsWith("@")) continue;

                let [event, modifiers] = attr.replace("@", "").split(".", 2);
                modifiers = modifiers ? `.${modifiers}` : "";

                // @render and @bind are handled separately
                if (event === "render" || event === "bind") continue;

                bindEvent(this.root, event, modifiers);
            }
        }

        /**
         * @method
         * @private
         * @name bindDataValues
         * @memberof! Controller
         * @description Find all elements within the controller that has a `@bind` attribute
         * Each element will have it's value bound to the controller under `this`
         * The value of the attribute will be converted from kebab-case to camelCase
         *
         * EG. <input @bind="the-input" /> will have it's value bound to `this.theInput`
         */
        #bindDataValues() {
            this.data = {};
            const instance = this;

            const tagToEvent = {
                "input|text": "keyup",
                default: "change",
            };

            // Event handlers for various element types
            const handlers = {
                "input|checkbox": (instance, varName, e) => {
                    if (!instance.data[varName]) instance.data[varName] = [];
                    if (e.target.checked) {
                        instance.data[varName].push(e.target.value);
                    } else {
                        instance.data[varName] = instance.data[varName].filter(item => item !== e.target.value);
                    }
                },
                select: (instance, varName, e) => {
                    if (e.target.getAttribute("multiple") !== null) {
                        instance.data[varName] = Array.from(e.target.selectedOptions).map(item => item.value);
                    } else {
                        instance.data[varName] = e.target.value;
                    }
                },
                default: (instance, varName, e) => (instance.data[varName] = e.target.value),
            };

            // Logic to actually bind an element to the controller
            const bindData = (el, modifier) => {
                const elType = this.#getElementType(el);
                const eventType = tagToEvent[elType] || tagToEvent.default;

                el.addEventListener(eventType, e => {
                    const varName = el.getAttribute(`@bind${modifier}`).replace("this.data.", "").replace("this.", "");

                    const handler = handlers[elType] || handlers.default;
                    handler(instance, varName, e);

                    // If this element is @bind.render this call render()
                    if (modifier.includes(".render")) instance.render();
                });
            };

            const modifiers = ["", ...permutations([".render"], true)];
            modifiers.forEach(modifier => {
                // Handle any binds on the root node
                if (this.hasAttribute(`@bind${modifier}`)) {
                    bindData(this.root, modifier);
                }

                // Handle any binds on the children
                const escapedModifier = modifier.replace(/\./g, "\\.");
                this.root.querySelectorAll(`[\\@bind${escapedModifier}]`).forEach(el => {
                    if (!this.belongsToController(el)) return;
                    bindData(el, modifier);
                });
            });
        }

        /**
         * @method
         * @private
         * @name getElementType
         * @memberof! Controller
         * @description Return the type of an element
         * @param {Element} el The DOM element to check
         * @returns {String} The element type, e.g. 'input|text'
         */
        #getElementType(el) {
            if (el.tagName.toLowerCase() === "input") {
                return [el.tagName, el.type].map(item => item.toLowerCase()).join("|");
            }
            return el.tagName.toLowerCase();
        }

        /**
         * @method
         * @private
         * @name belongsToController
         * @memberof! Controller
         * @description Return true if the given element belongs to this controller
         * @param {Element} el The controller root DOM element
         * @returns {Boolean} True if the element belongs to the controller
         */
        belongsToController(el) {
            // If we're using the shadow DOM then we only see this controllers children so it must belong to the controller
            if (this.hasShadow) return true;

            const closestController = el.closest(`[data-controller]`);
            if (closestController == null) return false;
            if (closestController !== this) return false;
            return true;
        }
    };

    return CoreController;
};

const Controller = makeController();

export { makeController, Controller };
