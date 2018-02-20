// dependencies
var Vertex = require("../Vertex");
var utils = require("../../utils");


// single export
module.exports = COL_Course;


/**
 * Represents a course (group) vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function COL_Course(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(COL_Course);


// override for Vertex#base
COL_Course.prototype.base = "col/courses";


/**
 * Endpoint that fetches classes for a specific course given its ID
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Course.prototype.classes = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = {};
    }

    query.with_classes = true;

    return this.client.request("get", this.uri())
    .query(query)
    .end(utils.easy(callback));
}

/**
 * Endpoint that creates a class for a specific course given its ID
 *
 * @param {Function} callback
 */
COL_Course.prototype.createClass = function (callback) {
    return this.client.request("post", this.uri() + "/classes")
    .end(utils.easy(callback));
};
