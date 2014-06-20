var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Project.js", function () {
    describe("Project", function () {
        var project = client.project("abc");

        describe("#search([query], callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/projects", simpleResponse);
                project.search(done);
            });

            it("should include query params", function (done) {
                server.respondWith("/projects?limit=10", simpleResponse);
                project.search({ limit: 10 }, done);
            });
        });
    });
});
