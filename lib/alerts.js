var utils = require("./utils");

exports.mailboxes = function (callback) {
    return this.request("alerts/mailboxes")
        .end(utils.easy(callback));
};

exports.mailbox = function (id, query, callback) {
    if (!callback && typeof query === "function") {
        callback = query;
        query = {};
    }

    return this.request("alerts/mailboxes/" + id)
        .query(query)
        .end(utils.easy(callback));
};

exports.mailboxCreate = function (id, attr, pref, callback) {
    return this.request("post", "alerts/mailboxes")
        .send({
            id: id,
            attributes: attr,
            preferences: pref
        })
        .end(utils.easy(callback));
};

//exports.mailboxDelete = function (id, callback) {
//    return this.request("delete", "alerts/mailboxes/" + id)
//        .end(utils.easy(callback));
//};

//exports.mailboxAttributes = function (id, callback) {
//    return this.request("alerts/attributes/" + id)
//        .end(utils.easy(callback));
//};

exports.mailboxPreferences = function (id, callback) {
    return this.request("alerts/preferences/" + id)
        .end(utils.easy(callback));
};

//exports.dispatch = function (to, meta, options, callback) {
//    return this.request("post", "alerts/dispatch")
//        .send({
//            to: to,
//            alert: meta,
//            options: options
//        })
//        .end(utils.easy(callback));
//};

exports.mailboxUnread = function (mailbox, alerts, callback) {
    return this.request("patch", "alerts/mailboxes/" + mailbox)
        .send({
            ids: alerts,
            read: false
        })
        .end(utils.easy(callback));
};


exports.mailboxRead = function (mailbox, alerts, callback) {
    return this.request("patch", "alerts/mailboxes/" + mailbox)
        .send({
            ids: alerts,
            read: true
        })
        .end(utils.easy(callback));
};
