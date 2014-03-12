// dependencies
var Vertex = require("./Vertex");


/**
 * Represents a submission vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Moderation(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Moderation);


// override for Vertex#base
Moderation.prototype.base = "moderations";


// single export
module.exports = Moderation;
