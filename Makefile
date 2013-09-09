BIN = ./node_modules/.bin
COMPONENT = $(BIN)/component
ASSETS = $(BIN)/component-assets
COVERJS = $(BIN)/coverjs

PORT ?= 3000
PID := server.pid

SRC = index.js $(wildcard lib/*.js)

all: build

node_modules: package.json
	npm install

components: component.json | node_modules
	$(COMPONENT) install --dev

build: lib $(SRC) | node_modules components
	$(COMPONENT) build --dev

lib: $(wildcard lib/*.js)
	$(ASSETS) scripts:index.js,lib/*.js

lib-cov: $(wildcard lib/*.js) | node_modules
	$(COVERJS) -o $@ $^
	$(ASSETS) scripts:index.js,lib-cov/*.js

server: node_modules components
	rm -rf build/
	PORT=$(PORT) node test/server.js

clean:
	rm -rf build/ components/ node_modules/ lib-cov/

.PHONY: all clean server lib lib-cov
