BIN = ./node_modules/.bin
MOCHA = $(BIN)/mocha-phantomjs
COMPONENT = $(BIN)/component
HTTP = $(BIN)/http-server

PORT := 3000
PID := server.pid

MOCHA_FLAGS := -R dot
HTTP_FLAGS := -p $(PORT)

SRC = index.js

all: build

node_modules: package.json
	npm install

components: node_modules component.json
	$(BIN)/component install --dev

build: components $(SRC)
	$(BIN)/component build --dev

server: | $(PID)

$(PID):
	@$(HTTP) $(HTTP_FLAGS) -s & echo "$$!" > $@
	echo "Server running at http://localhost:$(PORT)/"

killserver: $(PID)
	@kill $(shell cat $^)
	@rm -f $^

runtest: build
	$(MOCHA) $(MOCHA_FLAGS) http://localhost:$(PORT)/test/test.html

test: server runtest killserver

clean:
	rm -rf build/ components/ node_modules/

.PHONY: all server killserver runtest test clean
