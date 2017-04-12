// dependencies
var Vertex = require("../Vertex");


// single export
module.exports = COL_User;


/**
 * Represents a user vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function COL_User(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(COL_User);


// override for Vertex#base
COL_User.prototype.base = "col/users";

/**
 * Retrieve a list of user's public content by endpoint
 *
 * Available `endpoint` options:
 *  - activities {string}
 *  - courses {string}
 *  - collaborators {string}
 *
 * @param {String} [endpoint] The content endpoint
 * @param {Object} [query] Additional QueryString Parameters
 * @param {Function} callback
 */
COL_User.prototype.publicContent = function(endpoint, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related(endpoint, query, callback);
};

/**
 * Retrieves a list user activities - published or not
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
COL_User.prototype.activities = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("activities", query, callback);
};


/**
 * Retrieves a list user courses - published or not
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
COL_User.prototype.courses = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("courses", query, callback);
};
