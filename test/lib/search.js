describe("lib/search.js", function () {
    describe("Client#search()", function () {
        function generate() {
            return {
                id:             chance.guid(),
                name:           chance.name(),
                description:    chance.paragraph(),
                slug:           chance.slug(),
                vertex_type_id: chance.type_id(),
                deleted:        chance.deleted(),
                created:        chance.isodate(),
                modified:       chance.isodate()
            };
        }

        it("should return a Request object", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            var req = client.search(done);
            expect(req).to.be.a(Request);
        });

        it("should append all params to the querystring", function (done) {
            server.respondWith("/search?terms=test", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            var params = { terms: "test" };
            var req = client.search(params, done);
            expect(req._query).to.contain("terms=test");
        });

        it("should return an array of results", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            client.search(function (err, results) {
                if (err) return done(err);
                expect(results).to.be.an(Array);
                done();
            });
        });

        it("should parse date fields as Date objects", function (done) {
            server.respondWith("/search", [
                200,
                defaultHeaders,
                JSON.stringify({
                    results: [ generate() ]
                })
            ]);

            client.search(function (err, results) {
                if (err) return done(err);
                var row = results[0];
                expect(row.created).to.be.a(Date);
                expect(row.modified).to.be.a(Date);
                done();
            });
        });
    });
});
