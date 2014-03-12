// dependencies
var Vertex = require("./Vertex");

/**
 * Represents an asset vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Asset(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Asset);


// override for Vertex#base
Asset.prototype.base = "assets";


// single export
module.exports = Asset;
