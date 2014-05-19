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

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/organizations/abc/content", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            content: {
                                vertex_type_id: 0 // News
                            },
                            author: {
                                vertex_type_id: 7 // User
                            },
                            submitter: {
                                vertex_type_id: 7 // User
                            },
                            submission: {
                                vertex_type_id: 8, // Submission
                                status: 1 // Approved
                            }
                        }
                    ])
                ]);

                organization.content(function (err, results) {
                    if (err) return done(err);
                    var row = results[0];
                    expect(row.content.vertex_type).to.equal("News");
                    expect(row.author.vertex_type).to.equal("User");
                    expect(row.submitter.vertex_type).to.equal("User");
                    expect(row.submission.vertex_type).to.equal("Submission");
                    expect(row.submission.status_name).to.equal("Approved");
                    done();
                });
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/organizations/abc/content?limit=5", simpleResponse);
                organization.content({ limit: 5 }, done);
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

            it("should translate id fields into name fields", function (done) {
                server.respondWith("/organizations/abc/submissions", [
                    200,
                    defaultHeaders,
                    JSON.stringify([
                        {
                            edge_type_id: 9, // Verifier
                            status_id: 0, // Unsubmitted
                            content: {
                                vertex_type_id: 5 // Event
                            },
                            destination: {
                                vertex_type_id: 2 // Organization
                            }
                        }
                    ])
                ]);

                organization.submissions(function (err, results) {
                    if (err) return done(err);
                    var row = results[0];
                    expect(row.edge_type).to.equal("Verifier");
                    expect(row.content.vertex_type).to.equal("Event");
                    expect(row.destination.vertex_type).to.equal("Organization");
                    done();
                });
            });
        });
    });
});
