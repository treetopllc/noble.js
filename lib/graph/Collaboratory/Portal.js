// Product specific endpoint live inside these graph/PROD folders

// dependencies
var Vertex = require("../Vertex");
var utils = require("../../utils");

// single export
module.exports = COL_Portal;

/**
 * Represents a portal vertex
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
 * Get prospective collaborators
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.prospectiveCollaborators = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("prospective_collaborators", query, callback);
}


/**
 * List a portal's content, for portal administrators to browse
 * Swagger: https://staging-api.noblehour.com/swagger-ui/#/collaboratory/get_col_portals__portal_id__internal_content
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.internalContent = function(query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("internal_content", query, callback);
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
            if (err) return callback(err, data);
            if (data && data.id) {
                self.id = data.id;
            }
            callback(null, data, res);
        }));
};

/**
 * GET Portal Search
 *
 * List a portal's collaborators. No floaters or unpublished collaborators.
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.search = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("search", query, callback);
};

/**
 * Retrieves a list courses within a portal
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.courses = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related('courses', query, callback);
};


/**
 * Get collaborators associated with a given entity
 *
 * @param {String} *id
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.entityCollaborators = function(entity, id, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("collaborators/" + entity + "/" + id, query, callback);
}


/**
 * Get internal collaborators for a portal entity
 *
 * @param {String} id
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.internalEntityCollaborators = function(entity, id, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("collaborators/" + entity + "/internal_content/" + id, query, callback);
}


/**
 * Retrieves a list all course prefixes for a portal
 *
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.coursePrefixes = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related('course_prefixes', query, callback);
};


/**
 * Create a unit within the portal
 *
 * @param {Object} data
 * @param {Function} callback
 */
COL_Portal.prototype.units = function (data, callback) {
    return this.client.request("post", this.uri() + "/units")
    .send(data)
    .end(utils.easy(callback));
};


/**
 * List activities partnered with :unit_id or any of the units that report to it,
 * with information about how the activity is related. Results are not sorted or paginated.
 *
 * @param {String} *id
 * @param {Object} query
 * @param {Function} callback
 */
COL_Portal.prototype.unitActivities = function(id, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("units/" + id + "/related_activities", query, callback);
}
