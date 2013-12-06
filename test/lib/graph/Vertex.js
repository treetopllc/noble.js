describe("lib/graph/Vertex.js", function () {
    describe("Vertex", function () {
        var vertex;

        before(function () {
            vertex = client.me.toVertex();
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
            it("should pass a smoke test", function (done) {
                vertex.get(done);
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
            });
        });

        describe("#related(type, query, callback)", function () {
            var user;

            before(function () {
                user = client.user(vertex.id);
            });

            it("should pass a smoke test", function (done) {
                user.related("network", done);
            });
        });
    });
});
