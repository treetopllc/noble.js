// global variables
var api = require("noble.js");
var each = require("each");
var async = require("async");
var expect = require("expect.js");
var request = require("superagent");
var Request = request.Request;
var client = createClient();


before(function (done) {
    client.login("testuser", "123456", done);
});


// global helper functions

/**
 * ignore errors that we trigger (like aborting a request)
 */
function ignore(callback) {
    return function () {
        callback();
    };
}

/**
 * Empty function
 */
function noop() {}

/**
 * creates new client instances quickly
 */
function createClient() {
    return api("/api", "test", "AbCfk3F1234##%!");
}
