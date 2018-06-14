var Community = require("./Noblehour/Community");
var User = require("./Noblehour/User");

// index for noblehour specific endpoints, located under graph/Noblehour
module.exports = Noblehour;

function Noblehour(client, id) {
    return {
        community: function (id) {
            return new Community(client, id)
        },
        user: function (id) {
            return new User(client, id)
        }
    };
}
