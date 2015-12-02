// dependencies
var utils = require("./utils");

/**
 * Archives a single vertex give an id (e.g. send to vault)
 *
 * @param {Function} callback
 */
exports.archive = function (id, callback) {
    if (typeof id === "function") {
        callback = id;
        id = null;
    }

    var url = "vertices/" + id;

    return this.request("patch", url).send({ archived: true }).end(utils.easy(callback));
};


/**
 * Unarchives a single vertex give an id (e.g. remove from vault)
 *
 * @param {Function} callback
 */
exports.unarchive = function (id, callback) {
    if (typeof id === "function") {
        callback = id;
        id = null;
    }

    var url = "vertices/" + id;

    return this.request("patch", url).send({ archived: false }).end(utils.easy(callback));
};

/**
 * Bulk archives give id(s) (e.g. send to vault)
 *
 * Available query params:
 *  - ids []        array of ids
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
exports.bulkArchive = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    var url = "vertices/archive";

    return this.request("patch", url).send(query).end(utils.easy(callback));
};


/**
 * Bulk unarchives give id(s) (e.g. remove from vault)
 *
 * Available query params:
 *  - ids []        array of ids
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
exports.bulkUnArchive = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    var url = "vertices/unarchive";

    return this.request("patch", url).send(query).end(utils.easy(callback));
};
