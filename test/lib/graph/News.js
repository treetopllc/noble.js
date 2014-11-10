var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/News.js", function () {
    describe("News", function () {
        var news = client.news("abc")

        describe("#get(callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/news/abc", simpleResponse);

                news.get(done);
            });
        });
    });
});
