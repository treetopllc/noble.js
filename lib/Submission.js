var extend = require("extend"),
    inherit = require("inherit"),
    utils = require("./utils"),
    Vertex = require("./Vertex");

/**
 * Represents a submission vertex
 *
 * @contstructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 * @param {Number} type    The content_type_id for this submission
 */
function Submission(client, id) {
    Vertex.call(this, client, id);
}

inherit(Submission, Vertex);

module.exports = Submission;

/**
 * Modify a submission's status attribute
 *
 * Available status codes:
 *  - 0: Unsubmitted
 *  - 1: Accepted
 *  - 2: Denied
 *  - 3: Pending
 *
 * @param {String} contentId      submission.content_id
 * @param {Number} typeId         submission.submission_type_id
 * @param {Number} status         New status id
 * @param {String} [description]  To be included with history
 * @param {Function} callback
 */
Submission.prototype.status = function (contentId, typeId, status, description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    var params = {
        content_id: contentId,
        submission_type: typeId,
        status: status
    };

    if (description) {
        params.description = description;
    }

    return this.client.request("patch", "graph/" + this.id)
        .send(params)
        .end(utils.easy(callback))
};

/**
 * Set a submission's status as "Accepted"
 *
 * @param {String} contentId      See Submission#status()
 * @param {Number} typeId         See Submission#status()
 * @param {String} [description]  See Submission#status()
 * @param {Function} callback
 */
Submission.prototype.accept = function (contentId, typeId, description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    return this.status(contentId, typeId, 1, description, callback);
};

/**
 * Set a submission's status as "Denied"
 *
 * @param {String} contentId      See Submission#status()
 * @param {Number} typeId         See Submission#status()
 * @param {String} [description]  See Submission#status()
 * @param {Function} callback
 */
Submission.prototype.deny = function (contentId, typeId, description, callback) {
    if (typeof description === "function") {
        callback = description;
        description = null;
    }

    return this.status(contentId, typeId, 2, description, callback);
};
