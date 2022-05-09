---
title: Arguments
layout: "surround/guide_base.njk"
active: "arguments"
---

# Arguments

Binder controllers allow passing arguments through to the JavaScript, these are stored in your controller in the `this.args` object.

```html
<our-first-controller :greeting="Hey"></our-first-controller>
```

```js
class OurFirstController extends Controller {
    init() {
        this.innerHTML = `<p>${this.args.greeting}, World!</p>`;
    }
}
```

### Helpers

Binder also provides a couple of helper functions for parsing arguments.

```js
import { parseBoolean, parseDuration } from "./binder/util.js";

// parseBoolean will parse the strings "", "0" and "false" (any casing) as `false`
// Everything else will be `true`
parseBoolean("true"); // true
parseBoolean("1"); // true
parseBoolean("abc"); // true
parseBoolean("false"); // false
parseBoolean("False"); // false
parseBoolean("0"); // false
parseBoolean(""); // false

// parseDuration parses a duration string into milliseconds
// It supports ms, s, m and h for milliseconds, seconds, minutes and hours
parseDuration("2h"); // 7200000 (2 hours)
parseDuration("5m"); // 300000 (5 minutes)
parseDuration("45s"); // 45000 (45 seconds)
parseDuration("250ms"); // 250 (250 milliseconds)
```
