// dependencies
var Vertex = require("./Vertex");
var utils = require("../utils");

/**
 * Represents a project vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Project(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Project);


// override for Vertex#base
Project.prototype.base = "projects";


/**
 * Search for projects, largely as a "duplication check"
 *
 * Available query params:
 *  - id {String}        The root ID to search from
 *  - terms {String}
 *  - deleted {Boolean}  Whether or not to include deleted projects
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Project.prototype.search = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    var req = this.client.request(this.baseUri());
    if (query) req.query(query);
    return req.end(utils.easy(callback));
};


// single export
module.exports = Project;
