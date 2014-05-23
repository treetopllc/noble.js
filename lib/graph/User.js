// dependencies
var each = require("each");
var toIso = require("to-iso-string");
var utils = require("../utils");
var Vertex = require("./Vertex");
var Alert = require("./Alert");
var translate = utils.translate;
var debug = require("debug")("noble.js:graph:user");


// single export
module.exports = User;


/**
 * Represents a user vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function User(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(User);


// override for Vertex#base
User.prototype.base = "users";


/**
 * Retrieves a list of submissions for that this user has "authored"
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - statuses {Array:Number}  Each item is a status type
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.submissions = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    debug("retrieving user submissions", this);
    if (query) debug("query", query);

    return this.related("submissions", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "edge_types", "edge_type_id");
            if (row.content) {
                translate(row.content, "vertex_types", "vertex_type_id");
            }
            if (row.destination) {
                translate(row.destination, "vertex_types", "vertex_type_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Create a submission object for this user
 *
 * @param {String} [id]  Optional ID for the submission
 * @returns {Submission}
 */
User.prototype.submission = function (id) {
    debug("creating a user submission object", this, id);
    return this.client.submission(id).belongsTo(this);
};


/**
 * Retrieves a list of submissions for that this user needs to "moderate"
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.moderations = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    debug("retrieving user moderations", this);
    if (query) debug("query", query);

    return this.related("moderations", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "edge_types", "edge_type_id");
            if (row.content) {
                translate(row.content, "vertex_types", "vertex_type_id");
            }
            if (row.destination) {
                translate(row.destination, "vertex_types", "vertex_type_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Create a moderation object for this user
 *
 * @param {String} [id]  Optional ID for the moderation
 * @returns {Moderation}
 */
User.prototype.moderation = function (id) {
    debug("creating a user moderation object", this, id);
    return this.client.moderation(id).belongsTo(this);
};


/**
 * Retrieve a list of content that this user has authored
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - types {Array:Number}  Each item is a vertex type
 *
 * @param {Object} [query]     Additional QueryString Parameters
 * @param {Function} callback
 */
User.prototype.authored = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    debug("retrieving user authored entities", this);
    if (query) debug("query", query);

    return this.related("authored", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "vertex_type_id");
            if (row.vertex_type && row.subtype_id) {
                var type = row.vertex_type.toLowerCase();
                translate(row, type + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a list of content created by member's of this user's network
 *
 * Available `query` options:
 *  - depth {Number}   Depth to traverse in graph query
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.feed = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    debug("retrieving user feed", this);
    if (query) debug("query", query);

    return this.related("feed", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "vertex_type_id");
            if (row.vertex_type && row.subtype_id) {
                var type = row.vertex_type.toLowerCase();
                translate(row, type + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a list of entities that this user is a part of
 *
 * Available `query` options:
 *  - depth {Number}   Depth to traverse in graph query
 *  - limit {Number}
 *  - offset {Number}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.network = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    debug("retrieving user network entities", this);
    if (query) debug("query", query);

    return this.related("network", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "vertex_type_id");
            if (row.vertex_type && row.subtype_id) {
                var type = row.vertex_type.toLowerCase();
                translate(row, type + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};


/**
 * Retrieve a user's role relative to an entity.
 *
 * If entity not supplied, the role retrieved will be a "global" role. In other
 * words, it will be in relation to the "NobleHour" main vertex
 *
 * @param {String} [entity]    Entity ID to retrieve role for
 * @param {Function} callback
 */
User.prototype.role = function (entity, callback) {
    if (typeof entity === "function") {
        callback = entity;
        entity = null;
    }

    debug("retrieving user role", this);
    if (entity) debug("for", entity);

    return this.related("role", entity ? { "for": entity } : null, callback);
};


/**
 * Create a new Alert object for this user
 *
 * @param {String} id
 * @returns {Alert}
 */
User.prototype.alert = function (id) {
    debug("creating user alert object", this, id);
    return (new Alert(this.client, id)).belongsTo(this);
};


/**
 * Retrieve a user's alerts
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
User.prototype.alerts = function (query, callback) {
    debug("retrieving user alerts", this);
    if (query) debug("query", query);
    return this.related("alerts", query, callback);
};


/**
 * Retrieve the statistics for this user's "mailbox"
 *
 * @param {Function} callback
 */
User.prototype.alertsStats = function (callback) {
    debug("retrieving user alerts stats", this);
    return this.related("alerts/stats", callback);
};


/**
 * Retrieve stats for a user's participation in the noblehour network (or a
 * particular community/entity)
 *
 * @param {String} [key]       Subset of participation to query for (eg: "impact")
 * @param {String} [entity]    Entity ID to return stats for
 * @param {Function} callback
 */
User.prototype.participation = function (key, entity, callback) {
    // when only 1 argument, ignore both others
    if (typeof key === "function") {
        callback = key;
        entity = null;
        key = null;
    }

    // when only 2 arguments, ignore entity
    if (typeof entity === "function") {
        callback = entity;
        entity = null;
    }

    var url = "participation";
    if (key) url += "/" + key;

    var query = entity ? { "for": entity } : null;

    return this.related(url, query, callback);
};


/**
 * Author (create) a new vertex as this user
 *
 * Types that are able to be added:
 *  - hours
 *  - news
 *  - event
 *  - opportunity
 *  - asset
 *  - url
 *
 * (Other types will technically work, but these are the ones our interface
 * currently operates with.)
 *
 * @param {String} type         See ./mixin.js
 * @param {Object} params
 * @param {Function} callback
 */
User.prototype.author = function (type, params, callback) {
    debug("creating (authoring) a new entity as user", this);

    if (!(type in this.client)) {
        throw new Error("vertex type " + type + " does not exist");
    }

    var vertex = this.client[type](null).belongsTo(this);

    if (!(vertex instanceof Vertex)) {
        throw new Error("cannot author a non-vertex");
    }

    debug("vertex", vertex);

    date2iso(params);

    debug("params", params);

    return vertex.create(params, callback);
};


// alias
User.prototype.add = User.prototype.author;


/**
 * Contribute existing content to another entity (eg: create a submission)
 *
 * @param {Object} params
 * @param {Function} callback
 */
User.prototype.contribute = function (params, callback) {
    debug("contributing content to another entity as user", this);
    debug("params", params);
    return this.author("submission", params, callback);
};


/**
 * Marks an entity as one of this user's favorites
 *
 * @param {String} entity
 * @param {Function} callback
 */
User.prototype.favorite = function (entity, callback) {
    debug("marking entity as user favorite", entity, this);
    return this.client.request("put", this.uri([ "favorites", entity ]))
        .end(utils.easy(callback));
};


/**
 * Removes an entity from the user's favorites
 *
 * @param {String} entity
 * @param {Function} callback
 */
User.prototype.unfavorite = function (entity, callback) {
    debug("remove entity from user favorites", entity, this);
    return this.client.request("del", this.uri([ "favorites", entity ]))
        .end(utils.easy(callback));
};


// private helpers

/**
 * Traverse an input object and convert any Date objects into ISO-8601 strings
 *
 * @param {Object} input
 * @returns {Object}
 */
function date2iso(input) {
    if (typeof input !== "object") return input;

    each(input, function (key, val) {
        if (val instanceof Date) {
            input[key] = toIso(val);
        }
    });

    return input;
}
