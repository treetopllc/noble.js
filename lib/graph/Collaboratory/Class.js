// dependencies
var Vertex = require("../Vertex");
var utils = require("../../utils");


// single export
module.exports = COL_Class;


/**
 * Represents a class (group) vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function COL_Class(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(COL_Class);


// override for Vertex#base
COL_Class.prototype.base = "col/classes";