var Client = require("./Client");

module.exports = function () {
    return Client.apply(null, arguments);
};

module.exports.Mailbox = require("./Mailbox");
module.exports.Submission = require("./Submission");
module.exports.User = require("./User");
module.exports.Vertex = require("./Vertex");
module.exports.isoDateParse = require("./date-parse-iso");
