// dependencies
var traverse = require("isodate-traverse");
var utils = require("../utils");
var Vertex = require("./Vertex");


/**
 * Represents a single user alert
 *
 * @constructor
 * @param {Client} client
 * @param {String} id
 */
function Alert(client, id) {
    this.client = client;
    this.id = id;
}


// static properties
Alert.prototype.base = "alerts";


// mixin some vertex methods, but we don't need to inherit the entire thing
Alert.prototype.baseUri = Vertex.prototype.baseUri;
Alert.prototype.uri = Vertex.prototype.uri;
Alert.prototype.belongsTo = Vertex.prototype.belongsTo;


/**
 * Mark this alert as read
 *
 * @param {Function} callback
 */
Alert.prototype.markRead = function (callback) {
    return this.client.request("post", this.uri("status"))
        .send({ read: true })
        .end(utils.easy(callback));
};

/**
 * Mark this alert as unread
 *
 * @param {Function} callback
 */
Alert.prototype.markUnread = function (callback) {
    return this.client.request("post", this.uri("status"))
        .send({ read: false })
        .end(utils.easy(callback));
};


// single export
module.exports = Alert;
