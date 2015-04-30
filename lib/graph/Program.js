// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a program vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Program(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Program);


// override for Vertex#base
Program.prototype.base = "programs";


// single export
module.exports = Program;
