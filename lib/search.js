var extend = require("extend"),
    each = require("each"),
    map = require("map"),
    utils = require("./utils"),
    types = {
        news:                    0,
        groups:                  1,
        organizations:           2,
        opportunities:           3,
        "offline organizations": 4,
        events:                  5,
        customers:               6,
        users:                   7,
        resources:               8
    };

/**
 * Perform a general entity search via the API. Most params are just piped
 * right on through via the querystring.
 *
 * Geospatial searches are triggered whenever 'lat' and 'lon' are included
 * in the params.
 *
 * @param {Object} options
 *  - parseDates {Boolean}  Whether to convert date strings into Moment objects
 *  - geojson    {Boolean}  Whether to retrieve data as GeoJSON (default: false)
 *  - types      {Array}    Entity types
 *  - terms      {String}   Keyword search terms
 *  - lat        {Number}   Latitude
 *  - lon        {Number}   Longitude
 *  - limit      {Number}   Number of rows to return
 *
 * @param {Function} callback
 */
exports.search = function (params, callback) {
    var req = this.request("graph/search"), parse = false;

    if (params.geojson) {
        req.query("return=geoJSON");
        delete params.geojson;
    }

    if (params.types) {
        params.types = map(params.types, typeId);
    }

    req.query(params);

    return req.end(utils.easy(function (err, data) {
        if (err) return callback(err);

        utils.parseDatesInCollection(data.results, [
            "created", "modified",
            "start_ts", "end_ts"
        ]);

        callback(null, data);
    }));
};

function typeId(type) {
    return typeof type === "string" ? types[type.toLowerCase()] : type;
}
