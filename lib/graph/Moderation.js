// dependencies
var Vertex = require("./Vertex");
var ref = require("../reference").submission_statuses.by_name;


/**
 * Represents a submission vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Moderation(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Moderation);


// override for Vertex#base
Moderation.prototype.base = "moderations";


/**
 * Short-hand for modification to approve a moderation/submission
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
Moderation.prototype.approve = function (callback) {
    return this.modify({ status: ref.APPROVED }, callback);
};


/**
 * Short-hand for modification to deny a moderation/submission
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
Moderation.prototype.deny = function (callback) {
    return this.modify({ status: ref.DENIED }, callback);
};


// single export
module.exports = Moderation;
