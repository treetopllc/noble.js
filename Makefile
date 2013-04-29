PORT := 3000
REPORTER := dot
PID := server.pid

BIN = ./node_modules/.bin
MOCHA = $(BIN)/mocha-phantomjs
COMPONENT = $(BIN)/component
HTTP = $(BIN)/http-server

all: deps
	$(COMPONENT) build --dev

deps:
	npm install
	$(COMPONENT) install --dev

clean:
	rm -rf build/ components/ node_modules/

server: $(PID)

$(PID):
	@$(HTTP) -p $(PORT) -s & echo "$$!" > $@
	echo "Server running at http://localhost:$(PORT)/"

killserver: $(PID)
	@kill $(shell cat $^)
	@rm -f $^

runtest:
	@$(MOCHA) -R $(REPORTER) http://localhost:$(PORT)/test/test.html

test: server runtest killserver

.PHONY: all deps clean server killserver runtest test
