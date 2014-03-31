// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a vertex of user-submitted hours
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function HoursSet(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(HoursSet);


// override for Vertex#base
HoursSet.prototype.base = "hour_sets";


/**
 * HoursSet#create(params, callback)
 *
 * Available params:
 *  - TODO
 *
 * @see Vertex#create(...)
 */


// single export
module.exports = HoursSet;
