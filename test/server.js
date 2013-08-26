var path = require("path"),
    express = require("express"),
    proxy = require("simple-http-proxy"),
    app = module.exports = express(),
    root = path.resolve(__dirname, ".."),
    port = process.env.PORT,
    config = require("./api.json");

app.use(express.directory(root, { icons: true }));
app.use(express.static(root));

if (config.proxy_url) {
    app.use(config.proxy_url, proxy(config.api_url + "/"));
}

app.listen(port, function () {
    console.log("noble.js test server listening on port", port);
    console.log("run tests at http://localhost:%d/test/runner.html", port);
});
