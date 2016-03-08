var api = require("noble.js");
var expect = require("expect.js");
var request = require("superagent");
var createClient = require("../utils").createClient;
var mock = require("../mock");
var Request = request.Request;
var defaultHeaders = mock.defaultHeaders;
var simpleResponse = mock.simpleResponse;


describe("lib/Client.js", function () {
    var client = createClient();

    describe("Client(url, [params])", function () {
        it("should set the root property", function () {
            var client = api("http://example.com");
            expect(client.root).to.equal("http://example.com");
        });

        it("should set optional client id/secret params", function () {
            var client = api("http://example.com", {
                client_id: "foo",
                client_secret: "bar"
            });

            expect(client.client_id).to.equal("foo");
            expect(client.client_secret).to.equal("bar");
        });

        it("should set optional auth param", function () {
            var client = api("http://example.com", {
                auth: { foo: "bar" }
            });

            expect(client.auth.foo).to.equal("bar");
        });

        it("should create a me property reflecting the user_id", function () {
            var client = api("http://example.com", {
                auth: {
                    user_id: "foo"
                }
            });

            expect(client.me).to.be.a(client.User);
            expect(client.me.id).to.equal("foo");
        });

        describe("#uri([path])", function () {
            var client = createClient();
            client.root = "http://example.com";

            it("should return a formatted url", function () {
                expect(client.uri()).to.equal("http://example.com/");
            });

            it("should append the optional path param", function () {
                expect(client.uri("foo")).to.equal("http://example.com/foo");
            });
        });

        describe("#request()", function () {
            var client = createClient();

            it("should return a Request object", function () {
                var req = client.request("/test");
                expect(req).to.be.a(Request);
            });
        });

        describe("#index()", function () {
            it("should return a Request object", function (done) {
                server.respondWith("GET", "/", simpleResponse);

                expect(client.index(done)).to.be.a(Request);
            });

            it("should be the NH API root", function (done) {
                server.respondWith("GET", "/", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        description: "Noblehour API",
                        version: "mock"
                    })
                ]);

                client.index(function (err, results) {
                    if (err) return done(err);
                    expect(results).to.be.ok();
                    done();
                });
            });
        });

        describe("#login()", function () {
            var client = createClient();

            it("should return a Request object", function (done) {
                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "def456",
                        expires_in: 1000
                    })
                ]);

                var req = client.login(null, null, done);
                expect(req).to.be.a(Request);
            });

            it("should attach the returned auth data to the client object", function (done) {
                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "def456",
                        expires_in: 1000
                    })
                ]);

                client.login("testuser", "123456", function (err, auth) {
                    if (err) return done(err);
                    expect(auth).to.equal(client.auth);
                    done();
                });
            });

            it("should fail for bad username / password combo", function (done) {
                server.respondWith("POST", "/oauth/token", [
                    400,
                    defaultHeaders,
                    JSON.stringify({
                        error: "invalid_request",
                        details: "invalid user name or password"
                    })
                ]);

                client.login("not", "real", function (err, body, res) {
                    expect(err.body).to.equal(body);
                    done();
                });
            });

            it("should create a me property reflecting the user_id", function (done) {
                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "def456",
                        expires_in: 1000
                    })
                ]);

                client.login(null, null, function (err, body, res) {
                    if (err) return done(err);
                    expect(client.me).to.be.a(client.User);
                    expect(client.me.id).to.equal("testuser-uuid");
                    done();
                });
            });
        });

        describe("#refresh()", function () {
            it("should return a Request object", function (done) {
                var client = api("/", {
                    auth: {
                        refresh_token: "b"
                    }
                });

                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "d",
                        expires_in: 1000
                    })
                ]);

                var req = client.refresh(done);
                expect(req).to.be.a(Request);
            });

            it("should attach the returned auth data to the client object", function (done) {
                var client = api("/", {
                    auth: {
                        refresh_token: "b"
                    }
                });

                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "d",
                        expires_in: 1000
                    })
                ]);

                client.refresh(function (err, auth) {
                    if (err) return done(err);
                    expect(auth).to.equal(client.auth);
                    done();
                });
            });

            it("should create a me property reflecting the user_id", function (done) {
                var client = api("/", {
                    auth: {
                        refresh_token: "b"
                    }
                });

                server.respondWith("POST", "/oauth/token", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        user_id: "testuser-uuid",
                        refresh_token: "def456",
                        expires_in: 1000
                    })
                ]);

                client.refresh(function (err, body, res) {
                    if (err) return done(err);
                    expect(client.me).to.be.a(client.User);
                    expect(client.me.id).to.equal("testuser-uuid");
                    done();
                });
            });
        });
    });

    describe("response parsing", function () {
        it("should treat text/plain as JSON", function () {
            expect(request.parse["text/plain"]("{}")).to.eql({});
        });

        it("should return the plain string if JSON.parse fails", function () {
            expect(request.parse["text/plain"]("foo")).to.equal("foo");
        });
    });
});
