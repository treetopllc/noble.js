describe("lib/graph/mixin.js", function () {
    describe("Client", function () {
        each({
            "community":    "Community",
            "event":        "Event",
            "news":         "News",
            "opportunity":  "Opportunity",
            "organization": "Organization",
            "resource":     "Resource",
            "submission":   "Submission",
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
