var User = require("./User"),
    Submission = require("./Submission");

/**
 * @param {String} id  The user's uuid
 * @returns {User}
 */
exports.user = function (id) {
    return new User(this, id);
};

/**
 * NOTE: API not currently functional for this
 *
 * @param {String} id  The submission's uuid
 * @returns {Submission}
 */
//exports.submission = function (id) {
//    return new Submission(this, id);
//};
