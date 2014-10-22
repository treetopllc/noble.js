// dependencies
var utils = require("./utils");

/**
 * Retrieves sso information for the noblehour network
 *
 * @param {Function} callback
 */
exports.sso = function (id, callback) {
    if (typeof id === "function") {
        callback = id;
        id = null;
    }

    var url = "sso/providers";

    return this.request(url).query({ portals: id }).end(utils.easy(callback));
};
