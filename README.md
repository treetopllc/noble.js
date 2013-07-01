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

## Development Dependencies (installed automatically)

 * [mocha](http://visionmedia.github.io/mocha/)
 * [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs)
 * [PhantomJS](http://phantomjs.org/)
 * [expect.js](https://github.com/LearnBoost/expect.js) (to be replaced with [Chai](http://chaijs.com/))

## Developers

 * Build: `make`
 * Run Tests: `make test`
 * Start Development Server: `make server`
 * Stop Development Server: `make killserver`
 * Clean Built Files: `make clean`
