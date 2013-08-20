var utils = require("./utils");

module.exports = Vertex;

/**
 * Represents a vertex in the graph
 *
 * @contstructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Vertex(client, id) {
    this.client = client;
    this.id = id;
}

/**
 * Retrieve this vertex information
 *
 * @param {Function} callback
 */
Vertex.prototype.get = function (callback) {
    return this.client.request("graph/" + this.id)
        .end(utils.easy(callback));
};

/**
 * Retrieve a collection of related vertexes (varies by vertex_type)
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

    return this.client.request([ "graph", this.id, type ])
        .query(query)
        .end(utils.easy(callback));
};
