describe("lib/graph/User.js", function () {
    this.timeout("10s");

    describe("User", function () {
        var user;

        before(function () {
            user = client.me;
        });

        describe("#base", function () {
            it("should be specific to the users entity type", function () {
                expect(user.base).to.equal("users");
            });
        });

        describe("#get([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                user.get(done);
            });
        });

        describe("#submissions([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                user.submissions(done);
            });
        });

        describe("#content([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                user.content(done);
            });
        });

        describe("#feed([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                user.feed(done);
            });
        });

        describe("#network([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                user.network(done);
            });
        });

        describe("#role([entity], callback)", function () {
            var entity;

            before(function (done) {
                user.network(function (err, network) {
                    if (err) return done(err);
                    entity = network[0].id;
                    done();
                });
            });

            it("should pass a smoke test (no entity)", function (done) {
                user.role(done);
            });

            it("should pass a smoke test (with entity)", function (done) {
                user.role(entity, done);
            });
        });

        describe.skip("#contribute(params, callback)", function () {
            var content_id, destination;

            before(function (done) {
                user.content(function (err, list) {
                    if (err) return done(err);
                    content_id = list[0].id;
                    done();
                });
            });

            before(function (done) {
                user.network(function (err, list) {
                    if (err) return done(err);
                    destination = list[0].id;
                    done();
                });
            });

            it("should pass a smoke test", function (done) {
                user.contribute({
                    content_id: content_id,
                    to: destination
                }, done);
            });
        });
    });
});
