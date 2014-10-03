var createClient = require("../utils").createClient;
var simpleResponse = require("../mock").simpleResponse;

describe("lib/saml.js", function () {
    var client = createClient();

    describe("Client#saml()", function () {
        it("should pass a smoke test", function (done) {
            server.respondWith("/saml/providers", simpleResponse);

            client.saml(done);
        });

         it("should pass a smoke test (with id)", function (done) {
            server.respondWith("/saml/providers?portals=123456", simpleResponse);

            client.saml("123456", done);
        });
    });
});
