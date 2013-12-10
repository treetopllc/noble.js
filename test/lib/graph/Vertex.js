describe("lib/graph/Vertex.js", function () {
    describe("Vertex", function () {
        var vertex;

        before(function () {
            vertex = client.vertex("abc");
        });

        describe("#base", function () {
            it("should be vertices", function () {
                expect(vertex.base).to.equal("vertices");
            });
        });

        describe("#url([path])", function () {
            it("should return a formatted url", function () {
                expect(vertex.url()).to.equal("vertices/" + vertex.id);
            });

            it("should append the optional path param", function () {
                expect(vertex.url("foo")).to.equal("vertices/" + vertex.id + "/foo");
            });
        });

        describe("#get()", function () {
            before(function () {
                server.respondWith("/vertices/abc", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        id: "abc",
                        created: chance.isodate(),
                        modified: chance.isodate()
                    })
                ]);
            });

            it("should pass a smoke test", function (done) {
                vertex.get(done);
                server.respond();
            });

            it("should parse date fields as Date objects", function (done) {
                vertex.get(function (err, data) {
                    if (err) return done(err);

                    each([ "created", "modified" ], function (prop) {
                        if (typeof data[prop] !== "undefined") {
                            expect(data[prop]).to.be.a(Date);
                            expect(isNaN(data[prop].valueOf())).to.be(false);
                        }
                    });

                    done();
                });

                server.respond();
            });
        });

        describe("#related(type, query, callback)", function () {
            before(function () {
                server.respondWith("/vertices/abc/test", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                vertex.related("test", done);
                server.respond();
            });
        });
    });
});
