describe("Graph", function () {
    describe("User", function () {
        var user, userId;

        before(function (done) {
            if (config.graph.users.user_id) {
                userId = config.graph.users.user_id;
                user = client.user(userId);
                done();
            } else {
                client.index(function (err, data) {
                    if (err) return done(err);

                    userId = data.user;
                    user = client.user(userId);
                    done();
                });
            }
        });

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

            it("should parse date fields as Date objects", function (done) {
                user.get(function (err, data) {
                    if (err) return done(err);

                    each([ "created", "modified" ], function (prop) {
                        if (data[prop]) {
                            expect(data[prop]).to.be.a(Date);
                            expect(isNaN(data[prop].valueOf())).to.be(false);
                        }
                    });

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

                    expect(list.submissions).to.be.an(Array);
                    done();
                });
            });

            it("should allow for adding querystring arguments", function (done) {
                var query = { statuses: 3 },
                    req = user.submissions(query, ignore(done));

                expect(req._query).to.contain("statuses=3");
                req.abort();
            });

            it("should append arrays as lists separated by commas", function (done) {
                var query = { edge_types: [ 2, 3 ] },
                    req = user.submissions(query, ignore(done));

                expect(req._query).to.contain("edge_types=" + encodeURIComponent("2,3"));
                req.abort();
            });
        });
    });

    describe("Submission", function () {
        var conf, user, userId, submission, submissionId;

        function setUser(id) {
            userId = id;
            user = client.user(id);
        }

        function setSubmission(id) {
            submissionId = id;
            submission = client.submission(id);
        }

        before(function () {
            conf = config.graph.submissions;
        });

        before(function (done) {
            if (conf.user_id) {
                setUser(conf.user_id);
                done();
            } else {
                client.index(function (err, data) {
                    if (err) return done(err);

                    setUser(data.user);
                    done();
                });
            }
        });

        before(function (done) {
            if (conf.submission_id) {
                setSubmission(conf.submission_id);
            } else {
                this.timeout("5s");

                user.submissions(function (err, data) {
                    if (err) {
                        done(err);
                    } else if (!data.submissions.length) {
                        done(new Error("No submissions found to test with"));
                    } else {
                        setSubmission(data.submissions[0].submission_id);
                        done();
                    }
                });
            }
        });

        describe("#get()", function () {
            it("should pass a smoke test", function (done) {
                submission.get(done);
            });
        });

        describe("#attributes()", function () {
            it("should pass a smoke test", function (done) {
                submission.attributes({ status: 0 }, done);
            });

            it("should send the input object directly", function () {
                var input = { status: 0 },
                    req = submission.attributes(input, noop);

                expect(req._data).to.eql(input);
                req.abort();
            });
        });

        describe("#status()", function () {
            it("should be a shortcut for setting the status attribute", function () {
                var req = submission.status(0, noop);

                expect(req._data).to.eql({ status: 0 });
                req.abort();
            });

            it("should not include a description when set to a falsy value", function () {
                var req = submission.status(0, false, noop);

                expect(req._data).to.eql({ status: 0 });
                req.abort();
            });

            it("should include a description when set to a truthy value", function () {
                var req = submission.status(0, "foo", noop);

                expect(req._data).to.eql({ status: 0, description: "foo" });
                req.abort();
            });
        });

        describe("#accept()", function () {
            it("should be a shortcut for setting the status attribute to 1", function () {
                var req = submission.accept(noop);

                expect(req._data).to.eql({ status: 1 });
                req.abort();
            });
        });

        describe("#deny()", function () {
            it("should be a shortcut for setting the status attribute to 2", function () {
                var req = submission.deny(noop);

                expect(req._data).to.eql({ status: 2 });
                req.abort();
            });
        });
    });
});
