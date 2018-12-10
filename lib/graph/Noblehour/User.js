// Product specific endpoint live inside these graph/PROD folders

// dependencies
var Vertex = require("../Vertex");


// single export
module.exports = NH_User;


/**
 * Represents a user vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function NH_User(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(NH_User);


// override for Vertex#base
NH_User.prototype.base = "nh/users";


/**
 * Retrieves a list of contributable groups and orgs
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
NH_User.prototype.contributionSuggestions = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("suggestions/for_contribution", query, callback);
};

/**
 * Retrieves a list of contributable groups
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
NH_User.prototype.hourSuggestions = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("suggestions/for_logging", query, callback);
};
