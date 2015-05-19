var utils = require("../../utils");
var mock = require("../../mock");
var client = utils.createClient();
var createArray = utils.createArray;
var simpleResponse = mock.simpleResponse;
var defaultHeaders = mock.defaultHeaders;

describe("lib/graph/Organization.js", function () {
    describe("Organization", function () {
        var organization = client.organization("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc", simpleResponse);

                organization.get(done);
            });
        });

        describe("#content(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/content", simpleResponse);

                organization.content(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/content?limit=5", simpleResponse);
                organization.content({ limit: 5 }, done);
            });
        });

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/participation", simpleResponse);

                organization.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/organizations/abc/participation/impact", simpleResponse);

                organization.participation("impact", done);
            });
        });

        describe("#user([id])", function () {
            it("should create a User with Organization as it's owner", function () {
                var sub = organization.user();
                expect(sub).to.be.a(client.User);
                expect(sub.owner).to.equal(organization);
            });
        });

        describe("#users([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/users", simpleResponse);

                organization.users(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/users?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                organization.users({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#relationships([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/relationships", simpleResponse);

                organization.relationships(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/relationships?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                organization.relationships({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#submission([id])", function () {
            it("should create a Submission with Organization as it's owner", function () {
                var sub = organization.submission();
                expect(sub).to.be.a(client.Submission);
                expect(sub.owner).to.equal(organization);
            });
        });

        describe("#submissions([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/submissions", simpleResponse);

                organization.submissions(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/submissions?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                organization.submissions({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#track([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/track", simpleResponse);

                organization.track(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/track?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                organization.track({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#moderations([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/moderations", simpleResponse);

                organization.moderations(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/moderations?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                organization.moderations({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#moderation([id])", function () {
            it("should create a Moderation with Organization as it's owner", function () {
                var sub = organization.moderation();
                expect(sub).to.be.a(client.Moderation);
                expect(sub.owner).to.equal(organization);
            });
        });

        describe("#programs([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/programs", simpleResponse);

                organization.programs(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/programs?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                organization.programs({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#program([id])", function () {
            it("should create a Program with Organization as its owner", function () {
                var sub = organization.program();
                expect(sub).to.be.a(client.Program);
                expect(sub.owner).to.equal(organization);
            });
        });

        describe("#affiliations([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/affiliations", simpleResponse);

                organization.affiliations(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/affiliations?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                organization.affiliations({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#affiliation([id])", function () {
            it("should create a Affiliation with Organization as it's owner", function () {
                var sub = organization.affiliation();
                expect(sub).to.be.a(client.Affiliation);
                expect(sub.owner).to.equal(organization);
            });
        });

        describe("#groups([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/groups", simpleResponse);

                organization.groups(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/groups?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                organization.groups({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#group([id])", function () {
            it("should create a Moderation with Organization as it's owner", function () {
                var sub = organization.group();
                expect(sub).to.be.a(client.Group);
                expect(sub.owner).to.equal(organization);
            });
        });
    });
});
