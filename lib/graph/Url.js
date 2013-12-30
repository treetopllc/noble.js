// dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");

/**
 * Represents a url vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Url(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(Url, Vertex);


// override for Vertex#base
Url.prototype.base = "urls";


// single export
module.exports = Url;
