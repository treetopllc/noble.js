try {
    module.exports = require("./lib");
} catch (e) {
    if (window.console) console.warn(e.stack);
    if (!e.require) throw e;

    module.exports = require("./lib-cov");
}
