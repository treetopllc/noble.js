describe("lib/graph/User.js", function () {
    describe("User", function () {
        var user;

        before(function () {
            user = client.user("abc");
        });

        describe("#base", function () {
            it("should be specific to the users entity type", function () {
                expect(user.base).to.equal("users");
            });
        });

        describe("#get([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.get(done);
                server.respond();
            });
        });

        describe("#submissions([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/submissions", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.submissions(done);
                server.respond();
            });
        });

        describe("#authored([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/authored", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.authored(done);
                server.respond();
            });
        });

        describe("#feed([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/feed", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.feed(done);
                server.respond();
            });
        });

        describe("#network([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/network", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.network(done);
                server.respond();
            });
        });

        describe("#role([entity], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/role", simpleResponse);
                server.respondWith("/users/abc/role?for=def", simpleResponse);
            });

            it("should pass a smoke test (no entity)", function (done) {
                user.role(done);
                server.respond();
            });

            it("should pass a smoke test (with entity)", function (done) {
                user.role("def", done);
                server.respond();
            });
        });

        describe("#contribute(params, callback)", function () {
            before(function () {
                server.respondWith("POST", "/submissions", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.contribute({
                    content_id: chance.guid(),
                    to: [ chance.guid() ]
                }, done);

                server.respond();
            });
        });

        describe("#alerts([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/alerts", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.alerts(done);
                server.respond();
            });
        });

        describe("#alertsStats(callback)", function () {
            before(function () {
                server.respondWith("/users/abc/alerts/stats", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                user.alertsStats(done);
                server.respond();
            });
        });
    });
});
