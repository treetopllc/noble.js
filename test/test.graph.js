describe("Graph", function () {
    var user, userId;

    this.timeout("5s");

    before(function () {
        userId = config.user_id;
        user = client.user(userId);
    });

    describe("User", function () {
        describe("#get()", function () {
            it("should pass a smoke test", function (done) {
                user.get(done);
            });

            it("should retrieve the correct user id", function (done) {
                user.get(function (err, data) {
                    expect(data.id).to.equal(userId);
                    done();
                });
            });
        });

        describe("#submissions()", function () {
            it("should pass a smoke test", function (done) {
                user.submissions(done);
            });

            it("should retrieve an array of submissions", function (done) {
                user.submissions(function (err, list) {
                    if (err) return done(err);

                    expect(list.submissions).to.be.an.instanceOf(Array);
                    done();
                });
            });

            it("should allow for adding querystring arguments", function (done) {
                var query = { statuses: 3 },
                    req = user.submissions(query, ignore(done));

                expect(req._query).to.include("statuses=3");
                req.abort();
            });

            it("should append arrays as lists separated by commas", function (done) {
                var query = { edge_types: [ 2, 3 ] },
                    req = user.submissions(query, ignore(done));

                expect(req._query).to.include("edge_types=" + encodeURIComponent("2,3"));
                req.abort();
            });
        });
    });

    describe.skip("Submission", function () {
        var submission, submissionId;

        before(function (done) {
            user.submissions(function (err, data) {
                if (err) {
                    done(err);
                } else if (!data.submissions.length) {
                    done(new Error("No submissions found to test with"));
                } else {
                    submissionId = data.submissions[0].submission_id;
                    submission = client.submission(submissionId);
                    done();
                }
            });
        });

        describe("#get()", function () {
            it("should pass a smoke test", function (done) {
                submission.get(done);
            });
        });
    });
});
