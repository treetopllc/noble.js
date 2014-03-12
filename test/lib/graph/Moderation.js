describe("lib/graph/Moderation.js", function () {
    describe("Moderation", function () {
        var moderation = client.moderation("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/moderations/abc", simpleResponse);

                moderation.get(done);
            });
        });
    });
});
