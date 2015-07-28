// dependencies
var each = require("each");
var traverse = require("isodate-traverse");
var utils = require("./utils.js");
var no_cache = require("superagent-no-cache");

/**
 * Perform a general entity search via the API. Most params are just piped
 * right on through via the querystring.
 *
 * Geospatial searches are triggered whenever 'lat' and 'lon' are included
 * in the params.
 *
 * Automatically parses created/modified/start_ts/end_ts fields as `Date`
 * objects.
 *
 * @param {Object} options
 *  - types {Array:Number} Entity types
 *  - terms {String}       Keyword search terms
 *  - lat   {Number}       Latitude
 *  - lon   {Number}       Longitude
 *  - limit {Number}       Number of rows to return
 *
 * @param {Function} callback
 */
exports.search = function (params, callback) {
    var req = this.request("search");

    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    req
    .use(no_cache)
    .query(params);

    return req
        .end(utils.easy(function (err, data) {
        if (err) return callback(err);
        each(data.results, function (row) {
            traverse(row);
        });
        callback(null, data.results);
    }));
};
