import { pascalToKebab } from "./util.js";

/**
 * Register a controller (or multiple controllers)
 *
 * Example
 * ```js
 * registerControllers(MyController, MyOtherController);
 * ```
 *
 * ```js
 * registerControllers(
 *  MyController,
 *  [ MyOtherController, { name: "my-custom-controller" } ],
 *  [ MyOtherOtherController ],
 * )
 * ```
 * @param  {...any} controllers
 */
const registerControllers = (...controllers) => {
    // First find all undefined elements and assume they are custom elements
    // We can then add the `data-controller` attribute to them
    // This makes it easy for us to find which controller a given DOM element belongs to
    // We also set the `data-controller` attr during the `connectedCallback` so any elements defined later will still work
    const allUndefinedElements = [...document.querySelectorAll(":not(:defined)")];
    allUndefinedElements.forEach(el => el.setAttribute("data-controller", el.localName));

    for (let controller of controllers) {
        let config = {};
        if (Array.isArray(controller)) {
            [controller, config = {}] = controller;
        }

        const controllerName = controller.name;
        const controllerTag = config && config.name ? config.name : pascalToKebab(controllerName.replace("Controller", ""));

        if (window.customElements.get(controllerTag)) {
            console.warn(`Controller "${controllerTag}" is already registered, skipping...`);
            return;
        }

        // All custom elements required a hyphenated tag name
        if (!controllerTag.includes("-")) {
            console.error(`[${controllerName}] Controller tag name must contain a hyphen but got <${controllerTag}>`);
        }

        // If our controller has a __tag__ property then it extends that tag
        let opts = {};
        if (controller._extendTag) opts.extends = controller._extendTag;

        // Create an anonymous class here to avoid name clashes when using the bare controller with a custom name
        window.customElements.define(controllerTag, controller, opts);
    }
};

export { registerControllers };
