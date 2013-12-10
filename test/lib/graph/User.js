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
                server.respondWith("/users/abc", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.get(done);
                server.respond();
            });
        });

        describe("#submissions([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/submissions", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.submissions(done);
                server.respond();
            });
        });

        describe("#content([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/authored", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.content(done);
                server.respond();
            });
        });

        describe("#feed([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/feed", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.feed(done);
                server.respond();
            });
        });

        describe("#network([query], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/network", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.network(done);
                server.respond();
            });
        });

        describe("#role([entity], callback)", function () {
            before(function () {
                server.respondWith("/users/abc/role", [ 200, null, "OK" ]);
                server.respondWith("/users/abc/role?for=def", [ 200, null, "OK" ]);
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
                server.respondWith("POST", "/submissions", [ 200, null, "OK" ]);
            });

            it("should pass a smoke test", function (done) {
                user.contribute({
                    content_id: chance.guid(),
                    to: [ chance.guid() ]
                }, done);

                server.respond();
            });
        });
    });
});
