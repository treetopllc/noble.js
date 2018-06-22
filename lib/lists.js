// dependencies
var each = require("each");
var traverse = require("isodate-traverse");
var utils = require("./utils.js");
var no_cache = require("superagent-no-cache");

/***
 * fetches a list of opportunities using an array of oppIDs
 * params:
 * {
 *   ids: array of opportunity ids
 * }
 ***/
exports.opportunities = function (params, callback) {
    var req = this.request("opportunities");

    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    req
    .use(no_cache)
    .query(params);

    return req
        .end(utils.easy(function (err, data) {
        if (err) return callback(err, data);
        each(data.results, function (row) {
            traverse(row);
        });
        callback(null, data);
    }));
}
