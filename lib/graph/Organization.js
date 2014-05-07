// dependencies
var Vertex = require("./Vertex");

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
    return this.related("content", callback);
};

// single export
module.exports = Organization;
