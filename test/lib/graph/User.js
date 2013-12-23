describe("lib/graph/User.js", function () {
    describe("User", function () {
        var user = client.user("abc")

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

        describe("#contribute(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/submissions", simpleResponse);

                user.contribute({
                    content_id: chance.guid(),
                    to: [ chance.guid() ]
                }, done);
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
    });
});
