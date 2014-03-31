describe("lib/graph/HoursSet.js", function () {
    describe("HoursSet", function () {
        var hoursSet = client.hoursSet("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/hour_sets/abc", simpleResponse);

                hoursSet.get(done);
            });
        });
    });
});
