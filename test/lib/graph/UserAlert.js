describe("lib/graph/UserAlert.js", function () {
    describe("UserAlert", function () {
        var user = client.user("abc");
        var alert = user.alert("123");

        describe("#uri([path])", function () {
            it("should return the correct uri", function () {
                expect(alert.uri())
                    .to.equal("users/abc/alerts/123");
            });

            it("should append additional path information", function () {
                expect(alert.uri("status"))
                    .to.equal("users/abc/alerts/123/status");
            });

            it("should handle an array of path information", function () {
                expect(alert.uri([ "status", 1 ]))
                    .to.equal("users/abc/alerts/123/status/1");
            });
        });

        describe("#get([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/users/abc/alerts/123", simpleResponse);

                alert.get(done);
            });
        });

        describe("#markRead(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/users/abc/alerts/123/status", simpleResponse);

                alert.markRead(done);
            });
        });

        describe("#markUnread(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/users/abc/alerts/123/status", simpleResponse);

                alert.markUnread(done);
            });
        });
    });
});
