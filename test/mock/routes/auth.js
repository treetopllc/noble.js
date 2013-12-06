var dict = require("dict");
var generate = require("../lib/generator");
var utils = require("../utils");

var users = dict({
    testuser: {
        id: "a",
        username: "testuser",
        password: "123456",
    }
});

exports.login = function (req, res, next) {
    var body = req.body;

    if (body.client_id === "test" && body.client_secret === "AbCfk3F1234##%!") {
        if (req.body.grant_type === "password") {
            passwordGrant(req, res, next);
        } else {
            next(utils.error("unsupported_grant_type", "unsupported grant type", 400));
        }
    }
};

exports.logout = function (req, res) {
    // TODO
};

function passwordGrant(req, res, next) {
    var body = req.body;
    var user = users.get(body.username || "");

    if (user && user.password === body.password) {
        res.json(generate.token({
            user_id: user.id
        }));
    } else {
        next(utils.error("invalid_request", "invalid user name or password", 400));
    }
}
