PORT := 3000
REPORTER := dot
PID := server.pid

BIN = ./node_modules/.bin
SRC = index.js

all: build

deps: node_modules components

node_modules: package.json
	npm install

components: component.json
	$(BIN)/component install --dev

build: deps $(SRC)
	$(BIN)/component build --dev

server: $(PID)

$(PID):
	@$(BIN)/http-server -p $(PORT) -s & echo "$$!" > $@
	echo "Server running at http://localhost:$(PORT)/"

killserver: $(PID)
	@kill $(shell cat $^)
	@rm -f $^

runtest: build
	$(BIN)/mocha-phantomjs -R $(REPORTER) http://localhost:$(PORT)/test/test.html

test: deps server runtest killserver

clean:
	rm -rf build/ components/ node_modules/

.PHONY: all deps server killserver runtest test clean
