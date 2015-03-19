var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Group.js", function () {
    describe("Groups", function () {
        var group = client.group("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc", simpleResponse);

                group.get(done);
            });
        });

        describe("#participation([key], [entity], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/groups/abc/participation", simpleResponse);

                group.participation(done);
            });

            it("should pass a smoke test (with key)", function (done) {
                server.respondWith("/groups/abc/participation/impact", simpleResponse);

                group.participation("impact", done);
            });
        });
    });
});
