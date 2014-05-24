// dependencies
var each = require("each");
var Vertex = require("./Vertex");
var User = require("./User");
var translate = require("../utils").translate;

/**
 * Represents an organization vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Organization(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Organization);


// override for Vertex#base
Organization.prototype.base = "organizations";


/**
 * Retrieves a list of submitted content for an organization that has been approved.
 *
 * Available `query` params:
 *  - types {String}         Comma-separated list of vertex_type_id
 *  - terms {String}         Keyword search terms
 *  - featured {Boolean}     Only include currently featured content
 *  - featured_since {Date}  Datetime for which content must be featured (implies `featured`)
 *  - limit {Number}         Maximum number of results to return (default: 100)
 *  - offset {Number}        Offset of results to return (default: 0)
 *
 * @param {Object} [query]
 * @param {Function} callback
 * @returns {superagent.Request}
 */
Organization.prototype.content = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("content", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            if (row.content) {
                translate(row.content, "vertex_types", "vertex_type_id");
            }
            if (row.author) {
                translate(row.author, "vertex_types", "vertex_type_id");
            }
            if (row.submitter) {
                translate(row.submitter, "vertex_types", "vertex_type_id");
            }
            if (row.submission) {
                translate(row.submission, "vertex_types", "vertex_type_id");
                translate(row.submission, "submission_statuses", "status", "status_name");
            }
        });
        callback(null, list);
    });
};

/**
 * Retrieves participation information for an entire organization
 *
 * @param {String} [key]       Subset of data to retrieve (eg: "impact")
 * @param {Function} callback
 * @returns {superagent.Request}
 */
Organization.prototype.participation = function (key, callback) {
    if (typeof key === "function") {
        callback = key;
        key = null;
    }

    var url = "participation";
    if (key) url += "/" + key;

    return this.related(url, callback);
};

/**
 * Retrieves a list of all submissions for the organization
 *
 * Available `query` params:
 *  - types {String}   Comma-separated list of vertex_type_id
 *  - limit {Number}   Maximum number of results to return (default: 100)
 *  - offset {Number}  Offset of results to return (default: 0)
 *
 * @param {Object} [query]
 * @param {Function} callback
 * @returns {superagent.Request}
 */
Organization.prototype.submissions = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("submissions", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "edge_types", "edge_type_id");
            if (row.content) {
                translate(row.content, "vertex_types", "vertex_type_id");
            }
            if (row.destination) {
                translate(row.destination, "vertex_types", "vertex_type_id");
            }
        });
        callback(null, list);
    });
};

// single export
module.exports = Organization;
