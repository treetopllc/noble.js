// module dependencies
var inherit = require("inherit");
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
inherit(Organization, Vertex);


// override for Vertex#base
Organization.prototype.base = "organizations";


// single export
module.exports = Organization;
