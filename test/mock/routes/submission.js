var generate = require("../lib/generator");
var utils = require("../utils");

exports.get = function (req, res) {
    res.json(generate.submission({
        id: req.params.id
    }));
};

exports.history = function (req, res) {
    var count = generate.chance.integer({ min: 1, max: 20 });
    res.json(utils.array(count, generate.submissionHistory));
};
