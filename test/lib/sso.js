var createClient = require("../utils").createClient;
var simpleResponse = require("../mock").simpleResponse;

describe("lib/sso.js", function () {
    var client = createClient();

    describe("Client#sso()", function () {
        it("should pass a smoke test", function (done) {
            server.respondWith("/sso/providers", simpleResponse);

            client.sso(done);
        });

         it("should pass a smoke test (with id)", function (done) {
            server.respondWith("/sso/providers?portals=123456", simpleResponse);

            client.sso("123456", done);
        });
    });
});
