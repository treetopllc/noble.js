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
    Vertex.call(this, client, id);
}

inherit(Submission, Vertex);

module.exports = Submission;

/**
 * Modify a submission's attributes.
 *
 * status: `Number`
 *  - 0: Unsubmitted
 *  - 1: Accepted
 *  - 2: Denied
 *  - 3: Pending
 *
 * deleted: `Boolean`
 *
 * @param {Function} callback
 */
Submission.prototype.attributes = function (attr, callback) {
    return this.client.request("post", "graph/" + this.id)
        .send(attr)
        .end(utils.easy(callback));
};

/**
 * Modify a submission's status attribute only
 *
 * @param {Number} status         See Submission#attributes()
 * @param {String} [description]  To be included with history
 * @param {Function} callback
 */
Submission.prototype.status = function (status, description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    var params = { status: status };

    if (description) {
        params.description = description;
    }

    return this.attributes(params, callback);
};

/**
 * Set a submission's status as "Accepted"
 *
 * @param {String} [description]  See Submission#status()
 * @param {Function} callback
 */
Submission.prototype.accept = function (description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    return this.status(1, description, callback);
};

/**
 * Set a submission's status as "Denied"
 *
 * @param {String} [description]  See Submission#status()
 * @param {Function} callback
 */
Submission.prototype.deny = function (description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    return this.status(2, description, callback);
};
