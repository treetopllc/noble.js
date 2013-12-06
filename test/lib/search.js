describe("lib/search.js", function () {
    describe("Client#search()", function () {
        it("should return a Request object", function (done) {
            var req = client.search({}, ignore(done));
            expect(req).to.be.a(Request);
        });

        it("should not automatically add return=geoJSON to the querystring", function (done) {
            var req = client.search({}, ignore(done));
            expect(req._query).to.not.contain("return=geoJSON");
        });

        it("should append all params to the querystring", function (done) {
            var params = { terms: "test", lat: 100, lon: 100 },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("terms=test&lat=100&lon=100");
        });

        it("should convert an array of types to numbers", function (done) {
            var params = { types: [ "opportunities", "events", "organizations" ] },
                req = client.search(params, ignore(done));

            expect(req._query).to.contain("types=" + encodeURIComponent("3,5,2"));
        });

        it("should return an array of results", function (done) {
            client.search({}, function (err, data) {
                if (err) return done(err);

                expect(data.results).to.be.ok();
                done();
            });
        });

        it("should parse date fields as Date objects", function (done) {
            client.search({
                terms: "school",
                limit: 50
            }, function (err, data) {
                if (err) return done(err);

                each(data.results, function (row) {
                    each([
                        "created", "modified",
                        "start_ts", "end_ts"
                    ], function (prop) {
                        if (row[prop]) {
                            expect(row[prop]).to.be.a(Date);
                            expect(isNaN(row[prop].valueOf())).to.be(false);
                        }
                    });
                });

                done();
            });
        });
    });
});
