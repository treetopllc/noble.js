// dependencies
var inherit = require("inherit");
var utils = require("../utils");
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
 * Retrieve the history log for a given submission
 *
 * @param {Function} callback
 */
Submission.prototype.history = function (callback) {
    return this.related("history", callback);
};


// single export
module.exports = Submission;
