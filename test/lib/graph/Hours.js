describe("lib/graph/Hours.js", function () {
    describe("Hours", function () {
        var hours = client.hours("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/hours/abc", simpleResponse);

                hours.get(done);
            });
        });
    });
});
