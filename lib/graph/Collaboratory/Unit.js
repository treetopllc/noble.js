// dependencies
var Vertex = require("../Vertex");
var utils = require("../../utils");


// single export
module.exports = COL_Unit;


/**
 * Represents a unit vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function COL_Unit(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(COL_Unit);


// override for Vertex#base
COL_Unit.prototype.base = "col/units";


/**
 * List course prefixes for a unit
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Unit.prototype.course_prefixes = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related('course_prefixes', query, callback);
};

/**
 * Add a course prefix for a unit
 * @param data
 * @param callback
 * @returns {*|number}
 */
COL_Unit.prototype.postCoursePrefix = function (data, callback) {
    return this.client.request("post", this.uri() + "/course_prefixes")
        .send(data)
        .end(utils.easy(callback));
};

/**
 * Remove a course prefix for a unit
 *
 * @param {String} prefix
 * @param {Object} data
 * @param {Function} callback
 */
COL_Unit.prototype.deleteCoursePrefix = function (prefix, data,  callback) {
    return this.client.request("delete", this.uri() + "/course_prefixes/" + prefix)
    .send(data)
    .end(utils.easy(callback));
}