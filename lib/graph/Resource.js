// module dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");

/**
 * Represents an resource vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Resource(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(Resource, Vertex);


// override for Vertex#base
Resource.prototype.base = "resources";


// single export
module.exports = Resource;
