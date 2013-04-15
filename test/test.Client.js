var api = require("api");

describe("Client", function () {
    var client = api("http://localhost:7000");

    describe("#login()", function () {
        it("should allow you to log in via username/password", function (done) {
            client.login("qa+test.user.5@noblehour.com", "123456", function () {
                console.log(arguments);
                done();
            });
        });
    });
});
