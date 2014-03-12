describe("lib/Client.js", function () {
    describe("Client", function () {
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
            client.auth = { access_token: "foo" };

            it("should add access_token to query string", function (done) {
                var req = client.request("/test");
                expect(req._query[0]).to.equal("access_token=foo");
                req.end(function (err, res) {
                    done();
                });
                req.abort();
            });

            it("should return a Request object", function (done) {
                var req = client.request("/test");
                expect(req).to.be.a(Request);
                req.end(function (err, res) {
                    done();
                });
                req.abort();
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
                        access_token: "abc123",
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
                        access_token: "abc123",
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
                    expect(body.details).to.equal("invalid user name or password");
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
