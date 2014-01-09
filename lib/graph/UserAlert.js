// dependencies
var traverse = require("isodate-traverse");
var utils = require("../utils");

/**
 * Represents a single user alert
 *
 * @constructor
 * @param {Client} client
 * @param {User} user
 * @param {String} id
 */
function UserAlert(client, user, id) {
    this.client = client;
    this.user = user;
    this.id = id;
}


/**
 * Generate a URL for this alert
 *
 * @param {String} [path]
 * @returns {String}
 */
UserAlert.prototype.uri = function (path) {
    var uri = this.user.uri([ "alerts", this.id ]);
    if (path) {
        uri += "/" + (typeof path === "string" ? path : path.join("/"));
    }
    return uri;
};


/**
 * Retrieve this alert's meta-data
 *
 * @param {Function} callback
 * @returns {Request}
 */
UserAlert.prototype.get = function (callback) {
    return this.client.request(this.uri())
        .end(utils.easy(function (err, body) {
            if (err) return callback(err);
            callback(null, traverse(body));
        }));
};


/**
 * Mark this alert as read
 *
 * @param {Function} callback
 */
UserAlert.prototype.markRead = function (callback) {
    return this.client.request("post", this.uri("status"))
        .send({ read: true })
        .end(utils.easy(callback));
};


/**
 * Mark this alert as unread
 *
 * @param {Function} callback
 */
UserAlert.prototype.markUnread = function (callback) {
    return this.client.request("post", this.uri("status"))
        .send({ read: false })
        .end(utils.easy(callback));
};


// single export
module.exports = UserAlert;
