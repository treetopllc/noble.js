// dependencies
var utils = require("./utils");

/**
 * Archives a vertex give an id
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

exports.unarchive = function (id, callback) {
    if (typeof id === "function") {
        callback = id;
        id = null;
    }

    var url = "vertices/" + id;

    return this.request("patch", url).send({ archived: false }).end(utils.easy(callback));
};
