var path = require("path"),
    express = require("express"),
    proxy = require("simple-http-proxy"),
    app = module.exports = express(),
    root = path.resolve(__dirname, ".."),
    port = process.env.PORT || 3000,
    config = require("./api.json");

app.use("/build", require("component-serve")({ root: root }));

app.use(express.static(root));
app.use(express.directory(root));

if (config.proxy_url) {
    app.use(config.proxy_url, proxy(config.api_url + "/"));
}

app.listen(port, function () {
    console.log("noble.js test server listening on port", port);
    console.log("run tests at http://localhost:%d/test/runner.html", port);
});
