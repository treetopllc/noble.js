var simpleResponse = require("../../mock").simpleResponse;
var client = require("../../utils").createClient();

describe("lib/graph/Alert.js", function () {
    describe("Alert", function () {
        var alert = client.alert("123");

        describe("#markRead(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/alerts/123/status", simpleResponse);

                alert.markRead(done);
            });
        });

        describe("#markUnread(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("POST", "/alerts/123/status", simpleResponse);

                alert.markUnread(done);
            });
        });
    });
});
