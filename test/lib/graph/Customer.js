var client = require("../../utils").createClient();
var simpleResponse = require("../../mock").simpleResponse;

describe("lib/graph/Customer.js", function () {
    describe("Customers", function () {
        var customer = client.customer("abc");

        describe("#get(params, callback)", function () {
            it("should pass a smoke test", function (done) {
                server.respondWith("/customers/abc", simpleResponse);

                customer.get(done);
            });
        });
    });
});
