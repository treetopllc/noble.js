try {
    module.exports = require("./lib");
} catch (e) {
    if (window.console) {
        console.warn(e.message);
    }

    module.exports = require("./lib-cov");
}
