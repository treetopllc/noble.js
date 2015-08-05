var mock = require("../../mock");
var utils = require("../../utils");
var defaultHeaders = mock.defaultHeaders;
var simpleResponse = mock.simpleResponse;
var client = utils.createClient();
var createArray = utils.createArray;

describe("lib/graph/User.js", function () {
    describe("User", function () {
        var user = client.user("abc");
        var id = "123";

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
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                user.submissions({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#submission([id])", function () {
            it("should create a Submission with User as it's owner", function () {
                var sub = user.submission();
                expect(sub).to.be.a(client.Submission);
                expect(sub.owner).to.equal(user);
            });
        });

        describe("#moderations([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/moderations", simpleResponse);

                user.moderations(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/moderations?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                user.moderations({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });


        describe("#moderationsSummary(query, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/moderations/summary", simpleResponse);

                user.moderationsSummary(done);
            });
        });


        describe("#moderation([id])", function () {
            it("should create a Moderation with User as it's owner", function () {
                var sub = user.moderation();
                expect(sub).to.be.a(client.Moderation);
                expect(sub.owner).to.equal(user);
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

        describe("#content([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/content", simpleResponse);

                user.content(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/content?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                user.content({ limit: 5 }, function (err, results) {
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

        describe("#roleUpdate(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/submissions", simpleResponse);

                user.roleUpdate({}, done);
            });
        });

        describe("#roleDelete(obj, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/network/obj", simpleResponse);

                user.roleDelete("obj", done);
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

        describe("#alert(id)", function () {
            it("should return an Alert object", function () {
                expect(user.alert("abc")).to.be.a(client.Alert);
            });

            it("should set the owner as the user", function () {
                expect(user.alert("abc").owner).to.equal(user);
            });
        });

        describe("#alerts([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/alerts", simpleResponse);

                user.alerts(done);
            });
        });


        describe("#emailList(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/emails", simpleResponse);

                user.emailList(done);
            });
        });

        describe("#emailAdd(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/emails", simpleResponse);

                user.emailAdd({}, done);
            });
        });

        describe("#emailDelete(obj, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/emails/obj", simpleResponse);

                user.emailDelete("obj", done);
            });
        });

        describe("#alertsStats(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/alerts/stats", simpleResponse);

                user.alertsStats(done);
            });
        });

        describe("#preferences([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/preferences", simpleResponse);

                user.preferences(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/users/abc/preferences?weekly_email_digest=true", [
                200,
                defaultHeaders,
                JSON.stringify(createArray(5, function () {
                    return { id: chance.guid() };
                }))
                ]);

                user.preferences({ weekly_email_digest: true }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length);
                    done();
                });
            });
        });

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/participation", simpleResponse);

                user.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/users/abc/participation/impact", simpleResponse);

                user.participation("impact", done);
            });

            it("should pass a smoke test (with entity)", function (done) {
                server.respondWith("/users/abc/participation?for=def", simpleResponse);

                user.participation(null, "def", done);
            });

            it("should pass a smoke test (with key and entity)", function (done) {
                server.respondWith("/users/abc/participation/impact?for=def", simpleResponse);

                user.participation("impact", "def", done);
            });
        });

        describe("#author(type, params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/hours", simpleResponse);

                user.author("hours", {}, done);
            });

            it("should automatically turn Date objects into ISO strings", function (done) {
                server.respondWith("/users/abc/hours", simpleResponse);

                var params = {
                    start_ts: new Date(),
                    end_ts: new Date()
                };

                user.author("hours", params, done);

                expect(params.start_ts).to.be.a("string");
                expect(params.end_ts).to.be.a("string");
            });
        });

        describe("#add(type, id, params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/hours", simpleResponse);
                user.add("hours", {}, done);
            });
        });

        describe("#authorModify(type, id, params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/hours/123", simpleResponse);

                user.authorModify("hours", id, {}, done);
            });

            it("should automatically turn Date objects into ISO strings", function (done) {
                server.respondWith("/users/abc/hours/123", simpleResponse);

                var params = {
                    start_ts: new Date(),
                    end_ts: new Date()
                };

                user.authorModify("hours", id, params, done);

                expect(params.start_ts).to.be.a("string");
                expect(params.end_ts).to.be.a("string");
            });
        });

        describe("#contribute(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/submissions", simpleResponse);
                user.contribute({}, done);
            });
        });

        describe("#favorite(entity, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/favorites/test", simpleResponse);
                user.favorite("test", done);
            });
        });

        describe("#unfavorite(entity, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/favorites/test", simpleResponse);
                user.unfavorite("test", done);
            });
        });

        describe("#activity([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/activity", simpleResponse);
                user.activity(done);
            });
        });
    });
});
