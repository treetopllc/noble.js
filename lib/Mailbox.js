var utils = require("./utils");

module.exports = Mailbox;

/**
 * Represents a mailbox in the alerts API
 *
 * @contstructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      Mailbox ID (usually a user's UUID)
 */
function Mailbox(client, id) {
    this.client = client;
    this.id = id;
}

/**
 * Retrieve a mailbox's content ("inbox")
 *
 * Automatically parses created/modified fields as `Date` objects
 *
 * Available `query` options:
 *  - limit: per-page count
 *  - page:  page to retrieve (default: 1)
 *
 * @param {Object} query       Query-string parameters
 * @param {Function} callback
 */
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

/**
 * Create this mailbox. See ponyexpress documentation for details about `attr`
 * and `pref` parameters.
 *
 * @param {Object} attr        Mailbox Attributes
 * @param {Object} pref        Mailbox Preferences
 * @param {Function} callback
 */
Mailbox.prototype.create = function (attr, pref, callback) {
    return this.client.request("post", "alerts/mailboxes")
        .send({
            id: this.id,
            attributes: attr,
            preferences: pref
        })
        .end(utils.easy(callback));
};

/**
 * Retrieve stats for this mailbox:
 *  - new: number of unread (not deleted) alerts
 *  - deleted: number of deleted alerts
 *  - read: number of read alerts
 *  - total: total number of alerts
 *
 * @param {Function} callback
 */
Mailbox.prototype.stats = function (callback) {
    return this.client.request("alerts/statistics/" + this.id)
        .end(utils.easy(callback));
};

/**
 * Mark a collection of alerts as "unread".
 *
 * @param {Array} alerts       List of alert ids
 * @param {Function} callback
 */
Mailbox.prototype.markUnread = function (alerts, callback) {
    return this.client.request("patch", "alerts/mailboxes/" + this.id)
        .send({
            ids: alerts,
            read: false
        })
        .end(utils.easy(callback));
};

/**
 * Mark a collection of alerts as "read".
 *
 * @param {Array} alerts       List of alert ids
 * @param {Function} callback
 */
Mailbox.prototype.markRead = function (alerts, callback) {
    return this.client.request("patch", "alerts/mailboxes/" + this.id)
        .send({
            ids: alerts,
            read: true
        })
        .end(utils.easy(callback));
};
