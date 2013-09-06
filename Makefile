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

components: node_modules component.json
	$(COMPONENT) install --dev

build: components lib $(SRC)
	$(COMPONENT) build --dev

lib: $(wildcard lib/*.js)
	$(ASSETS) scripts:index.js,lib/*.js

lib-cov: $(wildcard lib/*.js)
	$(COVERJS) -o $@ $^
	$(ASSETS) scripts:index.js,lib-cov/*.js

server: node_modules lib-cov
	PORT=$(PORT) node test/server.js

clean:
	rm -rf build/ components/ node_modules/ lib-cov/

.PHONY: all clean server lib
