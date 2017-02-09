// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

/**
 * Represents a Portal vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Portal(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Portal);


// override for Vertex#base
Portal.prototype.base = "col/portals";


/**
 * Post to portal resource
 *
 * @param {String} resource
 * @param {Object} data
 * @param {Function} callback
 */
Portal.prototype.post = function (resource, data, callback) {
    var self = this;
    return self.client.request("post", self.uri(resource))
        .send(data)
        .end(utils.easy(function (err, data, res) {
            if (err) return callback(err);
            if (data && data.id) {
                self.id = data.id;
            }
            callback(null, data, res);
        }));
};

// single export
module.exports = Portal;


