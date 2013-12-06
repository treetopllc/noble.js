describe("lib/Client.js", function () {
    describe("Client", function () {
        describe("#url([path])", function () {
        });

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
                client.login("testuser", "123456", function (err, auth) {
                    if (err) return done(err);

                    expect(auth).to.be.ok();
                    expect(auth).to.equal(client.auth);
                    done();
                });
            });

            it("should fail for bad username / password combo", function (done) {
                client.login("not", "real", function (err) {
                    expect(err.message).to.be.equal("invalid user name or password");
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
