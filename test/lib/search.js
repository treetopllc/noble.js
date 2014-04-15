var expect = require("expect.js");
var createClient = require("../utils").createClient;
var mock = require("../mock");
var Request = require("superagent").Request;
var chance = mock.chance;
var defaultHeaders = mock.defaultHeaders;
var simpleResponse = mock.simpleResponse;

describe("lib/search.js", function () {
    var client = createClient();

    describe("Client#search()", function () {
        function generate() {
            return {
                id:             chance.guid(),
                name:           chance.name(),
                description:    chance.paragraph(),
                slug:           chance.slug(),
                vertex_type_id: chance.type_id(),
                deleted:        chance.deleted(),
                created:        chance.isodate(),
                modified:       chance.isodate()
            };
        }

        it("should return a Request object", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            var req = client.search(done);
            expect(req).to.be.a(Request);
        });

        it("should append all params to the querystring", function (done) {
            server.respondWith("/search?terms=test", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            var params = { terms: "test" };
            var req = client.search(params, done);
            expect(req._query).to.contain("terms=test");
        });

        it("should return an array of results", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            client.search(function (err, results) {
                if (err) return done(err);
                expect(results).to.be.an(Array);
                done();
            });
        });

        it("should parse date fields as Date objects", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            client.search(function (err, results) {
                if (err) return done(err);
                var row = results[0];
                expect(row.created).to.be.a(Date);
                expect(row.modified).to.be.a(Date);
                done();
            });
        });

        it("should translate id fields into name fields", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [
                        {
                            vertex_type_id: 5, // Event
                            subtype_id: 0      // Celebration
                        },
                        {
                            vertex_type_id: 2, // Organization
                            subtype_id: 1      // Club
                        },
                        {
                            vertex_type_id: 3, // Opportunity
                            subtype_id: 2      // Volunteer Service
                        }
                    ]
                })
            ]);

            client.search(function (err, results) {
                if (err) return done(err);

                expect(results[0].type).to.equal("Event");
                expect(results[0].subtype).to.equal("Celebration");

                expect(results[1].type).to.equal("Organization");
                expect(results[1].subtype).to.equal("Club");

                expect(results[2].type).to.equal("Opportunity");
                expect(results[2].subtype).to.equal("Volunteer Service");

                done();
            });
        });
    });
});
