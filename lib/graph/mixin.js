var each = require("each");

each({
    "asset":        "Asset",
    "community":    "Community",
    "customer":     "Customer",
    "event":        "Event",
    "group":        "Group",
    "news":         "News",
    "opportunity":  "Opportunity",
    "organization": "Organization",
    "resource":     "Resource",
    "submission":   "Submission",
    "url":          "Url",
    "user":         "User",
    "vertex":       "Vertex"
}, function (method, name) {
    var Constructor = require("./" + name);

    exports[name] = Constructor;
    exports[method] = function (id) {
        return new Constructor(this, id);
    };
});
