#!/bin/bash

git config --global url.ssh://git@github.com/.insteadOf https://github.com/
git config --global user.email "robot@example.com"
git config --global user.name "Codeship Robot"

SANDBOX_COMMIT=$(git rev-parse --verify master)

git remote set-branches --add origin gh-pages
git fetch
git checkout -f gh-pages

git clone --depth 1 git@github.com:measurement-factory/functional-text-sandbox.git
cd functional-text-sandbox
git checkout -f $SANDBOX_COMMIT

git clone --depth 1 git@github.com:measurement-factory/functional-text.git
cd functional-text
PARENT_COMMIT=$(git rev-parse --verify master)
cd ..

make build
cd ..

cp functional-text-sandbox/deploy-result/* ./
rm -rf functional-text-sandbox

if ! git diff-index --quiet HEAD --; then
    git add index.html bundle.js bundle.js.map
    git commit -m "Updating gh-pages branch. (with sandbox @ $SANDBOX_COMMIT, and functional text @ $PARENT_COMMIT) [skip ci]"
    git push
fi