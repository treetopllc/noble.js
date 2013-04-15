BIN = ./node_modules/.bin
MOCHA = $(BIN)/mocha-phantomjs
COMPONENT = $(BIN)/component
HTTP = $(BIN)/http-server

all: deps
	$(COMPONENT) build --dev

clean:
	rm -rf build/ components/

deps:
	npm install
	$(COMPONENT) install --dev

server:
	$(HTTP) -p 3000

test: deps
	$(MOCHA) test/test.html

.PHONY: all clean deps test
