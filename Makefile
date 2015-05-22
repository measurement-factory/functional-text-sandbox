.PHONY: install-functional-text build

LOCAL_FUNCTIONAL_TEXT?=../functional-text

install-functional-text:
	mkdir -p node_modules
	rm -rf node_modules/functional-text
	git clone --depth 1 --branch 'master' git@github.com:measurement-factory/functional-text.git node_modules/functional-text
	cd node_modules/functional-text ; npm install ; make build-core

install-functional-text-local:
	mkdir -p node_modules
	rm -rf node_modules/functional-text
	cp -r $(LOCAL_FUNCTIONAL_TEXT) node_modules/functional-text
	cd node_modules/functional-text ; npm install ; make build-core

build:
	if !(test -d node_modules/functional-text) ; then echo "Please install functional text" ; exit 1 ; fi
	npm install
	webpack
	cp src/index.html deploy-result/index.html

