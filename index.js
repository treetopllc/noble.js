try {
    module.exports = require("./lib");
} catch (e) {
    if (window.console) {
        console.warn(e.stack);
    }

    module.exports = require("./lib-cov");
}
