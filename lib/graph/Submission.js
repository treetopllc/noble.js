// dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");


/**
 * Represents a submission vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Submission(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(Submission, Vertex);


// override for Vertex#base
Submission.prototype.base = "submissions";


/**
 * Submission#create(params, callback)
 *
 * Available params:
 *  - author_id {String}     User UUID
 *  - to_id {String}         Vertex UUID for destination
 *  - vertex_id {String}     Vertex UUID for content
 *  - edge_type_id {Number}  @see ../reference.js
 *  - featured {Date}        Date/Time for this entity to be "featured" until
 *
 * @see Vertex#create(...)
 * @param {Object} params
 * @param {Function} callback
 */


/**
 * Retrieve the history log for a given submission
 *
 * @param {Function} callback
 */
Submission.prototype.history = function (callback) {
    return this.related("history", callback);
};


// single export
module.exports = Submission;
