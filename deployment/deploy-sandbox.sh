#!/bin/bash

git clone git@github.com:measurement-factory/functional-text.git
cd functional-text
npm install
webpack
cd ..
npm install
webpack -p
cp src/index.html deploy-result/index.html
rm -fr functional-text
#deploy to gh-pages