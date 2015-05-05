// dependencies
var Vertex = require("./Vertex");


/**
 * Represents a affiliation vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Affiliation(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Affiliation);


// override for Vertex#base
Affiliation.prototype.base = "affiliations";


// single export
module.exports = Affiliation;
