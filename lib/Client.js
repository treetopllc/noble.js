var superagent = require("superagent"),
    extend = require("extend"),
    utils = require("./utils");

/**
 * HACK:
 * -----
 *
 * IE8 cannot handle "Content-Type: application/json"... or CORS...
 * so we have to proxy that browser through nginx to the API server,
 * and force "Content-Type: text/plain"
 *
 * So far, none of the API endpoints use text/plain explicitly, so
 * we can safely assume that this means we are actually sending JSON
 *
 * If that ever changes (adding cool content-negotiation or something)
 * we'll need to maybe wrap JSON.parse in a try/catch or use some
 * other workaround
 */
superagent.parse["text/plain"] = JSON.parse;

/**
 * Main object that performs requests and parses responses depending on context
 *
 * @param {String} href    The base URL for the API
 * @param {String} id      The API client id
 * @param {String} secret  The API client secret
 *
 * @constructor
 */
function Client(href, id, secret) {
    if (!(this instanceof Client)) {
        return new Client(href, id, secret);
    }

    this.client_id = id;
    this.client_secret = secret;
    this.root = href.replace(/\/$/g, ""); // strip trailing slash
}

/**
 * Creates a URL from an input path (using the base supplied to the constructor)
 *
 * @param {Array|String} path  If Array, items stitched together
 *
 * @returns {String}
 */
Client.prototype.url = function (path) {
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

    var req = superagent[method](this.url(uri));

    if (this.auth && this.auth.access_token) {
        req.query({
            access_token: this.auth.access_token
        });
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

    this.auth = null;

    return this.request("post", "oauth/token")
        .send({
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "password",
            username: username,
            password: password
        })
        .end(function (err, res) {
            if (err) return callback(err);
            else if (res.error) return callback(utils.error(res));

            client.auth = res.body;
            callback(null, res.body, res);
        });
};

extend(
    Client.prototype,
    require("./search"),
    require("./alerts"),
    require("./graph")
);

// single export
module.exports = Client;
