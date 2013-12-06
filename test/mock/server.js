var express = require("express");
var app = module.exports = express();

app.use(express.json());

var routes = require("./routes");
app.get("/", routes.index);
app.post("/oauth/token", routes.auth.login);
//app.get("/oauth/revoke", routes.auth.logout);
app.get("/search", routes.search);
app.get("/vertices/:id", routes.vertex.get);
app.get("/users/:id", routes.user.get);
app.get("/users/:id/authored", routes.user.authored);
app.get("/users/:id/feed", routes.user.feed);
app.get("/users/:id/network", routes.user.network);
app.get("/users/:id/role", routes.user.role);
app.get("/users/:id/submissions", routes.user.submissions);
app.get("/submissions/:id", routes.submission.get);
app.get("/submissions/:id/history", routes.submission.history);

app.use(function (err, req, res, next) {
    console.error(err.stack);

    if (err.status) {
        res.status(err.status);
    }

    res.json({
        error: err.message,
        error_description: err.description
    });
});
