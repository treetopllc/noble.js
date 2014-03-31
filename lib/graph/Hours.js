// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a vertex of user-submitted hours
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Hours(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Hours);


// override for Vertex#base
Hours.prototype.base = "hours";


/**
 * Hours#create(params, callback)
 *
 * Available params:
 *  - author_id {String}       User UUID of the user who did the hours
 *  - opportunity_id {String}  Opportunity UUID hours were performed for
 *  - start_ts {Date}          Starting date/time for hours
 *  - end_ts {Date}            End date/time for hours
 *  - break_time {Number}      Amount of break time (in minutes)
 *  - pay {Number}             Amount paid for hours (if applicable)
 *  - journal_note {String}    Comments/reflection from author about hours
 *
 * @see Vertex#create(...)
 */


// single export
module.exports = Hours;
