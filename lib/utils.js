var reference = require("./reference");

exports.error = function (res) {
    if (res.body && res.body.error_description) {
        res.error.message = res.body.error_description;
    }
    return res.error;
};

exports.easy = function (callback) {
    return function (err, res) {
        if (err) return callback(err);
        else if (res.error) return callback(exports.error(res));

        callback(null, res.body, res);
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
    if (!to) to = from.replace(/_id$/, "");

    if (type in reference && from in input && !(to in input)) {
        input[to] = reference[type].by_id[input[from]];
    }

    return input;
};
