var User = require("./Noblehour/User");

// index for noblehour specific endpoints, located under graph/Noblehour
module.exports = Noblehour;

function Noblehour(client, id) {
    return {
        User: new User(client, id)
    };
}