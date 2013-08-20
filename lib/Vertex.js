var utils = require("./utils");

module.exports = Vertex;

function Vertex(client, id) {
    this.client = client;
    this.id = id;
}

Vertex.prototype.get = function (callback) {
    return this.client.request("graph/" + this.id)
        .end(utils.easy(callback));
};

Vertex.prototype.related = function (type, query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.client.request([ "graph", this.id, type ])
        .query(query)
        .end(utils.easy(callback));
};
