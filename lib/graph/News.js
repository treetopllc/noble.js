// dependencies
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
Vertex.extend(News);


// override for Vertex#base
News.prototype.base = "news";


/**
 * News#create(params, callback)
 *
 * Available params:
 *  - author_id {String}  User UUID
 *  - subject {String}    Title for the news post
 *  - body {String}       HTML content for the news post
 *
 * @see Vertex#create(...)
 * @param {Object} params
 * @param {Function} callback
 */


// single export
module.exports = News;
