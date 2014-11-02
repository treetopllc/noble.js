var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Event.js", function () {
    describe("Events", function () {
        var event = client.event("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/events/abc", simpleResponse);

                event.get(done);
            });
        });
    });
});
