var path = require("path");
var express = require("express");
var app = module.exports = express();
var port = process.env.PORT || 3000;

app.use(express.logger("dev"));
app.use("/build", require("component-serve")({
    root: path.resolve(__dirname, "..")
}));
app.use("/test", express.static(__dirname));
app.use("/test", express.directory(__dirname));

app.listen(port, function () {
    console.log("noble.js test server listening on port", port);
    console.log();
    console.log("mock api running at http://localhost:%d/api", port);
    console.log("run tests at http://localhost:%d/test/runner.html", port);
});
