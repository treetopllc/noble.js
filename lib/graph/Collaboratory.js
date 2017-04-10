var Portal = require("./Collaboratory/Portal");

// index for collaboratory specific endpoints, located under graph/Collaboratory
module.exports = Collaboratory;

function Collaboratory(client, id) {
    return {
        portal: new Portal(client, id)
    };
}