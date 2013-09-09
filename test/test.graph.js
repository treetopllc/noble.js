describe("Graph", function () {
    this.timeout("10s");

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
                        if (typeof data[prop] !== "undefined") {
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
            });

            it("should append arrays as lists separated by commas", function (done) {
                var query = { edge_types: [ 2, 3 ] },
                    req = user.submissions(query, ignore(done));

                expect(req._query).to.contain("edge_types=" + encodeURIComponent("2,3"));
            });

            it("should parse date fields as Date objects", function (done) {
                user.get(function (err, data) {
                    if (err) return done(err);

                    each([ "content_modified", "submission_date" ], function (prop) {
                        if (typeof data[prop] !== "undefined") {
                            expect(data[prop]).to.be.a(Date);
                            expect(isNaN(data[prop].valueOf())).to.be(false);
                        }
                    });

                    done();
                });
            });
        });
    });

    describe("Submission", function () {
        var conf,
            user, userId,
            submission, submissionId, submissionTypeId, contentId,
            req;

        function setUser(id) {
            userId = id;
            user = client.user(id);
        }

        function setSubmission(data) {
            submissionId = data.submission_id;
            contentId = data.content_id;
            submissionTypeId = data.submission_type_id;
            submission = client.submission(submissionId);
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
            if (conf.submission_id && conf.submission_type_id) {
                setSubmission(conf);
            } else {
                user.submissions(function (err, data) {
                    if (err) {
                        done(err);
                    } else if (!data.submissions.length) {
                        done(new Error("No submissions found to test with"));
                    } else {
                        setSubmission(data.submissions[0]);
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

        describe("#status()", function () {
            it("should pass a smoke test", function (done) {
                submission.status(contentId, submissionTypeId, 0, done);
            });

            it("should be a shortcut for setting the status attribute", function (done) {
                var req = submission.status(contentId, submissionTypeId, 0, done);
                expect(req._data).to.have.property("status", 0);
            });

            it("should not include a description when set to a falsy value", function (done) {
                var req = submission.status(contentId, submissionTypeId, 0, false, done);
                expect(req._data).to.not.have.property("description");
            });

            it("should include a description when set to a truthy value", function (done) {
                var req = submission.status(contentId, submissionTypeId, 0, "foo", done);

                expect(req._data).to.have.property("status", 0)
                    .and.have.property("description", "foo");
            });

            it("should prepopulate content_id and submission_type fields", function (done) {
                var req = submission.status(contentId, submissionTypeId, 0, done);

                expect(req._data).to.have.property("content_id", contentId)
                    .and.have.property("submission_type", submissionTypeId);
            });
        });

        describe("#accept()", function () {
            it("should be a shortcut for setting the status attribute to 1", function (done) {
                var req = submission.accept(contentId, submissionTypeId, done);
                expect(req._data).to.have.property("status", 1);
            });
        });

        describe("#deny()", function () {
            it("should be a shortcut for setting the status attribute to 2", function (done) {
                var req = submission.deny(contentId, submissionTypeId, done);
                expect(req._data).to.have.property("status", 2);
            });
        });
    });
});
