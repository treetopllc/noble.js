var api = require("noble.js"),
    utils = require("noble.js/lib/utils"),
    request = require("superagent"),
    chai = require("chai"),
    Request = request.Request,
    expect = chai.expect;

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
            expect(client.request()).to.be.an.instanceOf(Request);
        });
    });

    describe("#index()", function () {
        it("should return a Request object", function (done) {
            var req = client.index(ignore(done)).abort();
            expect(req).to.be.an.instanceOf(Request);
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
            expect(req).to.be.an.instanceOf(Request);
        });

        it("should attach the returned auth data to the client object", function (done) {
            client.login(config.username, config.password, function (err, auth) {
                if (err) return done(err);

                expect(auth).to.be.ok;
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
            expect(req).to.be.an.instanceOf(Request);
        });

        it("should not automatically add return=geoJSON to the querystring", function (done) {
            var req = client.search({}, ignore(done));

            expect(req._query).to.not.contain("return=geoJSON");
            req.abort();
        });

        it("should add return=geoJSON when the geojson: true", function (done) {
            var req = client.search({ geojson: true }, function (err, data) {
                if (err) return done(err);

                expect(data.results.features).to.be.ok;
                done();
            });

            expect(req._query).to.contain("return=geoJSON");
        });

        it("should append all params to the querystring", function (done) {
            var params = { terms: "test", lat: 100, lon: 100 },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("terms=test&lat=100&lon=100");
            req.abort();
        });

        it("should convert an array of types to numbers", function (done) {
            var params = { types: [ "opportunities", "events", "organizations" ] },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("types=" + encodeURIComponent("3,5,2"));
            req.abort();
        });

        it("should return an array of results", function (done) {
            client.search({}, function (err, data, res) {
                if (err) return done(err);

                expect(data.results).to.be.ok;
                done();
            });
        });
    });

    describe("utils", function () {
        describe(".normalizeurl()", function () {
            it("should strip trailing slashes", function () {
                var url = utils.normalizeurl("http://localhost:7000/");
                expect(url).to.equal("http://localhost:7000");
            });
        });
    });
});
