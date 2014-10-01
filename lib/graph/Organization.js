// dependencies
 var Vertex = require("./Vertex");

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


 // single export
 module.exports = Organization;
