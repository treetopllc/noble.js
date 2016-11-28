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

// single export
module.exports = HoursSet;


// inheritance
Vertex.extend(HoursSet);


// override for Vertex#base
HoursSet.prototype.base = "hour_sets";


/**
 * Retrieves a hour logs for a particular hour set
 *
 * @param params
 * @param callback
 * @returns {*}
 */
HoursSet.prototype.hours = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    var url = "hours";

    return this.related(url, query, callback);
};


/**
 * HoursSet#create(params, callback)
 *
 * Available params:
 *  - TODO
 *
 * @see Vertex#create(...)
 */