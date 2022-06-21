#!/usr/bin/env bash

echo "Transpiling javascript with swc to ./build..."

if [[ $1 == "watch" ]]; then
    npx swc \
        --source-maps true \
        --quiet \
        --watch \
        ./src/static/js/binder/ --out-dir ./build/ &
else
    npx swc \
      --quiet \
      --source-maps true \
      ./src/static/js/binder/ --out-dir ./build/
fi
