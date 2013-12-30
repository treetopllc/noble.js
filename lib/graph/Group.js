// dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");

/**
 * Represents a group vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Group(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(Group, Vertex);


// override for Vertex#base
Group.prototype.base = "groups";


// single export
module.exports = Group;
