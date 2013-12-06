describe("lib/graph/Submission.js", function () {
    describe("Submission", function () {
        var submission;

        before(function (done) {
            client.me.submissions(function (err, list) {
                if (err) return done(err);
                submission = client.submission(list[0].submission_id);
                done();
            });
        });

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                submission.get(done);
            });
        });

        describe("#history(callback)", function () {
            it("should pass a smoke test", function (done) {
                submission.history(done);
            });
        });
    });
});
