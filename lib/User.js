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
    this.type = "users";
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
 * @param {Object} query       Additional QueryString Parameters
 * @param {Function} callback
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


/**
 * Retrieve a list of content that this user has authored
 *
 * Available `query` options:
 *  - limit {Number}      Page limit
 *  - page {Number}       0-indexed page number
 *  - edge_types {Array}  Each {Number} item is role id
 *  - statuses {Array}    Each {Number} item is a status type id
 *
 * @param {Object} query       Additional QueryString Parameters
 * @param {Function} callback
 */
User.prototype.content = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("authored", query, callback);
};

/**
 * Retrieve a list of entities that this user is a part of
 *
 * Available `query` options:
 *  - limit {Number}      Page limit
 *  - page {Number}       0-indexed page number
 *  - edge_types {Array}  Each {Number} item is role id
 *  - statuses {Array}    Each {Number} item is a status type id
 *
 * @param {Object} query       Additional QueryString Parameters
 * @param {Function} callback
 */
User.prototype.network = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("network", query, callback);
};

/**
 * Shared existing content with another community
 *
 * Available `params`:
 *  - content_id {String}       *REQUIRED* id for submitted content
 *  - to {Array|String}         *REQUIRED* array of community ids
 *  - name {String}             *REQUIRED* Name for the new vertex
 *  - description {String}      Long description for the new vertex
 *  - submission_type {Number}  *DEFAULT=8* edge type for submission vertex
 *  - status {Number}           *DEFAULT=3* status for this submission
 *
 * @param {Object} params
 * @param {Function} callback
 */
User.prototype.contribute = function (params, callback) {
    return this.client
        .request("post", [ "submissions" ])
        .send({
            // REQUIRED
            type_id:         "9",
            content_id:      params.content_id,
            to:              params.to,
            from:            this.id,
            name:            params.name,

            // OPTIONAL
            description:     params.description,

            // DEFAULTED
            submission_type: params.submission_type || 8,
            status:          params.status || 3
        })
        .end(utils.easy(callback));
};
