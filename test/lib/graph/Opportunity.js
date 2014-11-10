var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Opportunity.js", function () {
    describe("Opportunities", function () {
        var opportunity = client.opportunity("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/opportunities/abc", simpleResponse);

                opportunity.get(done);
            });
        });
    });
});
