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

/**
 * Retrieves a list of all users for the event
 *
 * Available `query` params:
*  - terms {String}   search terms
*  - limit {Number}   Maximum number of results to return (default: 100)
*  - offset {Number}  Offset of results to return (default: 0)
 *
 * @param {Object} [query]
 * @param {Function} callback
 * @returns {superagent.Request}
 */
Event.prototype.users = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("users", query, callback);
};

/**
 * Retrieves participation information for an event
 *
 * @param {String} [key]       Subset of data to retrieve (eg: "impact")
 * @param {Function} callback
 * @returns {superagent.Request}
 */
Event.prototype.participation = function (key, callback) {
    if (typeof key === "function") {
        callback = key;
        key = null;
    }

    var url = "participation";
    if (key) url += "/" + key;

    return this.related(url, callback);
};

// single export
module.exports = Event;
