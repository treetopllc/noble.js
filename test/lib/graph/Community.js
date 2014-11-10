var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Community.js", function () {
    describe("Communities", function () {
        var community = client.community("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/communities/abc", simpleResponse);

                community.get(done);
            });
        });
    });
});
