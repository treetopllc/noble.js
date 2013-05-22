var api = require("noble.js"),
    request = require("superagent"),
    Request = request.Request,
    expect = require("expect.js");

describe("Client", function () {
    var client, config;

    // used to ignore errors that we trigger intentionally (like aborting a request)
    function ignore(callback) {
        return function () {
            callback();
        };
    }

    before(function (done) {
        request("api.json", function (err, res) {
            if (err) return done(err);

            var data = res.body;
            config = data;
            client = api(config.api_url, config.client_id, config.client_secret);

            client.login(data.username, data.password, done);
        });
    });

    describe("#request()", function () {
        var client; // meant to override the one from the upper scope

        before(function () {
            client = api(config.api_url, config.client_id, config.client_secret);

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
            var req = client.index(ignore(done)).abort();
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
            client = api(config.api_url, config.client_id, config.client_secret);
        });

        it("should return a Request object", function (done) {
            var req = client.login(null, null, ignore(done)).abort();
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

        it("should have a (mostly) empty querystring", function (done) {
            var req = client.search({}, ignore(done)).abort();

            expect(req._query).to.have.length(1);
        });

        it("should append all params to the querystring", function (done) {
            var params = { terms: "test", zip: 12345 },
                req = client.search(params, ignore(done)).abort();

            expect(req._query[1]).to.equal("terms=test&zip=12345");
        });

        it("should remove zip if lat/lng are specified", function (done) {
            var params = { zip: 12345, lat: -50, lon: 50 },
                req = client.search(params, ignore(done)).abort();

            expect(req._query[1]).to.equal("lat=-50&lon=50");
        });

        it("should remove range if neither zip nor lat/lng are specified", function (done) {
            var params = { terms: "test", range: 50 },
                req = client.search(params, ignore(done)).abort();

            expect(req._query[1]).to.equal("terms=test");
        });

        it("should return rows of results", function (done) {
            client.search({ terms: "school" }, function (err, data, res) {
                if (err) return done(err);

                expect(data).to.be.ok();
                expect(data.results).to.be.an(Array);
                done();
            });
        });
    });
});
