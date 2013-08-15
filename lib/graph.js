var User = require("./User"),
    Submission = require("./Submission");

exports.user = function (id) {
    return new User(this, id);
};

exports.submission = function (id) {
    return new Submission(this, id);
};
