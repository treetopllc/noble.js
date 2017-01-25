// dependencies
var traverse = require("isodate-traverse");
var inherit = require("inherit");
var utils = require("../utils");
var no_cache = require("superagent-no-cache");


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
 * Get the base URI for this entity
 *
 * @returns {String}
 */
Vertex.prototype.baseUri = function () {
    var url = [];
    if (this.owner) url.push(this.owner.uri());
    url.push(this.base);
    return url.join("/");
};


/**
 * Generate a URL for a vertex
 *
 * If an "owner" has been assigned to this vertex, it's URI will be prepended
 *
 * @param {String} [path]  Optional path to append
 * @returns {String}
 */
Vertex.prototype.uri = function (path) {
    var url = [ this.baseUri() ];

    if (this.id) url.push(this.id);

    if (path) {
        if (typeof path === "string") {
            url.push(path);
        } else {
            url.push.apply(url, path);
        }
    }

    return url.join("/");
};


/**
 * Retrieve this vertex's information (GET)
 *
 * Automatically parses created/modified fields as `Date` objects
 *
 * @param {Object} query       Additional Query-String Arguments
 * @param {Function} callback
 * @returns {Request}
 */
Vertex.prototype.get = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request(this.uri())
        .use(no_cache)
        .query(query)
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, traverse(data));
        }));
};


/**
 * Retrieve this vertex's information (HEAD)
 *
 * Automatically parses created/modified fields as `Date` objects
 *
 * @param {Function} callback
 * @returns {Request}
 */
Vertex.prototype.head = function (callback) {
    return this.client.request("head", this.uri())
        .use(no_cache)
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, traverse(data));
        }));
};


/**
 * Creates a new vertex
 *
 * @param {Object} data
 * @param {Function} callback
 * @returns {Request}
 */
Vertex.prototype.create = function (data, callback) {
    var self = this;
    return this.client.request("post", this.baseUri())
        .send(data)
        .end(utils.easy(function (err, data, res) {
            if (err) return callback(err);
            if (data && data.id) {
                self.id = data.id;
            }
            callback(null, data, res);
        }));
};


/**
 * Perform a partial update for a vertex, or perform a bulk update for multiple
 * vertices.
 *
 * @param {Object|Array:Object} data
 * @param {Function} callback
 */
Vertex.prototype.modify = function (data, callback) {
    return this.client.request("patch", this.uri())
        .use(no_cache)
        .send(data)
        .end(utils.easy(callback));
};


/**
 * Deletes a vertex
 *
 * @param {Object|Array:Object} data
 * @param {Function} callback
 */
Vertex.prototype.delete = function (callback) {
    return this.client.request("del", this.uri())
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
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
 * @returns {Request}
 */
Vertex.prototype.related = function (type, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request(this.uri(type))
        .use(no_cache)
        .query(query)
        .end(utils.easy(function (err, data) {
            if (err) return callback(err);
            callback(null, traverse(data));
        }));
};

/**
 * Convert this entity (even if it is a specific type, like "Submission") into
 * a Vertex object.
 *
 * @returns {Vertex}
 */
Vertex.prototype.toVertex = function () {
    return new Vertex(this.client, this.id);
};


/**
 * Assign another vertex as the "owner" of this vertex
 *
 * @param {Vertex} owner
 * @returns {Vertex}
 */
Vertex.prototype.belongsTo = function (owner) {
    if (!(owner instanceof Vertex)) throw new Error("owner must be a Vertex");
    this.owner = owner;
    return this;
};


/**
 * Add a helper for inheritance (since we use this so frequently internally)
 *
 * @param {Function} Constructor  Constructor that will inherit from Vertex
 */
Vertex.extend = function (Constructor) {
    inherit(Constructor, Vertex);
};


// single export
module.exports = Vertex;
