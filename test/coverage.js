/**
 * NOTICE:
 *
 * Coverage testing is not working at this time,
 * [yields/coverage](http://github.com/yields/coverage)
 * needs to be updated to use component v1 (since it is using the
 * old require implementation to instrument the source files)
 */

var cov = require("coverage")("noble.js");

// exposes window.mocha + other test globals (describe, it, before, etc)
require("mocha");

mocha.setup("bdd");
mocha.slow(150);

require("./lib/Client");
require("./lib/search");
require("./lib/graph/mixin");
require("./lib/graph/Vertex");
require("./lib/graph/Alert");
require("./lib/graph/Asset");
require("./lib/graph/Community");
require("./lib/graph/Customer");
require("./lib/graph/Event");
require("./lib/graph/Group");
require("./lib/graph/Hours");
require("./lib/graph/HoursSet");
require("./lib/graph/Moderation");
require("./lib/graph/News");
require("./lib/graph/Opportunity");
require("./lib/graph/Organization");
require("./lib/graph/Submission");
require("./lib/graph/Url");
require("./lib/graph/User");

(window.mochaPhantomJS || mocha).run(function () {
    cov.render();
});
