var generate = require("../lib/generator");

exports.get = function (req, res) {
    res.json(generate.vertex(req.params.id));
};
