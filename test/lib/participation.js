var expect = require("expect.js");
var createClient = require("../utils").createClient;
var mock = require("../mock");
var Request = require("superagent").Request;
var chance = mock.chance;
var defaultHeaders = mock.defaultHeaders;
var simpleResponse = mock.simpleResponse;

describe("lib/participation.js", function () {
    var client = createClient();

    describe("Client#participation()", function () {
        it("should pass a smoke test", function (done) {
            server.respondWith("/participation", simpleResponse);

            client.participation(done);
        });

        it("should pass a smoke test (with key)", function (done) {
            server.respondWith("/participation/impact", simpleResponse);

            client.participation("impact", done);
        });
    });
});
