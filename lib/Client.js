var superagent = require("superagent");

function Client(href) {
    if (!(this instanceof Client)) {
        return new Client(href);
    }

    this.root = href;
}

Client.prototype.url = function (path) {
    return this.root + "/" + (path || "");
};

Client.prototype.request = function (method, uri) {
    if (!uri) {
        uri = method;
        method = "get";
    }

    var req = superagent[method](this.url(uri)).withCredentials();

    if (this.auth && this.auth.access_token) {
        req.query({
            access_token: this.auth.access_token
        });
    }

    return req;
};

Client.prototype.setAuth = function (data) {
    this.auth = data;
};

Client.prototype.login = function (username, password, callback) {
    var client = this;

    this.auth = null;

    this.request("oauth/token").send({
        client_id: "web",
        client_secret: "124ou125089flkjewtWET31t",
        grant_type: "password",
        username: username,
        password: password
    }).end(function (err, res) {
        console.log(arguments);
        callback();
    });
};

module.exports = Client;
