var api = require("noble.js"),
    request = require("superagent"),
    chai = require("chai"),
    Request = request.Request,
    expect = chai.expect,
    client, config;

before(function (done) {
    request("api.json", function (err, res) {
        if (err) return done(err);

        var data = res.body;
        config = data;
        client = api(config.api_url, config.client_id, config.client_secret);

        client.login(data.username, data.password, done);
    });
});

// used to ignore errors that we trigger intentionally (like aborting a request)
function ignore(callback) {
    return function () {
        callback();
    };
}

describe("Client", function () {
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

    describe("alerts", function () {
        var mailboxId;

        before(function () {
            mailboxId = config.user_id;
        });

        describe("#mailboxes()", function () {
            it("should return a Request object", function (done) {
                var req = client.mailboxes(ignore(done));
                expect(req).to.be.an.instanceOf(Request);
            });

            it("should return an array of results", function (done) {
                client.mailboxes(function (err, results) {
                    if (err) return done(err);

                    expect(results).to.be.an.instanceOf(Array);
                    done();
                });
            });
        });

        describe("#mailbox()", function (done) {
            it("should return a Request object", function (done) {
                var req = client.mailbox(mailboxId, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should sucessfully run (smoke test)", function (done) {
                client.mailbox(mailboxId, done);
            });

            it("should return an array as the resultset", function (done) {
                client.mailbox(mailboxId, function (err, data) {
                    if (err) return done(err);

                    expect(data).to.be.an.instanceOf(Array);
                    done();
                });
            });
        });

        describe("#mailboxUnread()", function () {
            var alertId;

            before(function (done) {
                client.mailbox(mailboxId, function (err, alerts) {
                    if (err) {
                        done(err);
                    } else if (!alerts || alerts.length < 1) {
                        done(new Error("no alerts found in test mailbox"));
                    } else {
                        alertId = [ alerts[0].id ];
                        done();
                    }
                });
            });

            beforeEach(function (done) {
                client.mailboxRead(mailboxId, alertId, done);
            });

            it("should return a Request object", function (done) {
                var req = client.mailboxUnread(mailboxId, alertId, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should successfully run (smoke test)", function (done) {
                client.mailboxUnread(mailboxId, alertId, done);
            });

            it("should change the read property of the alert", function (done) {
                client.mailboxUnread(mailboxId, alertId, function (err) {
                    if (err) return done(err);

                    client.mailbox(mailboxId, function (err, alerts) {
                        if (err) return done(err);

                        expect(alerts[0]).to.have.property("read", false);
                        done();
                    });
                });
            });
        });

        describe("#mailboxRead()", function () {
            var alertId;

            before(function (done) {
                client.mailbox(mailboxId, function (err, alerts) {
                    if (err) return done(err);

                    alertId = [ alerts[0].id ];
                    done();
                });
            });

            beforeEach(function (done) {
                client.mailboxUnread(mailboxId, alertId, done);
            });

            it("should return a Request object", function (done) {
                var req = client.mailboxRead(mailboxId, alertId, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should successfully run (smoke test)", function (done) {
                client.mailboxRead(mailboxId, alertId, done);
            });

            it("should change the read property of the alert", function (done) {
                client.mailboxRead(mailboxId, alertId, function (err) {
                    if (err) return done(err);

                    client.mailbox(mailboxId, function (err, alerts) {
                        if (err) return done(err);

                        expect(alerts[0]).to.have.property("read", true);
                        done();
                    });
                });
            });
        });

        describe.skip("#mailboxCreate()", function () {
            var id = "test-id-1",
                attr = {
                    firstname: "Test",
                    lastname: "User",
                    email: "test.user@example.com"
                },
                pref = {};

            it("should return a Request object", function (done) {
                var req = client.mailboxCreate(id, attr, pref, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it.skip("should not allow us to create an invalid mailbox", function (done) {
                client.mailboxCreate("test-invalid", {}, {}, function (err, data) {
                    expect(err).to.be.ok;
                    done();
                });
            });

            it("should allow the creation of a valid mailbox", function (done) {
                client.mailboxCreate(id, attr, pref, done);
            });
        });

        describe.skip("#mailboxAttributes()", function () {
            var id = "test-id-3",
                attr = {
                    firstname: "Test",
                    lastname: "User",
                    email: "test.user@example.com"
                },
                pref = {};

            before(function (done) {
                client.mailboxCreate(id, attr, pref, done);
            });

            it("should return a Request object", function (done) {
                var req = client.mailboxAttributes(id, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should sucessfully run (smoke test)", function (done) {
                client.mailboxAttributes(id, done);
            });

            it("should return an object as the resultset", function (done) {
                client.mailboxAttributes(id, function (err, data) {
                    if (err) return done(err);

                    expect(data).to.be.an("object");
                    done();
                });
            });
        });

        describe.skip("#mailboxPreferences()", function () {
            var id = "test-id-4",
                attr = {
                    firstname: "Test",
                    lastname: "User",
                    email: "test.user@example.com"
                },
                pref = {
                    email: true,
                    mobile: false,
                    sms: false
                };

            before(function (done) {
                client.mailboxCreate(id, attr, pref, done);
            });

            it("should return a Request object", function (done) {
                var req = client.mailboxPreferences(id, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should sucessfully run (smoke test)", function (done) {
                client.mailboxPreferences(id, done);
            });

            it("should return an object as the resultset", function (done) {
                client.mailboxPreferences(id, function (err, data) {
                    if (err) return done(err);

                    expect(data).to.be.an("object");
                    done();
                });
            });
        });

        describe.skip("#dispatch()", function () {
            var mailboxId = "test-id-5",
                alertMeta = {
                    type: "10",
                    template_attrs: {
                        subject: "Test Subject",
                        prefix: "test-prefix-",
                        suffix: "-test-suffix"
                    },
                    action_attrs: {
                        group_id: "some-uuid",
                        entity_id: "some-other-uuid"
                    }
                },
                alertOptions = {};

            before(function (done) {
                client.mailboxCreate(mailboxId, {
                    firstname: "Test",
                    lastname: "User",
                    email: "test.user@example.com"
                }, {}, done);
            });

            it("should return a Request object", function (done) {
                var req = client.dispatch([ mailboxId ], alertMeta, alertOptions, ignore(done));
                expect(req).to.be.an.instanceOf(Request);
                req.abort();
            });

            it("should sucessfully run (smoke test)", function (done) {
                client.dispatch([ mailboxId ], alertMeta, alertOptions, done);
            });
        });
    });

    describe("#user()", function () {
        it("should return a User object", function () {
            expect(client.user("test")).to.be.an.instanceOf(require("noble.js/lib/User"));
        });
    });

    describe("#submission()", function () {
        it("should return a Submission object", function () {
            expect(client.submission("test")).to.be.an.instanceOf(require("noble.js/lib/Submission"));
        });
    });
});
