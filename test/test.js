var api = require("noble.js"),
    request = require("superagent"),
    each = require("each"),
    async = require("async"),
    expect = require("expect.js"),
    Request = request.Request,
    client, config;

before(function (done) {
    request("api.json", function (err, res) {
        if (err) return done(err);

        var data = res.body;
        config = typeof data === "string" ? JSON.parse(data) : data;
        client = createClient();

        client.login(data.username, data.password, done);
    });
});

// used to ignore errors that we trigger intentionally (like aborting a request)
function ignore(callback) {
    return function () {
        callback();
    };
}

function noop() {}

function createClient() {
    return api(config.proxy_url || config.api_url, config.client_id, config.client_secret);
}

describe("Client", function () {
    describe("#request()", function () {
        var client; // meant to override the one from the upper scope

        before(function () {
            client = createClient();

            client.auth = {
                access_token: "foo",
                username: "bar"
            };
        });

        it("should add access_token to query string", function () {
            expect(client.request()._query[0]).to.equal("access_token=foo");
        });

        it("should return a Request object", function () {
            expect(client.request()).to.be.a(Request);
        });
    });

    describe("#index()", function () {
        it("should return a Request object", function (done) {
            var req = client.index(ignore(done));
            expect(req).to.be.a(Request);
        });

        it("should be the NH API root", function (done) {
            client.index(function (err, data) {
                if (err) return done(err);

                expect(data).to.have.property("description", "Noblehour API");
                done();
            });
        });
    });

    describe("#login()", function () {
        var client; // meant to override the one from the upper scope

        before(function () {
            client = createClient();
        });

        it("should return a Request object", function (done) {
            var req = client.login(null, null, ignore(done));
            expect(req).to.be.a(Request);
        });

        it("should attach the returned auth data to the client object", function (done) {
            client.login(config.username, config.password, function (err, auth) {
                if (err) return done(err);

                expect(auth).to.be.ok();
                expect(auth).to.equal(client.auth);
                done();
            });
        });

        it("should fail for bad username / password combo", function (done) {
            client.login("not", "real", function (err) {
                expect(err.message).to.be.equal("Bad username or password");
                done();
            });
        });
    });

    describe("#search()", function () {
        it("should return a Request object", function (done) {
            var req = client.search({}, ignore(done));
            expect(req).to.be.a(Request);
        });

        it("should not automatically add return=geoJSON to the querystring", function (done) {
            var req = client.search({}, ignore(done));
            expect(req._query).to.not.contain("return=geoJSON");
        });

        it("should add return=geoJSON when the geojson: true", function (done) {
            var req = client.search({ geojson: true }, function (err, data) {
                if (err) return done(err);

                expect(data.results.features).to.be.ok();
                done();
            });

            expect(req._query).to.contain("return=geoJSON");
        });

        it("should append all params to the querystring", function (done) {
            var params = { terms: "test", lat: 100, lon: 100 },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("terms=test&lat=100&lon=100");
        });

        it("should convert an array of types to numbers", function (done) {
            var params = { types: [ "opportunities", "events", "organizations" ] },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("types=" + encodeURIComponent("3,5,2"));
        });

        it("should return an array of results", function (done) {
            client.search({}, function (err, data) {
                if (err) return done(err);

                expect(data.results).to.be.ok();
                done();
            });
        });

        it("should parse date fields as Date objects", function (done) {
            client.search(config.graph.search, function (err, data) {
                if (err) return done(err);

                each(data.results, function (row) {
                    each([
                        "created", "modified",
                        "start_ts", "end_ts"
                    ], function (prop) {
                        if (row[prop]) {
                            expect(row[prop]).to.be.a(Date);
                            expect(isNaN(row[prop].valueOf())).to.be(false);
                        }
                    });
                });

                done();
            });
        });
    });

    describe("#user()", function () {
        it("should return a User object", function () {
            expect(client.user("test")).to.be.a(require("noble.js/lib/User"));
        });
    });

    describe.skip("#submission()", function () {
        it("should return a Submission object", function () {
            expect(client.submission("test")).to.be.a(require("noble.js/lib/Submission"));
        });
    });
});
