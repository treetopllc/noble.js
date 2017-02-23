// dependencies
 var Vertex = require("./Vertex");
var utils = require("../utils");

 /**
  * Represents an organization vertex
  *
  * @constructor
  * @param {Client} client  The API client object (passed around internally)
  * @param {String} id      UUID
  */
 function Organization(client, id) {
     Vertex.call(this, client, id);
 }


 // inheritance
 Vertex.extend(Organization);


 // override for Vertex#base
 Organization.prototype.base = "organizations";


 /**
  * Retrieves a list of submitted content for an organization that has been approved.
  *
  * Available `query` params:
  *  - types {String}         Comma-separated list of vertex_type_id
  *  - terms {String}         Keyword search terms
  *  - featured {Boolean}     Only include currently featured content
  *  - featured_since {Date}  Datetime for which content must be featured (implies `featured`)
  *  - limit {Number}         Maximum number of results to return (default: 100)
  *  - offset {Number}        Offset of results to return (default: 0)
  *
  * @param {Object} [query]
  * @param {Function} callback
  * @returns {superagent.Request}
  */
 Organization.prototype.content = function (query, callback) {
     if (typeof query === "function") {
         callback = query;
         query = null;
     }

     return this.related("content", query, callback);
 };

 /**
  * Retrieves participation information for an entire organization
  *
  * @param {String} [key]       Subset of data to retrieve (eg: "impact")
  * @param {Function} callback
  * @returns {superagent.Request}
  */
 Organization.prototype.participation = function (key, callback) {
     if (typeof key === "function") {
         callback = key;
         key = null;
     }

     var url = "participation";
     if (key) url += "/" + key;

     return this.related(url, callback);
 };


  /**
   * Encompasses submissions to/from as well as invites to/from an organization
   *
   * Available `query` params:
   *  - limit {Number}   Maximum number of results to return (default: 100)
   *  - offset {Number}  Offset of results to return (default: 0)
   *
   * @param {Object} [query]
   * @param {Function} callback
   * @returns {superagent.Request}
   */
  Organization.prototype.track = function (query, callback) {
      if (typeof query === "function") {
          callback = query;
          query = null;
      }

      return this.related("track", query, callback);
  };


 /**
  * Retrieves a list of all submissions for the organization
  *
  * Available `query` params:
  *  - types {String}   Comma-separated list of vertex_type_id
  *  - limit {Number}   Maximum number of results to return (default: 100)
  *  - offset {Number}  Offset of results to return (default: 0)
  *
  * @param {Object} [query]
  * @param {Function} callback
  * @returns {superagent.Request}
  */
 Organization.prototype.submissions = function (query, callback) {
     if (typeof query === "function") {
         callback = query;
         query = null;
     }

     return this.related("submissions", query, callback);
 };


 /**
  * Creates a user object for this organization
  *
  * @param {String} [id]  Optional ID for the user
  * @returns {User}
  */
 Organization.prototype.user = function (id) {
     return this.client.user(id).belongsTo(this);
 };


  /**
   * Retrieves a list of all users for the organization
   *
   * Available `query` params:
  *  - terms {String}   search terms
  *  - limit {Number}   Maximum number of results to return (default: 100)
  *  - offset {Number}  Offset of results to return (default: 0)
   *
   * @param {Object} [query]
   * @param {Function} callback
   * @returns {superagent.Request}
   */
  Organization.prototype.users = function (query, callback) {
      if (typeof query === "function") {
          callback = query;
          query = null;
      }

      return this.related("users", query, callback);
  };


  /**
   * Retrieves a list of all relationships for the organization
   *
   * Available `query` params:
  *  - terms {String}   search terms
  *  - limit {Number}   Maximum number of results to return (default: 100)
  *  - offset {Number}  Offset of results to return (default: 0)
   *
   * @param {Object} [query]
   * @param {Function} callback
   * @returns {superagent.Request}
   */
  Organization.prototype.relationships = function (query, callback) {
      if (typeof query === "function") {
          callback = query;
          query = null;
      }

      return this.related("relationships", query, callback);
  };


  /**
   * Create a submission object for this organization
   *
   * @param {String} [id]  Optional ID for the submission
   * @returns {Submission}
   */
  Organization.prototype.submission = function (id) {
      return this.client.submission(id).belongsTo(this);
  };



 /**
  * Retrieves a list of submissions for that this organization needs to "moderate"
  *
  * Available `query` options:
  *  - limit {Number}
  *  - offset {Number}
  *
  * @param {Object} [query]
  * @param {Function} callback
  */
 Organization.prototype.moderations = function (query, callback) {
     if (typeof query === "function") {
         callback = query;
         query = null;
     }

     return this.related("moderations", query, callback);
 };


 /**
  * Create a moderation object for this organization
  *
  * @param {String} [id]  Optional ID for the moderation
  * @returns {Moderation}
  */
 Organization.prototype.moderation = function (id) {
     return this.client.moderation(id).belongsTo(this);
 };

  /**
   * Retrieves a list of affiliations for this
   *
   * Available `query` options:
   *  - limit {Number}
   *  - offset {Number}
   *
   * @param {Object} [query]
   * @param {Function} callback
   */
  Organization.prototype.affiliations = function (query, callback) {
      if (typeof query === "function") {
          callback = query;
          query = null;
      }

      return this.related("affiliations", query, callback);
  };


/**
 * Retrieves an organization's public (approved) activities
 *
 * Available `query` options:
 *  - id            {String}
 *  - author_id     {String}
 *  - approved_only {Boolean}
 *  - subtypes      {Array:Number}
 *    Pagination:
 *  - offset        {Number}
 *  - limit         {Number}
 *  - orderby       {String} // desc, asc
 *  - orderdir      {String} // vertex column name
 *  - archived      {Boolean} // true, false, both
 *  - deleted       {Boolean} // true, false, both
 *
 * @param params
 * @param {Function} callback
 */
Organization.prototype.publicActivities = function(params, callback) {
    return this.client.request("get", this.uri() + "/activities/public")
        .send(params)
        .end(utils.easy(callback));
};


  /**
   * Create a affiliation object for this organization
   *
   * @param {String} [id]  Optional ID for the moderation
   * @returns {Moderation}
   */
  Organization.prototype.affiliation = function (id) {
      return this.client.affiliation(id).belongsTo(this);
  };


  /**
  * Retrieves a list of programs for this organization
  *
  * Available `query` options:
  *  - limit {Number}
  *  - offset {Number}
  *  - terms {String}       Keyword search terms
  *  - archived {Boolean}   Whether or not to include archived programs
  *  - deleted {Boolean}    Whether or not to include deleted program
  *
  * @param {Object} [query]
  * @param {Function} callback
  */
 Organization.prototype.programs = function (query, callback) {
     if (typeof query === "function") {
         callback = query;
         query = null;
     }

     return this.related("programs", query, callback);
 };


 /**
  * Create a program object for this organization
  *
  * @param {String} [id]  Optional ID for the program
  * @returns {Program}
  */
 Organization.prototype.program = function (id) {
     return this.client.program(id).belongsTo(this);
 };


 /**
  * Retrieves a list of groups for this organization
  *
  * Available `query` options:
  *  - limit {Number}
  *  - offset {Number}
  *
  * @param {Object} [query]
  * @param {Function} callback
  */
 Organization.prototype.groups = function (query, callback) {
     if (typeof query === "function") {
         callback = query;
         query = null;
     }

     return this.related("groups", query, callback);
 };

 /**
  * Create a group object for this organization
  *
  * @param {String} [id]  Optional ID for the group
  * @returns {Group}
  */
 Organization.prototype.group = function (id) {
     return this.client.group(id).belongsTo(this);
 };

 /**
 * Retrieve partner reports information for this organization
 *
 * @param {Function} callback
 */
 Organization.prototype.reportPartners = function (callback) {
    return this.related("report/partners", callback);
};

/**
 * Retrieves a list of an organizations's destinations hours
 *
 * Available `query` options:
 * - opportunities {String|Array}
 * - opportunities {String|Array}
 * - hosts         {String|Array}
 * - contributors  {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.destinations = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/destinations", query, callback);
};

/**
 * Retrieves a list of an organizations's opportunities hours
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - hosts         {String|Array}
 * - contributors  {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.opportunities = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/opportunities", query, callback);
};

/**
 * Retrieves a list of an organizations's hosts hours
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - opportunities {String|Array}
 * - contributors  {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.hosts = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/hosts", query, callback);
};

/**
 * Retrieves a list of an organizations's statuses
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - opportunities {String|Array}
 * - hosts         {String|Array}
 * - contributors  {String|Array}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.statuses = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/statuses", query, callback);
};

/**
 * Retrieves a list of an organizations's contributors
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - opportunities {String|Array}
 * - hosts         {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.contributors = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/contributors", query, callback);
};


/**
 * Retrieves a list of an organizations's members' hours
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - opportunities {String|Array}
 * - hosts         {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.membersdetails = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/membersdetails", query, callback);
};


/**
 * Retrieves a list of an organizations's groups' hours
 *
 * Available `query` options:
 * - destinations  {String|Array}
 * - opportunities {String|Array}
 * - hosts         {String|Array}
 * - statuses      {Array:int}
 * - start         {Date}
 * - end           {Date}
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.groupsdetails = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("hours/groupsdetails", query, callback);
};

// single export
module.exports = Organization;
