var Class = require("./Collaboratory/Class");
var Course = require("./Collaboratory/Course");
var Portal = require("./Collaboratory/Portal");
var User = require("./Collaboratory/User");

// index for collaboratory specific endpoints, located under graph/Collaboratory
module.exports = Collaboratory;

function Collaboratory(client) {
    return {
        class: function (id) {
            return new Class(client, id);
        },
        course: function (id) {
            return new Course(client, id);
        },
        portal: function (id) {
            return new Portal(client, id)
        },
        user: function (id) {
            return new User(client, id);
        }
    };
}
