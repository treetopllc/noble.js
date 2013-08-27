BIN = ./node_modules/.bin
COMPONENT = $(BIN)/component

PORT ?= 3000
PID := server.pid

SRC = index.js $(wildcard lib/*.js)

all: build

node_modules: package.json
	npm install

components: node_modules component.json
	$(COMPONENT) install --dev

build: components $(SRC)
	$(COMPONENT) build --dev

test: test/api.json

test/api.json: test/api-dist.json
	cp $< $@

server: node_modules
	PORT=$(PORT) node test/server.js

clean:
	rm -rf build/ components/ node_modules/

.PHONY: all clean server
