var chance = require("chance");
var pkg = require("../package.json");

exports.index = function (req, res) {
    res.json({
        description: "Noblehour API",
        version: pkg.version,
        _links: [
            "/oauth/token",
            "/oauth/revoke",
            "/search",
            "/vertices/{id}",
            "/communities/{id}",
            "/events/{id}",
            "/news/{id}",
            "/organizations/{id}",
            "/opportunities/{id}",
            "/users/{id}",
            "/resources/{id}",
            "/submissions/{id}"
        ]
    });
};

exports.auth = require("./auth");
exports.search = require("./search");
exports.vertex = require("./vertex");
exports.user = require("./user");
exports.submission = require("./submission");
