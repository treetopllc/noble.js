describe("lib/graph/User.js", function () {
    describe("User", function () {
        var user = client.user("abc");

        describe("#base", function () {
            it("should be specific to the users entity type", function () {
                expect(user.base).to.equal("users");
            });
        });

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc", simpleResponse);

                user.get(done);
            });
        });

        describe("#submissions([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/submissions", simpleResponse);

                user.submissions(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/submissions?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { submission_id: chance.guid() };
                    }))
                ]);

                user.submissions({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/users/abc/submissions", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            submission_edge_type_id: 8, // Author
                            submission_status_id: 0,    // Unsubmitted
                            content_type_id: 5,         // Event
                            destination_type_id: 2      // Organization
                        }
                    ])
                ]);

                user.submissions(function (err, results) {
                    if (err) return done(err);
                    var row = results[0];
                    expect(row.submission_edge_type).to.equal("Author");
                    expect(row.submission_status).to.equal("Unsubmitted");
                    expect(row.content_type).to.equal("Event");
                    expect(row.destination_type).to.equal("Organization");
                    done();
                });
            });
        });

        describe("#authored([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/authored", simpleResponse);

                user.authored(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/authored?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                user.authored({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/users/abc/authored", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            type_id: 0    // News
                        },
                        {
                            type_id: 5,   // Event
                            subtype_id: 4 // Educational
                        }
                    ])
                ]);

                user.authored(function (err, results) {
                    if (err) return done(err);

                    expect(results[0].type).to.equal("News");
                    expect(results[0].subtype).to.not.be.ok();

                    expect(results[1].type).to.equal("Event");
                    expect(results[1].subtype).to.equal("Educational");

                    done();
                });
            });
        });

        describe("#feed([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/feed", simpleResponse);

                user.feed(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/feed?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                user.feed({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/users/abc/feed", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            type_id: 10   // Hours
                        },
                        {
                            type_id: 2,   // Organization
                            subtype_id: 3 // For-Profit
                        }
                    ])
                ]);

                user.feed(function (err, results) {
                    if (err) return done(err);

                    expect(results[0].type).to.equal("Hours");
                    expect(results[0].subtype).to.not.be.ok();

                    expect(results[1].type).to.equal("Organization");
                    expect(results[1].subtype).to.equal("For-Profit");

                    done();
                });
            });
        });

        describe("#network([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/network", simpleResponse);

                user.network(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/network?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                user.network({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/users/abc/feed", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            type_id: 7    // User
                        },
                        {
                            type_id: 3,   // Opportunity
                            subtype_id: 6 // Performance
                        }
                    ])
                ]);

                user.feed(function (err, results) {
                    if (err) return done(err);

                    expect(results[0].type).to.equal("User");
                    expect(results[0].subtype).to.not.be.ok();

                    expect(results[1].type).to.equal("Opportunity");
                    expect(results[1].subtype).to.equal("Performance");

                    done();
                });
            });
        });

        describe("#role([entity], callback)", function () {
            it("should pass a smoke test (no entity)", function (done) {
                server.respondWith("/users/abc/role", simpleResponse);

                user.role(done);
            });

            it("should pass a smoke test (with entity)", function (done) {
                server.respondWith("/users/abc/role?for=def", simpleResponse);

                user.role("def", done);
            });
        });

        describe("#alerts([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/alerts", simpleResponse);

                user.alerts(done);
            });
        });

        describe("#alertsStats(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/alerts/stats", simpleResponse);

                user.alertsStats(done);
            });
        });

        describe("#participation([entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/participation", simpleResponse);

                user.participation(done);
            });

            it("should pass a smoke test (with entity)", function (done) {
                server.respondWith("/users/abc/participation?for=def", simpleResponse);

                user.participation("def", done);
            });
        });

        describe("#addHours(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/hours", simpleResponse);

                user.addHours({
                    start_ts: new Date(),
                    end_ts: new Date()
                }, done);
            });
        });
    });
});
