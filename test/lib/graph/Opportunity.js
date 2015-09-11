var utils = require("../../utils");
var mock = require("../../mock");
var client = utils.createClient();
var createArray = utils.createArray;
var simpleResponse = mock.simpleResponse;
var defaultHeaders = mock.defaultHeaders;

describe("lib/graph/Opportunity.js", function () {
    describe("Opportunities", function () {
        var opportunity = client.opportunity("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/opportunities/abc", simpleResponse);

                opportunity.get(done);
            });
        });

        describe("#users([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/opportunities/abc/users", simpleResponse);

                opportunity.users(done);
            });

            it("should pass additional querystring arguments", function (done) {
                server.respondWith("/opportunities/abc/users?limit=5", [
                    200,
                    defaultHeaders,
                    JSON.stringify(createArray(5, function () {
                        return {
                            id: chance.guid()
                        };
                    }))
                ]);

                opportunity.users({ limit: 5 }, function (err, results) {
                    if (err) return done(err);
                    expect(results.length).to.equal(5);
                    done();
                });
            });
        });
    });
});
