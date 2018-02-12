// Product specific endpoint live inside these graph/PROD folders

// dependencies
var Vertex = require("../Vertex");
var utils = require("../../utils");

// single export
module.exports = COL_Portal;

/**
 * Represents a user vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function COL_Portal(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(COL_Portal);


// @todo: once the collaborators endpoint changes its namespace to /col/, we can collapse the
// method(s) under graph/Portal into this file, and have all of them have the same base (col/portals)
// note: this will require an update to the client (api.portal -> api.collab.portal)

// override for Vertex#base
COL_Portal.prototype.base = "col/portals";


/**
 * Retrieves a list of entities: Activities, Units, UserRels, Orgs etc.
 *
 * @param {Object} [query]
 * @param {Function} callback
 */

 /**
 * Available query params:
 * types              {Array}
 * group_types        {Array}
 * organization_types {Array}
 * relationship_types {Array}
 * terms              {String}
 * limit              {Number}
 * offset             {Boolean}
 * orderby            {String}
 * orderdir           {String}
 * archived           {Boolean}
 * deleted            {Boolean}
 * include_floaters   {Boolean} include facstaff who are not associated with activities in the portal
 */
COL_Portal.prototype.collaborators = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("collaborators", query, callback);
};


/**
 * Portal collaborators endpoint that fetches collaborators for a specific activity by its ID
 *
 * @param {String} *id
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.activityCollaborators = function(id, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("activities/" + id + "/collaborators", query, callback);
}


/**
 * Get Portal resource
 *
 * Resource examples
 * content -> col/portals/{portal_id}/content
 * activity -> col/portals/{portal_id}/activities
 *
 * Wrap this generic method by a promise in api-helpers.
 * e.g. activityHelpers.getActivity -> GET col/portals/{portal_id}/activities
 *
 * @param {String} resource
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.get = function (resource, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related(resource, query, callback);
};


/**
 * Post to Portal resource
 *
 * Resource examples
 * content -> col/portals/{portal_id}/content
 * activity -> col/portals/{portal_id}/activities
 *
 * Wrap this generic method by a promise in api-helpers.
 * e.g. activityHelpers.createActivity -> POST col/portals/{portal_id}/activities
 *
 * @param {String} resource
 * @param {Object} data
 * @param {Function} callback
 */
COL_Portal.prototype.post = function (resource, data, callback) {
    var self = this;
    return self.client.request("post", self.uri(resource))
        .send(data)
        .end(utils.easy(function (err, data, res) {
            if (err) return callback(err);
            if (data && data.id) {
                self.id = data.id;
            }
            callback(null, data, res);
        }));
};
