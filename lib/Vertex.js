var utils = require("./utils");

module.exports = Vertex;

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
 * Retrieve this vertex's information
 *
 * Automatically parses created/modified fields as `Date` objects
 *
 * @param {Function} callback
 */
Vertex.prototype.get = function (callback) {
    return this.client.request("graph/" + this.id)
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, utils.parseDates(data, [ "created", "modified" ]));
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
    return this.client.request([ "graph", this.id, type ])
        .query(query)
        .end(utils.easy(callback));
};
