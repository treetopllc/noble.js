var generate = require("../lib/generator");
var utils = require("../utils");

exports.get = function (req, res) {
    res.json(generate.user({
        id: req.params.id
    }));
};

exports.authored = function (req, res) {
    var count = generate.chance.integer({ min: 0, max: 100 });
    res.json(utils.array(count, generate.result));
};

exports.feed = function (req, res) {
    var count = generate.chance.integer({ min: 0, max: 100 });
    res.json(utils.array(count, generate.userFeed));
};

exports.network = function (req, res) {
    var count = generate.chance.integer({ min: 0, max: 100 });
    res.json(utils.array(count, generate.result));
};

exports.role = function (req, res) {
    res.json(generate.userRole({
        id: req.params.user_id,
        vertex_id: req.query["for"]
    }));
};

exports.submissions = function (req, res) {
    var count = generate.chance.integer({ min: 0, max: 100 });
    res.json(utils.array(count, generate.userSubmission));
};
