describe("lib/graph/Submission.js", function () {
    describe("Submission", function () {
        var submission = client.submission("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/submissions/abc", simpleResponse);

                submission.get(done);
            });
        });

        describe("#history(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/submissions/abc/history", simpleResponse);

                submission.history(done);
            });
        });
    });
});
