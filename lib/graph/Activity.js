// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

/**
 * Represents an activity vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Activity(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Activity);


// override for Vertex#base
Activity.prototype.base = "activities";


/**
 * Requests Activity review
 *
 * @param query
 * @param callback
 * @returns {Function} callback
 */
Activity.prototype.review = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("post", this.uri() + "/review")
        .send(query)
        .end(utils.easy(callback));
};

Activity.prototype.sites = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("get", this.uri() + "/sites")
        .send(query)
        .end(utils.easy(callback));
};


// single export
module.exports = Activity;
