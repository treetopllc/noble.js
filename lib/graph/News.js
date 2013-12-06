// module dependencies
var inherit = require("inherit");
var Vertex = require("./Vertex");

/**
 * Represents a news vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function News(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
inherit(News, Vertex);


// override for Vertex#base
News.prototype.base = "news";


// single export
module.exports = News;
