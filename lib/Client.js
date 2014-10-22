// dependencies
var superagent = require("superagent");
var extend = require("extend");
var utils = require("./utils");


/**
 * HACK:
 * -----
 *
 * IE8 cannot handle "Content-Type: application/json"... or CORS... so we have
 * to proxy that browser through nginx to the API server, and force
 * "Content-Type: text/plain"
 *
 * Some API errors and endpoints use text/plain as the response content-type,
 * breaking when used w/ JSON.parse(). So, we are wrapping in a try/catch to
 * allow for actual plaintext.
 */
superagent.parse["text/plain"] = function (body) {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
};


/**
 * Main object that performs requests and parses responses depending
 * on context.
 *
 * Available params:
 *  - auth {String}           Predefined auth details
 *  - access_token {String}   Predefined access token for API
 *  - client_id {String}      Client ID (if token not provided)
 *  - client_secret {String}  Client Secret (if token not provided)
 *
 * @constructor
 * @param {String} url
 * @param {Object} params
 */
function Client(url, params) {
    if (!(this instanceof Client)) {
        return new Client(url, params);
    }

    if (!url) throw new Error("API URL required");
    this.root = url.replace(/\/$/g, ""); // strip trailing slash

    if (params) {
        if (params.client_id || params.client_secret) {
            this.client_id     = params.client_id;
            this.client_secret = params.client_secret;
        }

        if (params.auth) {
            this.auth = params.auth;

            if (this.auth.user_id) {
                this.me = this.user(this.auth.user_id);
            }
        } else if (params.access_token) {
            this.auth = { access_token: params.access_token };
        }
    }
}

/**
 * Creates a URL from an input path (using the base supplied to the constructor)
 *
 * @param {Array|String} path  If Array, items stitched together
 *
 * @returns {String}
 */
Client.prototype.uri = function (path) {
    var url = this.root + "/";
    if (path) {
        url += typeof path === "string" ? path : path.join("/");
    }
    return url;
};

/**
 * Wraps superagent to perform a request against the API
 * Returns the Super Agent object, rather than initiating the request
 * immediately. This allows other methods to modify the request rather
 * than shoe-horning everything through here.
 *
 * @param {String} [method]     HTTP verb to use (default: GET)
 * @param {String|Array} [uri]  URI pieces (passed as array to url)
 *
 * @returns {Request}
 */
Client.prototype.request = function (method, uri) {
    if (!uri) {
        uri = method;
        method = "get";
    }

    var url = this.uri(uri);

    var req = superagent[method](url);

    if (this.auth && this.auth.access_token) {
        var token = this.auth.access_token;
        req.query({ access_token: token });
    }

    return req;
};

/**
 * Request the API root immediately
 *
 * @param {Function} callback
 */
Client.prototype.index = function (callback) {
    return this.request().end(utils.easy(callback));
};

/**
 * Request an access_token from the API
 * (resets any previously defined auth)
 *
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 *
 * @returns {Request}
 */
Client.prototype.login = function (username, password, callback) {
    var client = this;

    delete this.auth;
    delete this.me;

    return this.request("post", "oauth/token")
        .send({
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "password",
            username: username,
            password: password
        })
        .end(utils.easy(function (err, body, res) {
            if (err) {
                callback(err, body, res);
            } else {
                client.auth = body;
                client.me = client.user(body.user_id);

                callback(null, body, res);
            }
        }));
};

/**
 * Refresh the current token (allows session to continue)
 *
 * @param {Function} callback
 *
 * @returns {Request}
 */
Client.prototype.refresh = function (callback) {
    var client = this;

    if (!this.auth) throw new Error("Client is not logged in, cannot refresh");
    if (!this.auth.refresh_token) throw new Error("Missing refresh_token");

    return this.request("post", "oauth/token")
        .send({
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "refresh_token",
            refresh_token: this.auth.refresh_token
        })
        .end(utils.easy(function (err, body, res) {
            if (err) {
                callback(err, body, res);
            } else {
                client.auth = body;
                client.me = client.user(body.user_id);

                callback(null, body, res);
            }
        }));
};


// each of these "sub-modules" extends the core Client prototype
extend(
    Client.prototype,
    require("./search"),
    require("./participation"),
    require("./sso"),
    require("./graph/mixin")
);


// single export
module.exports = Client;
