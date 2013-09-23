var each = require("each"),
    isodate = require("isodate");

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

exports.parseDate = isodate.parse;

exports.parseDates = function (data, fields) {
    each(fields, function (prop) {
        if (data[prop]) {
            data[prop] = exports.parseDate(data[prop]);
        }
    });

    return data;
};

exports.parseDatesInCollection = function (list, fields) {
    each(list, function (row) {
        exports.parseDates(row, fields);
    });

    return list;
};
