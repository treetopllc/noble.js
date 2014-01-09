// dependencies
var map = require("map");
var traverse = require("isodate-traverse");
var utils = require("./utils");
var translate = utils.translate;

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

    req.query(params);

    return req.end(utils.easy(function (err, data) {
        if (err) return callback(err);
        each(data.results, function (row) {
            traverse(row);
            translate(row, "vertex_types", "vertex_type_id", "type");
            translate(row, row.type.toLowerCase() + "_types", "subtype_id");
        });
        callback(null, data.results);
    }));
};
