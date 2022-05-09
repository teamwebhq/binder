---
title: Quick Start
layout: "surround/md_base.njk"
---

### Getting Started

The easiest way to get started with binder is to load it from a CDN:

```html
<!-- index.html -->
<script type="module">
    import { registerControllers, Controller } from "https://cdn.jsdelivr.net/gh/teamwebhq/binder/build/static/js/binder/binder.js";

    class MyController extends Controller {}

    registerControllers(Controller);
</script>

<my-controller></my-controller>
```

Check out the [guide](/guide/introduction/) to learn how to use binder or the [playground](/playground/) to see it in action.
