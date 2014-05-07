// dependencies
var each = require("each");
var Vertex = require("./Vertex");
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


Organization.prototype.content = function (callback) {
    return this.related("content", function (err, list) {
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

// single export
module.exports = Organization;
