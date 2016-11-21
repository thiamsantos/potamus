#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Install dependencies
npm install
# npm test
npm run lint
