// dependencies
var inherit = require("inherit");
var utils = require("../utils");
var Vertex = require("./Vertex");
var UserAlert = require("./UserAlert");

var translate = utils.translate;


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


// inheritance
inherit(User, Vertex);


// override for Vertex#base
User.prototype.base = "users";


/**
 * Retrieves a list of submissions for that this user has "authored"
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - statuses {Array:Number}  Each item is a status type
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.submissions = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("submissions", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "edge_types", "submission_edge_type_id");
            translate(row, "submission_statuses", "submission_status_id");
            translate(row, "vertex_types", "content_type_id");
            translate(row, "vertex_types", "destination_type_id");
        });
        callback(null, list);
    });
};


/**
 * Retrieve a list of content that this user has authored
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - types {Array:Number}  Each item is a vertex type
 *
 * @param {Object} [query]     Additional QueryString Parameters
 * @param {Function} callback
 */
User.prototype.authored = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("authored", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "type_id");
            if (row.type) {
                translate(row, row.type.toLowerCase() + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a list of content created by member's of this user's network
 *
 * Available `query` options:
 *  - depth {Number}   Depth to traverse in graph query
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.feed = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("feed", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "type_id");
            if (row.type) {
                translate(row, row.type.toLowerCase() + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a list of entities that this user is a part of
 *
 * Available `query` options:
 *  - depth {Number}   Depth to traverse in graph query
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.network = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("network", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "type_id");
            if (row.type) {
                translate(row, row.type.toLowerCase() + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a user's role relative to an entity.
 *
 * If entity not supplied, the role retrieved will be a "global" role. In other
 * words, it will be in relation to the "NobleHour" main vertex
 *
 * @param {String} [entity]    Entity ID to retrieve role for
 * @param {Function} callback
 */
User.prototype.role = function (entity, callback) {
    if (typeof entity === "function") {
        callback = entity;
        entity = null;
    }

    return this.related("role", entity ? { "for": entity } : null, callback);
};


/**
 * Create a new UserAlert object for this user
 *
 * @param {String} id
 * @returns {UserAlert}
 */
User.prototype.alert = function (id) {
    return new UserAlert(this.client, this, id);
};


/**
 * Retrieve a user's alerts
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.alerts = function (query, callback) {
    return this.related("alerts", query, callback);
};


/**
 * Retrieve the statistics for this user's "mailbox"
 *
 * @param {Function} callback
 */
User.prototype.alertsStats = function (callback) {
    return this.related("alerts/stats", callback);
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
        .request("post", "submissions")
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


// single export
module.exports = User;
