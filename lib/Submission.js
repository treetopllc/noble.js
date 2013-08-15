var inherit = require("inherit"),
    utils = require("./utils"),
    Vertex = require("./Vertex");

function Submission(client, id) {
    this.client = client;
    this.id = id;
}

inherit(Submission, Vertex);

module.exports = Submission;
