exports.easy = function (callback) {
    return function (err, res) {
        if (err) {
            callback(err, res);
        } else if (res.error) {
            res.error.body = res.body;
            callback(res.error, res.body, res);
        } else {
            callback(null, res.body, res);
        }
    };
};
