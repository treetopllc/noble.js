var client = require("../../utils").createClient();
var mock = require("../../mock");
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

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/organizations/abc/participation", simpleResponse);

                organization.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/organizations/abc/participation/impact", simpleResponse);

                organization.participation("impact", done);
            });

            it("should pass a smoke test (with entity)", function (done) {
                server.respondWith("/organizations/abc/participation?for=def", simpleResponse);

                organization.participation(null, "def", done);
            });

            it("should pass a smoke test (with key and entity)", function (done) {
                server.respondWith("/organizations/abc/participation/impact?for=def", simpleResponse);

                organization.participation("impact", "def", done);
            });
        });
    });
});
