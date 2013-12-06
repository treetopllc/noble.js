var utils = require("../utils");
var generate = require("../lib/generator");
var count = generate.chance.integer({ min: 500, max: 1000 });
var entities = utils.array(count, generate.result);

module.exports = function (req, res) {
    var query = req.query;
    var limit = parseInt(query.limit, 10) || 100;
    var offset = parseInt(query.offset, 10) || 0;
    var terms = new RegExp(query.terms, "i");
    var types = query.types ? query.types.split(",").map(Number) : [];
    var start = Date.now();

    var list = entities;

    if (types.length) {
        list = entities.filter(function (row) {
            return types.indexOf(row.vertex_type_id) > -1;
        });
    }

    if (req.query.terms) {
        list = list.filter(function (row) {
            return row.name.match(terms) || row.description.match(terms);
        });
    }

    res.json({
        qtime: Date.now() - start,
        results: list.slice(offset, offset + limit)
    });
};
