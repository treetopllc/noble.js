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

        describe("#uri([path])", function () {
            it("should return the correct uri", function () {
                expect(vertex.uri())
                    .to.equal("vertices/abc");
            });

            it("should append additional path information", function () {
                expect(vertex.uri("foo"))
                    .to.equal("vertices/abc/foo");
            });

            it("should handle an array of path information", function () {
                expect(vertex.uri([ "foo", "bar" ]))
                    .to.equal("vertices/abc/foo/bar");
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
                server.respondWith("/vertices/abc/test", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                vertex.related("test", done);
                server.respond();
            });
        });

        describe("#toVertex()", function () {
            it("should return a fresh Vertex object (not a sub-class)", function () {
                var user = client.user("abc");

                expect(user.toVertex())
                    .to.be.a(client.Vertex)
                    .and.not.be.a(client.User);
            });
        });
    });
});
