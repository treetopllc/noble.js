var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Affiliation.js", function () {
    describe("Affiliation", function () {
        var affiliation = client.affiliation("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/affiliations/abc", simpleResponse);

                affiliation.get(done);
            });
        });
    });
});
