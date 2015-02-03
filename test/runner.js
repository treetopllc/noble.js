// exposes window.mocha + other test globals (describe, it, before, etc)
require("mocha");

mocha.setup("bdd");
mocha.slow(150);

require("./lib/Client");
require("./lib/archive");
require("./lib/sso");
require("./lib/search");
require("./lib/participation");
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
require("./lib/graph/Project");
require("./lib/graph/Submission");
require("./lib/graph/Url");
require("./lib/graph/User");

(window.mochaPhantomJS || mocha).run();
