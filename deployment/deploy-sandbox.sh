#!/bin/bash

git checkout gh-pages

git clone git@github.com:measurement-factory/functional-text-sandbox.git
cd functional-text-sandbox

git clone git@github.com:measurement-factory/functional-text.git
cd functional-text
npm install
webpack
cd ..

npm install
webpack -p
cp src/index.html deploy-result/index.html
rm -fr functional-text
cd ..

cp functional-text-sandbox/deploy-result/* ./
rm -rf functional-text-sandbox

if ! git diff-index --quiet HEAD --; then
    git commit -m "Updating gh-pages branch."
    git push
fi