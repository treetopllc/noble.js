var createClient = require("../utils").createClient;
var simpleResponse = require("../mock").simpleResponse;

describe("lib/archive.js", function () {
    var client = createClient();

    describe("Client#archive()", function () {
         it("should pass a smoke test (with id)", function (done) {
            server.respondWith("/vertices/123456", simpleResponse);

            client.archive("123456", done);
        });
    });
});


describe("lib/archive.js", function () {
    var client = createClient();

    describe("Client#unarchive()", function () {
         it("should pass a smoke test (with id)", function (done) {
            server.respondWith("/vertices/123456", simpleResponse);

            client.unarchive("123456", done);
        });
    });
});


describe("lib/archive.js", function () {
    var client = createClient();

    describe("Client#bulkArchive()", function () {
         it("should pass a smoke test", function (done) {
            server.respondWith("/vertices/archive", simpleResponse);

            client.bulkArchive(done);
        });
    });
});

describe("lib/archive.js", function () {
    var client = createClient();

    describe("Client#bulkUnArchive()", function () {
         it("should pass a smoke test", function (done) {
            server.respondWith("/vertices/unarchive/", simpleResponse);

            client.bulkUnArchive(done);
        });
    });
});
