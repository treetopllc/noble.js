// dependencies
var utils = require("./utils");

/**
 * Retrieves the "global" participation information for the noblehour network
 *
 * If `key` is supplied, it will append that to the URL (retrieving a subset)
 *
 * @param {String} [key]
 * @param {Function} callback
 */
exports.participation = function (key, callback) {
    if (typeof key === "function") {
        callback = key;
        key = null;
    }

    var url = "participation";
    if (key) url += "/" + key;

    return this.request(url).end(utils.easy(callback));
};
