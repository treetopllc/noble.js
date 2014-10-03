// dependencies
var utils = require("./utils");

/**
 * Retrieves saml information for the noblehour network
 *
 * @param {Function} callback
 */
exports.saml = function (id, callback) {
    if (typeof id === "function") {
        callback = id;
        id = null;
    }

    var url = "saml/providers";

    if (id) url += "/";

    return this.request(url).query({ portals: id }).end(utils.easy(callback));
};
