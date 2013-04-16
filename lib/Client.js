var superagent = require("superagent");

function Client(href, id, secret) {
    if (!(this instanceof Client)) {
        return new Client(href, id, secret);
    }

    this.client_id = id;
    this.client_secret = secret;
    this.root = href;
}

function error(res) {
    res.error.message = res.body.error_description;
    return res.error;
}

Client.prototype.url = function (path) {
    return this.root + "/" + (path || "");
};

Client.prototype.request = function (method, uri) {
    if (!uri) {
        uri = method;
        method = "get";
    }

    var req = superagent[method](this.url(uri));

    if (this.auth && this.auth.access_token) {
        req.query({
            access_token: this.auth.access_token
        });
    }

    return req;
};

Client.prototype.index = function (callback) {
    return this.request().end(function (err, res) {
        if (err) {
            callback(err);
        } else if (res.error) {
            callback(error(res));
        } else {
            callback(null, res.body);
        }
    });
};

Client.prototype.login = function (username, password, callback) {
    var client = this;

    this.auth = null;

    this.request("post", "oauth/token").send({
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: "password",
        username: username,
        password: password
    }).end(function (err, res) {
        if (err) return callback(err);
        else if (res.error) return callback(error(res));

        client.auth = res.body;
        callback(null, res.body);
    });
};

module.exports = Client;
