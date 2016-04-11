var mock = require("../../mock");
var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;
var defaultHeaders = mock.defaultHeaders;
var utils = require("../../utils");
var createArray = utils.createArray;

describe("lib/graph/Group.js", function () {
    describe("Groups", function () {
        var group = client.group("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc", simpleResponse);

                group.get(done);
            });
        });

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc/participation", simpleResponse);

                group.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/groups/abc/participation/impact", simpleResponse);

                group.participation("impact", done);
            });
        });

        describe("#users([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc/users", simpleResponse);

                group.users(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/groups/abc/users?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                group.users({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#partnerships([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc/partnerships", simpleResponse);

                group.partnerships(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/groups/abc/partnerships?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return { id: chance.guid() };
                    }))
                ]);

                group.partnerships({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });
    });
});
