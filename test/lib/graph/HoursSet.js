var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/HoursSet.js", function () {
    describe("HoursSet", function () {
        var hoursSet = client.hoursSet("abc");

        describe("#base", function() {
            it("should be specific to the hour_sets entity type", function() {
                expect(hoursSet.base).to.equal("hour_sets");
            });
        });

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/hour_sets/abc", simpleResponse);

                hoursSet.get(done);
            });
        });

        describe("#hours([query], callback)", function() {
            it("should pass a smoke test", function(done) {
                server.respondWith("/hour_sets/abc/hours", simpleResponse);

                hoursSet.hours(done);
            });
        });
    });
});
