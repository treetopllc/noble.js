// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");
var debug = require("debug")("noble.js:graph:asset");

/**
 * Represents an asset vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Asset(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Asset);


// override for Vertex#base
Asset.prototype.base = "assets";


/**
 * Asset#create(params, callback)
 *
 * Available params:
 *  - name {String}
 *  - description {String}
 *  - file {File}           HTML5 File object
 *
 * TODO: IE9 support?
 *
 * @see Vertex#create(...)
 */
Asset.prototype.create = function (params, callback) {
    debug("creating asset", params);

    var self = this;
    var file = params.file;
    delete params.file;

    return this.client.request("post", this.uri())
        .send(params)
        .attach("file", file)
        .end(utils.easy(function (err, data, res) {
            if (err) return callback(err);
            if (data && data.id) {
                self.id = data.id;
                debug("vertex id changed", self.id);
            }
            callback(null, data, res);
        }));
};



// single export
module.exports = Asset;
