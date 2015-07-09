var each = require("each");
var client = require("../../utils").createClient();
var mock = require("../../mock");
var simpleResponse = mock.simpleResponse;
var defaultHeaders = mock.defaultHeaders;

describe("lib/graph/Vertex.js", function () {
    describe("Vertex", function () {
        var vertex = client.vertex("abc");

        describe("#base", function () {
            it("should be vertices", function () {
                expect(vertex.base).to.equal("vertices");
            });
        });

        describe("#baseUri()", function () {
            it("should return only the base uri", function () {
                expect(vertex.baseUri())
                    .to.equal("vertices");
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

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/vertices/abc", simpleResponse);
                vertex.get(done);
            });

            it("should /parse date fields as Date objects", function (done) {
                server.respondWith("/vertices/abc", [
                    200,
                    defaultHeaders,
                    JSON.stringify({
                        id: "abc",
                        created: chance.isodate(),
                        modified: chance.isodate()
                    })
                ]);

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

        describe("#head(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("HEAD", "/vertices/abc", simpleResponse);
                vertex.head(done);
            });
        });

        describe("#create(data, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/vertices", [
                    200,
                    defaultHeaders,
                    JSON.stringify({ id: "abc" })
                ]);

                client.vertex().create({ hello: "world" }, done);
            });

            it("should send the passed data in the request", function (done) {
                server.respondWith("POST", "/vertices", [
                    200,
                    defaultHeaders,
                    JSON.stringify({ id: "abc" })
                ]);

                var vertex = client.vertex();
                var data = { hello: "world" };
                var req = vertex.create(data, done);

                expect(req._data).to.eql(data);
            });

            it("should set the id of the vertex after success", function (done) {
                server.respondWith("POST", "/vertices", [
                    200,
                    defaultHeaders,
                    JSON.stringify({ id: "abc" })
                ]);

                var vertex = client.vertex();

                expect(vertex.id).to.not.be.ok();
                vertex.create({ hello: "world" }, function (err, data) {
                    if (err) return done(err);

                    expect(vertex.id).to.be.ok();
                    expect(data.id).to.equal(vertex.id);

                    done();
                });
            });
        });

        describe("#modify(data, callback)", function () {
            it("should pass a smoke test (single)", function (done) {
                server.respondWith("PATCH", "/vertices/abc", simpleResponse);

                client.vertex("abc").modify({}, done);
            });

            it("should pass a smoke test (bulk)", function (done) {
                server.respondWith("PATCH", "/vertices", simpleResponse);

                client.vertex(null).modify([], done);
            });
        });

        describe("#related(type, query, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/vertices/abc/test", simpleResponse);

                vertex.related("test", done);
            });

            it("should send additional querystring params", function (done) {
                server.respondWith("/vertices/abc/test?foo=bar", simpleResponse);

                vertex.related("test", { foo: "bar" }, done);
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

        describe("#belongsTo(owner)", function () {
            var owner = client.vertex("def");
            var vertex = client.vertex("abc").belongsTo(owner);

            it("should set the owner property of the vertex", function () {
                expect(vertex.owner).to.equal(owner);
            });

            it("should change the generated URL", function () {
                expect(vertex.uri()).to.equal("vertices/def/vertices/abc");
            });
        });
    });
});