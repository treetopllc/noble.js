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
 * Creates a class for a specific course given its ID
 *
 * @param {Object} data
 * @param {Function} callback
 */
COL_Course.prototype.createClass = function (data, callback) {
    return this.client.request("post", this.uri() + "/classes")
    .send(data)
    .end(utils.easy(callback));
};
