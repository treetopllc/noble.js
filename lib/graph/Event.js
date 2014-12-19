// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

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
Vertex.extend(Event);


// override for Vertex#base
Event.prototype.base = "events";


/**
* Create a new Alert for this Event
*
* Available params:
*  - admin_id {String}
*  - id {String}
*  - message {String}
*
* @param {Function} callback
*/
Event.prototype.alert = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("post", this.uri() + "/alerts")
    .send(query)
    .end(utils.easy(callback));
};


// single export
module.exports = Event;
