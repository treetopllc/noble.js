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
 * Automatically parses `content_modified` and `submission_date` date fields
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
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("submissions", query, function (err, data) {
        if (data && data.submissions) {
            utils.parseDatesInCollection(data.submissions, [
                "content_modified",
                "submission_date"
            ]);
        }

        callback(err, data);
    });
};
