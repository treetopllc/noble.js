var utils = require("./utils");

module.exports = Mailbox;

function Mailbox(client, id) {
    this.client = client;
    this.id = id;
}

Mailbox.prototype.get = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request("alerts/mailboxes/" + this.id)
        .query(query)
        .end(utils.easy(function (err, alerts) {
            if (err) return callback(err);

            utils.parseDatesInCollection(alerts, [ "created", "modified" ]);
            callback(null, alerts);
        }));
};

Mailbox.prototype.create = function (attr, pref, callback) {
    return this.client.request("post", "alerts/mailboxes")
        .send({
            id: this.id,
            attributes: attr,
            preferences: pref
        })
        .end(utils.easy(callback));
};

Mailbox.prototype.stats = function (callback) {
    return this.client.request("alerts/statistics/" + this.id)
        .end(utils.easy(callback));
};

Mailbox.prototype.markUnread = function (alerts, callback) {
    return this.client.request("patch", "alerts/mailboxes/" + this.id)
        .send({
            ids: alerts,
            read: false
        })
        .end(utils.easy(callback));
};

Mailbox.prototype.markRead = function (alerts, callback) {
    return this.client.request("patch", "alerts/mailboxes/" + this.id)
        .send({
            ids: alerts,
            read: true
        })
        .end(utils.easy(callback));
};
