.PHONY: install-functional-text build

install-functional-text:
	mkdir -p node_modules
	rm -rf node_modules/functional-text
	git clone --depth 1 --branch 'master' git@github.com:measurement-factory/functional-text.git node_modules/functional-text
	cd node_modules/functional-text ; npm install ; make build-core

build: install-functional-text
	npm install
	webpack
	cp src/index.html deploy-result/index.html