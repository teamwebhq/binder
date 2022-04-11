# binder.js

This repository contains the `binder.js` code and the [11ty](https://www.11ty.dev/) static site https://binderjs.com.  
To learn more about binder.js see https://binderjs.com.  


## Getting Started

This project uses [hermit](https://cashapp.github.io/hermit/usage/get-started/) to manage the node/npm/npx install.  

```
# Activate hermit
source bin/activate-hermit

# Install dependencies
npm install

# Run 11ty website locally
npm run serve

# Build 11ty site to ./dist
npm run build:site

# Build jsdoc site to ./docs
npm run build:docs

# Build JS to ./build
npm run build:js

# Build everything
npm run build
```
