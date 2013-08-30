var utils = require("./utils"),
    Mailbox = require("./Mailbox");

exports.mailboxes = function (callback) {
    return this.request("alerts/mailboxes")
        .end(utils.easy(callback));
};

exports.mailbox = function (id) {
    return new Mailbox(this, id);
};
