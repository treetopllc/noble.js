// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a community vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Community(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Community);


// override for Vertex#base
Community.prototype.base = "communities";


// single export
module.exports = Community;
