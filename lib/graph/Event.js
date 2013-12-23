// dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");

/**
 * Represents an event vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Event(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(Event, Vertex);


// override for Vertex#base
Event.prototype.base = "events";


// single export
module.exports = Event;
