// dependencies
var Vertex = require("./Vertex");
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

/**
 * Retrieves a list of all users for the opportunity
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
Opportunity.prototype.users = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("users", query, callback);
};

  /**
   * Retrieves a list of all relationships for the opportunity
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
Opportunity.prototype.relationships = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("relationships", query, callback);
};

/**
  * Retrieves participation information for an opportunity
  *
  * @param {String} [key]       Subset of data to retrieve (eg: "impact")
  * @param {Function} callback
  * @returns {superagent.Request}
  */
Opportunity.prototype.participation = function (key, callback) {
    if (typeof key === "function") {
        callback = key;
        key = null;
    }

    var url = "participation";
    if (key) url += "/" + key;

    return this.related(url, callback);
};

/**
 * Grabs opp types dynamically from the api instead of a constant / json
 * This is because we want to merge and update opp and event types
 * in a backwards compatible way.
 */
Opportunity.prototype.types = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("get", this.base + "/types")
    .send(query)
    .end(utils.easy(callback));
};

// single export
module.exports = Opportunity;
