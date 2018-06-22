// dependencies
var Vertex = require("../Vertex");

/**
 * Represents a community vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function NH_Community(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(NH_Community);


// override for Vertex#base
NH_Community.prototype.base = "nh/communities";

/**
 * Returns a list of hour moderation summaries by group for a community.
 * https://staging-api.noblehour.com/swagger-ui/#/noblehour/get_nh_communities__id__moderation_hours_by_group_summary
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.groupHoursSummary = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_group/summary", query, callback);
};

/**
 * Returns a list of hour moderation summaries by opportunity for a community.
 * https://staging-api.noblehour.com/swagger-ui/#/noblehour/get_nh_communities__id__moderation_hours_by_opportunity_summary
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.opportunityHoursSummary = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_opportunity/summary", query, callback);
};

/**
 * Returns a list of hour moderation summaries by user for a community.
 * https://staging-api.noblehour.com/swagger-ui/#/noblehour/get_nh_communities__id__moderation_hours_by_user_summary
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.userHoursSummary = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_user/summary", query, callback);
};

/**
 * Returns a list of hours moderations for a user at a community.
 * https://staging-api.noblehour.com/swagger-ui/#/noblehour/get_nh_communities__id__moderation_hours_by_user__user_id_
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.userHours = function(userID, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_user/" + userID, callback);
};

/**
 * Returns a list of hours moderations for a group at a community.
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.groupHours = function(groupID, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_group/" + groupID, callback);
};

/**
 * Returns a list of hours moderations for a opportunity at a community.
 *
 * @param {Function} callback
 * @returns {Moderation}
 */
NH_Community.prototype.opportunityHours = function(oppID, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("moderation/hours/by_opportunity/" + oppID, callback);
};


// single export
module.exports = NH_Community;
