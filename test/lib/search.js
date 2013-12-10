describe("lib/search.js", function () {
    describe("Client#search()", function () {
        var row = {
            id:             chance.guid(),
            name:           chance.name(),
            description:    chance.paragraph(),
            slug:           chance.slug(),
            vertex_type_id: chance.type_id(),
            deleted:        chance.deleted(),
            created:        chance.isodate(),
            modified:       chance.isodate()
        };

        before(function () {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ row ]
                })
            ]);
        });

        it("should return a Request object", function () {
            var callback = sinon.spy();
            expect(client.search(callback)).to.be.a(Request);
            server.respond();
            sinon.assert.calledOnce(callback);
        });

        it("should append all params to the querystring", function () {
            var callback = sinon.spy();
            var params = { terms: "test", lat: 100, lon: 100 };
            var req = client.search(params, callback);
            server.respond();
            expect(req._query).to.contain("terms=test&lat=100&lon=100");
            sinon.assert.calledOnce(callback);
        });

        it("should return an array of results", function () {
            var callback = sinon.spy();
            client.search(callback);
            server.respond();
            sinon.assert.calledWith(callback, null, sinon.match.has("results", sinon.match.array));
        });

        it("should parse date fields as Date objects", function () {
            var callback = sinon.spy();
            client.search(callback);
            server.respond();
            sinon.assert.calledWith(callback, null, sinon.match(function (val) {
                return sinon.match.has("created", sinon.match.date);
            }));
        });
    });
});
