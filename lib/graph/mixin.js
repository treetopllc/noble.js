var each = require("each");

each({
    "alert":        "Alert",
    "asset":        "Asset",
    "community":    "Community",
    "customer":     "Customer",
    "event":        "Event",
    "group":        "Group",
    "hours":        "Hours",
    "news":         "News",
    "moderation":   "Moderation",
    "opportunity":  "Opportunity",
    "organization": "Organization",
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
