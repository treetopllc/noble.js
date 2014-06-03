var reference = require("./reference");

exports.easy = function (callback) {
    return function (err, res) {
        if (err) {
            callback(err);
        } else if (res.error) {
            res.error.body = res.body;
            callback(res.error, res.body, res);
        } else {
            callback(null, res.body, res);
        }
    };
};

/**
 * Translate an "id" field to a corresponding "name" field on an object
 *
 * Example:
 *
 * var o = {
 *   submission_type_id: 10
 * };
 *
 * utils.translate(o, "vertex_types", "submission_type_id", "submission_type");
 *
 * {
 *   submission_type_id: 10,
 *   submission_type: "Hours"
 * }
 *
 * @api private
 * @param {Object} input
 * @param {String} type   Key on the `reference` object/index
 * @param {String} from   Field to pull input value from
 * @param {String} [to]   Field to deposit output value
 *                        (default is to strip "_id" off the from value)
 * @returns {Object}
 */
exports.translate = function (input, type, from, to) {
    if (!to) {
        to = from.replace(/_id$/, "");
    }

    if (input && type in reference && from in input && !(to in input)) {
        var ref = reference[type];
        var fromVal = input[from];
        var toVal = input[to] = ref.by_id[fromVal];
    }

    return input;
};
