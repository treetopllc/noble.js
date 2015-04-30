var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Program.js", function () {
    describe("Programs", function () {
        var program = client.program("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/programs/abc", simpleResponse);

                programs.get(done);
            });
        });
    });
});
