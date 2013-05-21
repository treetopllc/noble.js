var extend = require("extend"),
    superagent = require("superagent");

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
    this.root = href;
}

// helper function for extracting errors from responses
function error(res) {
    res.error.message = res.body.error_description;
    return res.error;
}

function easy(callback) {
    return function (err, res) {
       if (err) return callback(err);
       else if (res.error) return callback(error(res));

       callback(null, res.body, res);
    };
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
    return this.request().end(easy(callback));
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
            else if (res.error) return callback(error(res));

            client.auth = res.body;
            callback(null, res.body, res);
        });
};

/**
 * Perform a general entity search via the API. Most params are just piped
 * right on through to the querystring.
 *
 * Geospatial searches are triggered whenever 'zip' or 'latlng' are included
 * in the params. ('range' will be ignored if neither is supplied)
 *
 * @param {Object} options
 *  - type    {String}  Entity type
 *  - terms   {String}  Keyword search terms
 *  - zip     {Number}  ZIP Code (converted to lat/lng on server-side)
 *  - lat     {Number}  Latitude (overrides zip if lat/lng are both present)
 *  - long    {Number}  Longitude
 *  - range   {Number}  Distance (in miles)
 *  - limit   {Number}  Number of rows to return
 *  - offset  {Number}  Number of rows to "skip"
 *
 * @param {Function} callback
 */
Client.prototype.search = function (options, callback) {
    var params = extend({}, options),
        req = this.request("search/explore");

    if (params.lat && params.long) {
        delete params.zip;
    }

    if (!params.zip && !params.lat && !params.long) {
        delete params.range;
    }

    req.query(params);

    return req.end(easy(callback));
};

// single export
module.exports = Client;
