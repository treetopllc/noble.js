var inherit = require("inherit"),
    utils = require("./utils"),
    Vertex = require("./Vertex");

/**
 * Represents a user vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function User(client, id) {
    Vertex.call(this, client, id);
}

inherit(User, Vertex);

module.exports = User;

/**
 * Retrieves a list of submissions for this user (via graph)
 *
 * Available `query` options:
 *  - limit {Number}      Page limit
 *  - page {Number}       0-indexed page number
 *  - edge_types {Array}  Each {Number} item is role id
 *  - statuses {Array}    Each {Number} item is a status type id
 *
 * @param {Object} query  Additional QueryString Parameters
 */
User.prototype.submissions = function (query, callback) {
    return this.related("submissions", query, callback);
};
