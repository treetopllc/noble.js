var User = require("./Noblehour/User");

// index for noblehour specific endpoints, located under graph/Noblehour
module.exports = Noblehour;

// todo: return a scope to user and drop the second arg from the wrapper (only needs client). See Collaboratory.js for details.
// deferring this since this change will need a client update.
function Noblehour(client, id) {
    return {
        User: function (id) {
            return new User(client, id)

        }
    };
}