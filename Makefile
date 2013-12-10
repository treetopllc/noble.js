BIN = ./node_modules/.bin
COMPONENT = $(BIN)/component
ASSETS = $(BIN)/component-assets
COVERJS = $(BIN)/coverjs

LIB = lib/**/*.js
LIBCOV = $(subst lib, lib-cov, $(LIB))

PORT ?= 3000
PID := server.pid

SRC = index.js $(wildcard lib/*.js)

all: build

deps: | node_modules components

node_modules: package.json
	npm install

components: component.json | node_modules
	$(COMPONENT) install --dev

build: $(SRC) | node_modules components
	$(COMPONENT) build --dev

lib: $(wildcard $(LIB)) | node_modules
	$(ASSETS) scripts:index.js,$(strip $(LIB))

lib-cov: $(wildcard $(LIB)) | node_modules
	$(COVERJS) -o $@ $^
	$(ASSETS) scripts:index.js,$(strip $(LIBCOV))

server: | node_modules components
	rm -rf build/
	PORT=$(PORT) node test/server.js

clean:
	rm -rf build/ lib-cov/

clean-all: clean clean-deps clean-cov

clean-deps:
	rm -rf components/ node_modules/

clean-cov: | lib
	rm -rf lib-cov/

test: server

.PHONY: all clean server lib lib-cov test
