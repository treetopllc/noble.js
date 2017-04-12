var Portal = require("./Collaboratory/Portal");
var User = require("./Collaboratory/User");

// index for collaboratory specific endpoints, located under graph/Collaboratory
module.exports = Collaboratory;

function Collaboratory(client, id) {
    return {
        portal: new Portal(client, id),
        user: function (id) {
            return new User(client, id);
        }
    };
}