describe("lib/graph/UserAlert.js", function () {
    describe("UserAlert", function () {
        var user, alert;

        before(function () {
            user = client.user("abc");
            alert = user.alert("123");
        });

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
            before(function () {
                server.respondWith("/users/abc/alerts/123", simpleResponse);
            });

            it("should pass a smoke test", function (done) {
                alert.get(done);
                server.respond();
            });
        });

        describe("#markRead(callback)", function () {
            before(function () {
                server.respondWith("POST", "/users/abc/alerts/123/status", function (req) {
                    var body = JSON.parse(req.requestBody);
                    if (body.read === true) {
                        req.respond();
                    }
                });
            });

            it("should pass a smoke test", function (done) {
                alert.markRead(done);
                server.respond();
            });
        });

        describe("#markUnread(callback)", function () {
            before(function () {
                server.respondWith("POST", "/users/abc/alerts/123/status", function (req) {
                    var body = JSON.parse(req.requestBody);
                    if (body.read === false) {
                        req.respond();
                    }
                });
            });

            it("should pass a smoke test", function (done) {
                alert.markUnread(done);
                server.respond();
            });
        });
    });
});
