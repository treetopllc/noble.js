// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a project vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Project(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Project);


// override for Vertex#base
Project.prototype.base = "projects";


// single export
module.exports = Project;
