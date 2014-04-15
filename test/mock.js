// Sinon.JS -- used for mock HTTP requests
var sinon = require("sinon");

sinon.log = require("debug")("noble.js:test:mock");

sinon.format = function (val) {
    if (typeof val === "object") {
        return JSON.stringify(val, null, 2);
    }

    return "" + val;
};

// global mocha hooks + global server var (boo!)
// TODO: find a better HTTP mocking library... Sinon sucks

beforeEach(function () {
    window.server = sinon.fakeServer.create();
    window.server.autoRespond = true;
});

afterEach(function () {
    window.server.restore();
});

exports.defaultHeaders = { "Content-Type": "application/json" };
exports.simpleResponse = [ 200, null, "OK" ];


// Chance.js -- used for mock data generation
var Chance = require("chancejs");
var chance = new Chance();

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

exports.chance = chance;
