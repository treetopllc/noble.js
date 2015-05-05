var each = require("each");
var client = require("../../utils").createClient();

describe("lib/graph/mixin.js", function () {
    describe("Client", function () {
        each({
            "affiliation":  "Affiliation",
            "asset":        "Asset",
            "community":    "Community",
            "customer":     "Customer",
            "event":        "Event",
            "group":        "Group",
            "news":         "News",
            "opportunity":  "Opportunity",
            "organization": "Organization",
            "submission":   "Submission",
            "url":          "Url",
            "user":         "User",
            "vertex":       "Vertex"
        }, function (method, name) {
            describe("#" + name + "(client, id)", function () {
                it("should be a constructor function", function () {
                    expect(client[name]).to.be.a(Function);
                });

                it("should inherit from Vertex", function () {
                    var inst = new (client[name])(client, "foo");
                    expect(inst).to.be.a(client.Vertex);
                });
            });

            describe("#" + method + "(id)", function () {
                it("should be a factory function", function () {
                    expect(client[method]).to.be.a(Function);
                });
            });
        });
    });
});
