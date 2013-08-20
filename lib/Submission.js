var inherit = require("inherit"),
    utils = require("./utils"),
    Vertex = require("./Vertex");

/**
 * Represents a submission vertex
 *
 * @contstructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Submission(client, id) {
    this.client = client;
    this.id = id;
}

inherit(Submission, Vertex);

module.exports = Submission;
