var api = require("noble.js");
var map = require("map");

exports.createArray = function (size, generator) {
    return map(Array(size), generator);
};

exports.createClient = function () {
    return api("/", {
        client_id: "test",
        client_secret: "secret"
    });
};
