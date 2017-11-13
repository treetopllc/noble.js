// dependencies
var utils = require("../utils");
var Vertex = require("./Vertex");


/**
 * Represents a invite vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Invite(client, id) {
    Vertex.call(this, client, id);
}

// inheritance
Vertex.extend(Invite);

// override for Vertex#base
Invite.prototype.base = "invites";

/**
 * Opens an invite, creating a submission
 *
 * @param invite_id
 * @param accepting_id
 * @param {Function} callback
 */
Invite.prototype.open = function (invite_id, accepting_id, callback) {
    return this.client.request("put", this.uri() + "/" + invite_id + "/" + accepting_id)
        .end(utils.easy(callback));
};

/**
 * POST to /invites
 *
 * @param params
 * @param callback
 * @returns {Function} callback
 */
Invite.prototype.post = function(params, callback) {
    return this.client.request("post", this.uri())
        .send(params)
        .end(utils.easy(callback));
};

// single export
module.exports = Invite;
