# noble.js

NobleHour API Client library for browser-based applications. Distrubuted as a
[Component.js](https://github.com/component/component) component.

## Installation

    $ component install treetopllc/noble.js

## Basic Usage

````javascript
var NobleHour = require("noble.js"),
    nh = new NobleHour("api url", "client id", "client secret");

// logging into the API as a NobleHour user is required for most operations
// once you login via the API client, it will include your authentication
// details with subsequent requests.
nh.login("username/email", "password", function (err, auth) {
    if (err) {
        console.error("Error encountered during login:", err);
    } else {
        console.log("Successfully logged in as:", auth);
    }
});
````

## Dependencies

 * [Node.js / NPM](http://nodejs.org/)
 * [GNU Make](http://www.gnu.org/software/make/)

## Developers

 * Build: `make`
 * Clean Built Files: `make clean`

Tests cannot be run via the CLI at this time. (some weirdness with PhantomJS and
Cross-Domain Requests) The test runner is available via the browser though, so
start up a web server (the [http-server](https://github.com/nodeapps/http-server)
module is a good example) in the root directory:

    $ http-server -p 3000 /path/to/noble.js

Then, via [http://localhost:3000/test/test.html](http://localhost:3000/test/test.html)
you will get the test runner.
