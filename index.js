try {
    module.exports = require("./lib");
} catch (e) {
    module.exports = require("./lib-cov");
}
