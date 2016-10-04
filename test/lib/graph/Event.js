var utils = require("../../utils");
var mock = require("../../mock");
var client = utils.createClient();
var createArray = utils.createArray;
var simpleResponse = mock.simpleResponse;
var defaultHeaders = mock.defaultHeaders;

describe("lib/graph/Event.js", function () {
    describe("Events", function () {
        var event = client.event("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/events/abc", simpleResponse);

                event.get(done);
            });
        });

        describe("#users([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/events/abc/users", simpleResponse);

                event.users(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/events/abc/users?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                event.users({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/events/abc/participation", simpleResponse);

                event.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/events/abc/participation/impact", simpleResponse);

                event.participation("impact", done);
            });
        });
    });
});
