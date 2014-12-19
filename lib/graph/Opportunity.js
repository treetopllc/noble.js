// dependencies
var Vertex = require("./Vertex");
var Alert = require("./Alert");
var utils = require("../utils");

/**
 * Represents an opportunity vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Opportunity(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Opportunity);


// override for Vertex#base
Opportunity.prototype.base = "opportunities";


/**
* Create a new Alert for this Opportunity
*
* Available params:
*  - admin_id {String}
*  - id {String}
*  - message {String}
*
* @param {Function} callback
*/
Opportunity.prototype.alert = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("post", this.uri() + "/alerts")
    .send(query)
    .end(utils.easy(callback));
};


// single export
module.exports = Opportunity;
