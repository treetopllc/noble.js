// dependencies
var Vertex = require("./Vertex");
var ref = require("../reference").submission_statuses.by_name;
var debug = require("debug")("noble.js:graph:submission");


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
Vertex.extend(Submission);


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
 * Short-hand for modification to unsubmit a submission
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
Moderation.prototype.unsubmit = function (callback) {
    debug("unsubmitting submission", this);
    return this.modify({ status: ref.UNSUBMITTED }, callback);
};


/**
 * Retrieve the history log for a given submission
 *
 * @param {Function} callback
 */
Submission.prototype.history = function (callback) {
    debug("retrieving submission history", this);
    return this.related("history", callback);
};


// single export
module.exports = Submission;
