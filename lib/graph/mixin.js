var each = require("each");

each({
    "community":    "Community",
    "event":        "Event",
    "news":         "News",
    "opportunity":  "Opportunity",
    "organization": "Organization",
    "resource":     "Resource",
    "submission":   "Submission",
    "user":         "User",
    "vertex":       "Vertex"
}, function (method, name) {
    var Constructor = require("./" + name);

    exports[name] = Constructor;
    exports[method] = function (id) {
        return new Constructor(this, id);
    };
});
