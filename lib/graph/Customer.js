// dependencies
var Vertex = require("./Vertex");

/**
 * Represents a customer vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Customer(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Customer);


// override for Vertex#base
Customer.prototype.base = "customers";


// single export
module.exports = Customer;
