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

# Build 11ty site to ./build/site/
npm run build:site

# Build jsdoc site to ./build/docs/
npm run build:docs

# Build JS to ./build/static/
npm run build:js

# Build everything
npm run build

# Copy files to appropriate location to serve
cp -r build/site/* /data/www/binder.danstewart.dev
cp -r build/docs/* /data/www/docs.binder.danstewart.dev
```
