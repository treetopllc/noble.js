var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Submission.js", function () {
    describe("Submission", function () {
        var submission = client.submission("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/submissions/abc", simpleResponse);

                submission.get(done);
            });
        });

        describe("#unsubmit(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/submissions/abc", simpleResponse);

                submission.unsubmit(done);
            });
        });

        describe("#history(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/submissions/abc/history", simpleResponse);

                submission.history(done);
            });
        });
    });
});
