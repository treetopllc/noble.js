// dependencies
var map = require("map");
var traverse = require("isodate-traverse");
var utils = require("../utils");

/**
 * Represents a vertex in the graph
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Vertex(client, id) {
    this.client = client;
    this.id = id;
}

/**
 * The "base URL" for an entity. This property will be overridden by child
 * constructors.
 */
Vertex.prototype.base = "vertices";


/**
 * Generate a URL for a vertex
 *
 * @param {String} [path]  Optional path to append
 * @returns {String}
 */
Vertex.prototype.url = function (path) {
    var url = this.base + "/" + this.id;
    if (path) url += "/" + path;
    return url;
};


/**
 * Retrieve this vertex's information
 *
 * Automatically parses created/modified fields as `Date` objects
 *
 * @param {Function} callback
 */
Vertex.prototype.get = function (callback) {
    return this.client.request(this.url())
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, traverse(data));
        }));
};

/**
 * Retrieve a collection of related vertexes (varies by vertex_type)
 *
 * Dates are *not* automatically parsed, that is up to the "sub-classes"
 *
 * @param {String} type        The relation type
 * @param {Object} query       Additional Query-String Arguments
 * @param {Function} callback
 */
Vertex.prototype.related = function (type, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request(this.url(type))
        .query(query)
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, traverse(data));
        }));
};

/**
 * Convert this entity (even if it is a specific type, like "Submission") into
 * a Vertex object.
 */
Vertex.prototype.toVertex = function () {
    return new Vertex(this.client, this.id);
};

// single export
module.exports = Vertex;
