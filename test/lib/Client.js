describe("lib/Client.js", function () {
    describe("Client", function () {
        describe("#uri([path])", function () {
            var oldRoot = client.root;

            before(function () {
                client.root = "http://example.com";
            });

            after(function () {
                client.root = oldRoot;
            });

            it("should return a formatted url", function () {
                expect(client.uri()).to.equal("http://example.com/");
            });

            it("should append the optional path param", function () {
                expect(client.uri("foo")).to.equal("http://example.com/foo");
            });
        });

        describe("#request()", function () {
            var client;

            before(function () {
                client = createClient();
            });

            it("should add access_token to query string", function () {
                client.auth = { access_token: "foo" };
                expect(client.request()._query[0]).to.equal("access_token=foo");
                server.respond();
            });

            it("should return a Request object", function () {
                expect(client.request()).to.be.a(Request);
                server.respond();
            });
        });

        describe("#index()", function () {
            before(function () {
                server.respondWith("GET", "/", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        description: "Noblehour API",
                        version: "mock"
                    })
                ]);
            });

            it("should return a Request object", function () {
                var callback = sinon.spy();
                expect(client.index(callback)).to.be.a(Request);
                server.respond();
                sinon.assert.calledOnce(callback);
            });

            it("should be the NH API root", function () {
                var callback = sinon.spy();
                client.index(callback);
                server.respond();
                sinon.assert.calledWith(callback, null, sinon.match.truthy);
            });
        });

        describe("#login()", function () {
            var client; // meant to override the one from the upper scope

            before(function () {
                client = createClient();
            });

            it("should return a Request object", function () {
                var callback = sinon.spy();
                expect(client.login(null, null, callback)).to.be.a(Request);
                server.respond();
                sinon.assert.calledOnce(callback);
            });

            it("should attach the returned auth data to the client object", function () {
                var callback = sinon.spy();
                client.login("testuser", "123456", callback);
                server.respond();
                sinon.assert.calledWith(callback, null, client.auth);
            });

            it("should fail for bad username / password combo", function () {
                var callback = sinon.spy();
                client.login("not", "real", callback);
                server.respond();
                sinon.assert.calledWith(callback, sinon.match({
                    message: "invalid user name or password"
                }));
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
