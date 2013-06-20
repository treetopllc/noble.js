exports.error = function (res) {
    res.error.message = res.body.error_description;
    return res.error;
}

exports.easy = function (callback) {
    return function (err, res) {
       if (err) return callback(err);
       else if (res.error) return callback(error(res));

       callback(null, res.body, res);
    };
}
