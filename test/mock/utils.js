
exports.error = function (msg, desc, status) {
    var err = new Error(msg);
    err.description = desc;
    err.status = status;
    return err;
};

exports.array = function (size, fn) {
    return Array.apply(null, Array(size)).map(fn);
};
