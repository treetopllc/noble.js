// dependencies
var domify = require("domify");
var submit = require("iframe-multipart");
var Vertex = require("./Vertex");
var supports = require("../supports");
var utils = require("../utils");

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
 * If IE9 (and maybe IE8) support is required, you will need to use a <form>
 * element for your main UI (and any fields that would be passed as params
 * must be named in the form, below is a simplified example)
 *
 * <form>
 *   <input type="text" name="name">
 *   <textarea name="description"></textarea>
 *   <input type="file" name="asset">
 * </form>
 *
 * For those browsers without XHR2/File API support, an iframe will be used
 * as the transport (see https://github.com/eivindfjeldstad/iframe-multipart)
 *
 * Available params:
 *  - form {HTMLFormElement}  Required for old browser support
 *  - name {String}
 *  - description {String}
 *  - asset {File}            HTML5 File API object
 *
 * @see Vertex#create(...)
 */
Asset.prototype.create = function (params, callback) {
    var self = this;

    if (!supports.xhr2FileUploads && params.form) {
        var form = params.form;
        form.setAttribute("action", this.client.uri(this.uri()));

        submit(form, function (err, html) {
            if (err) return handle(err);

            var el = domify(html);
            var results = el.innerHTML;

            try {
                results = JSON.parse(results);
            } catch (err) {
                return handle(err);
            }

            if (results.error) {
                handle(results);
            } else {
                handle(null, results);
            }
        });
    } else {
        return this.client.request("post", this.uri())
            .field("name", params.name)
            .field("description", params.description)
            .attach("asset", params.file, params.file.name)
            .end(utils.easy(handle));
    }

    function handle(err, results) {
        if (err) return callback(err);
        if (results && results.id) self.id = results.id;
        callback(null, results);
    }
};



// single export
module.exports = Asset;
