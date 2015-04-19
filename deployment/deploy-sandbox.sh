#!/bin/bash

git checkout gh-pages

git clone git@github.com:measurement-factory/functional-text-sandbox.git
cd functional-text-sandbox
SANDBOX_COMMIT=$(git rev-parse --verify master)

git clone git@github.com:measurement-factory/functional-text.git
cd functional-text
PARENT_COMMIT=$(git rev-parse --verify master)
npm install
webpack
cd ..

npm install
webpack -p
cp src/index.html deploy-result/index.html
cd ..

cp functional-text-sandbox/deploy-result/* ./
rm -rf functional-text-sandbox

if ! git diff-index --quiet HEAD --; then
    git commit -m "Updating gh-pages branch. (with sandbox @ $SANDBOX_COMMIT, and functional text @ $PARENT_COMMIT)"
    git push
fi