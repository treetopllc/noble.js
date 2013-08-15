var inherit = require("inherit"),
    utils = require("./utils"),
    Vertex = require("./Vertex");

function User(client, id) {
    Vertex.call(this, client, id);
}

inherit(User, Vertex);

module.exports = User;

User.prototype.submissions = function (query, callback) {
    return this.related("submissions", query, callback);
};
