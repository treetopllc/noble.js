// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

/**
 * Represents an activity vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Activity(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Activity);


// override for Vertex#base
Activity.prototype.base = "activities";

// single export
module.exports = Activity;
