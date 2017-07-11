// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

/**
 * Represents a group vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Group(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Group);


// override for Vertex#base
Group.prototype.base = "groups";


 /**
  * Retrieves participation information for a group
  *
  * @param {String} [key]       Subset of data to retrieve (eg: "impact")
  * @param {Function} callback
  * @returns {superagent.Request}
  */
Group.prototype.participation = function (key, callback) {
     if (typeof key === "function") {
         callback = key;
         key = null;
     }

     var url = "participation";
     if (key) url += "/" + key;

     return this.related(url, callback);
 };

 /**
  * Retrieves a list of users for a group
  *
  * Available `query` options:
  *  - limit {Number}
  *  - offset {Number}
  *
  * @param {Object} [query]
  * @param {Function} callback
  */
Group.prototype.users = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("users", query, callback);
};

/**
 * Retrieves a list of partnerships for a group
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - orderby {String}
 *  - orderdir {String}
 *  - archived {Bool}
 *  - deleted {Bool}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Group.prototype.partnerships = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("partnerships", query, callback);
};

/**
 * delete a group's related content
 *
 * @param {Object} [id] // content id to be deleted
 * @param {Function} callback
 */
Group.prototype.deleteContent = function (id, callback) {
     return this.client.request("delete", this.uri() + "/content/" + id)
        .end(utils.easy(callback));
}


// single export
module.exports = Group;
