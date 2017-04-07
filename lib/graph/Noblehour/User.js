// Product specific endpoint live inside these graph/PROD folders

// dependencies
var each = require("each");
var toIso = require("to-iso-string");
var Vertex = require("../Vertex");
var Alert = require("../Alert");
var utils = require("../../utils");


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
 * Retrieves a list of contributable groups
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
NH_User.prototype.groupSuggestions = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("suggestions/groups/for_hours", query, callback);
};
