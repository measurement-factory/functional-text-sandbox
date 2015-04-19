#!/bin/bash

git config --global url.ssh://git@github.com/.insteadOf https://github.com/
git config --global user.email "robot@example.com"
git config --global user.name "Codeship Robot"
git remote set-branches --add origin gh-pages
git fetch
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
    git add index.html bundle.js bundle.js.map
    git commit -m "Updating gh-pages branch. (with sandbox @ $SANDBOX_COMMIT, and functional text @ $PARENT_COMMIT)"
    git push
fi