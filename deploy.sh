#!/bin/bash

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    doCompile
    exit 0
fi

# Create folder for components
mkdir -p bin/js bin/styl

# Build js
npm run build:js

# Copy stylus files
cp -r ./src/styl/ ./bin/styl
