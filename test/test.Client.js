var api = require("api"),
    request = require("visionmedia-superagent"),
    expect = require("dominicbarnes-expect.js");

describe("Client", function () {
    var client, config;

    before(function (done) {
        request("api.json", function (err, res) {
            if (err) return done(err);

            var data = res.body;
            client = api(data.api_url, data.client_id, data.client_secret);
            config = data;
            done();
        });
    });

    describe("#request()", function () {
        before(function () {
            client.auth = {
                access_token: "foo",
                username: "bar"
            };
        });

        after(function () {
            client.auth = null;
        });

        it("should add access_token to query string", function (done) {
            expect(client.request()._query[0]).to.equal("access_token=foo");
            done();
        });
    });

    describe("#index()", function () {
        it("should be a NH API root", function (done) {
            client.index(function (err, data) {
                if (err) return done(err);

                expect(data).to.have.property("description", "Noblehour API");
                done();
            });
        });
    });

    describe("#login()", function () {
        it("should attach the returned auth data to the client object", function (done) {
            client.login(config.username, config.password, function (err, auth) {
                if (err) return done(err);

                expect(auth).to.eql(client.auth);
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
});
