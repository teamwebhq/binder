---
title: Our First Controller
layout: "surround/guide_base.njk"
active: "our-first-controller"
---

# Our First Controller

[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) are a way to create custom HTML elements, binder helps simplify the process of creating new elements, managing their state and handling events.

In binder we call our custom elements **Controllers**.  
There are two parts to a controller, the HTML and the JavaScript class behind it.

We'll start with the JavaScript, it's just a standard ES6 class that extends the base binder `Controller`:

```js
import { Controller, registerControllers } from "./binder.js";

class OurFirstController extends Controller {
    // The init method is called when a new element is added to the DOM
    init() {
        // Put your set up code here
        this.innerHTML = `<p>Hello, World!</p>`;
    }
}

// We need to "register" all controllers, this is what connects up the HTML to the JavaScript
registerControllers(OurFirstController);
```

And now our HTML:

```html
<our-first-controller></our-first-controller>
```

This is a simple example but read on to see what binder can do!

---

Next: [Arguments](/guide/arguments)
