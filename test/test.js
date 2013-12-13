// global variables
var api = require("noble.js");
var each = require("each");
var map = require("map");
var Chance = require("chance");
var expect = require("expect.js");
var request = require("superagent");
var sinon = require("sinon");

var chance = new Chance();
var Request = request.Request;
var client = createClient();
var server;
var defaultHeaders = { "Content-Type": "application/json" };
var simpleResponse = [ 200, null, "OK" ];

sinon.log = function () {
    console.log.apply(console, arguments);
};

sinon.format = function (val) {
    if (typeof val === "object") {
        return JSON.stringify(val, null, 2);
    }

    return "" + val;
};

// global hooks
beforeEach(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;

    /*server.respondWith("POST", "/oauth/token", function (req) {
        var body = JSON.parse(req.requestBody);

        if (body.username === "testuser" && body.password === "123456") {
            req.respond();
        } else {
            req.respond(400, defaultHeaders, JSON.stringify({
                error: "invalid_request",
                error_description: "invalid user name or password"
            }));
        }
    });
    */
});

afterEach(function () {
    server.restore();
});

// chance mixins
chance.mixin({
    token: function () {
        return chance.hash({ length: 12 });
    },
    isodate: function () {
        return chance.date().toISOString();
    },
    type_id: function () {
        return chance.integer({ min: 0, max: 13 });
    },
    subtype_id: function () {
        return chance.integer({ min: 0, max: 13 });
    },
    slug: function () {
        return chance.string({ pool: "1234567890", length: 7 });
    },
    deleted: function () {
        return chance.bool({ likelihood: 1 });
    },
    timezone: function () {
        return chance.pick([
            "US/Pacific", "US/Mountain", "US/Central", "US/Eastern"
        ]);
    },
    submissionStatus: function () {
        return chance.integer({ min: 0, max: 3 });
    }
});

// global helpers
function createClient() {
    return api("/", "test", "secret");
}

function createArray(size, generator) {
    return map(Array(size), generator);
}
