var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Url.js", function () {
    describe("URLs", function () {
        var url = client.url("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/urls/abc", simpleResponse);

                url.get(done);
            });
        });
    });
});
