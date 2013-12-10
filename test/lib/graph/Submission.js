describe("lib/graph/Submission.js", function () {
    describe("Submission", function () {
        var submission;

        before(function () {
            server.respondWith("/submissions/abc", [ 200, null, "OK" ]);
            server.respondWith("/submissions/abc/history", [ 200, null, "OK" ]);
        });

        before(function () {
            submission = client.submission("abc");
        });

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                submission.get(done);
                server.respond();
            });
        });

        describe("#history(callback)", function () {
            it("should pass a smoke test", function (done) {
                submission.history(done);
                server.respond();
            });
        });
    });
});
