// global variables
var api = require("noble.js");
var each = require("each");
var Chance = require("chance");
var expect = require("expect.js");
var request = require("superagent");
var sinon = require("sinon");

var chance = new Chance();
var Request = request.Request;
var client = createClient();
var server;
var defaultHeaders = { "Content-Type": "application/json" };

// global hooks
before(function () {
    server = sinon.fakeServer.create();

    server.respondWith("POST", "/oauth/token", function (req) {
        var body = JSON.parse(req.requestBody);

        if (body.username === "testuser" && body.password === "123456") {
            req.respond(200, defaultHeaders, JSON.stringify({
                user_id: "testuser-uuid",
                access_token: "abc123",
                refresh_token: "def456",
                expires_in: 1000
            }));
        } else {
            req.respond(400, defaultHeaders, JSON.stringify({
                error: "invalid_request",
                error_description: "invalid user name or password"
            }));
        }
    });
});

after(function () {
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
