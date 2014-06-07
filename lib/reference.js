var constant = require("to-constant-case");
var each = require("each");

exports.edge_types = index({
    0:  "Parent",
    1:  "Content",
    2:  "Admin",
    3:  "Moderator",
    4:  "Contributor",
    5:  "Citizen",
    6:  "Follower",
    7:  "Like",
    //8:  "Author",
    9:  "Verifier",
    10: "Submission",
    11: "Hours",
    12: "Change",
    //13: "Location",
    14: "Email"
});

exports.event_types = index([
    "Celebration",
    "Culinary Arts",
    "Demonstrations",
    "Discussions",
    "Educational",
    "Family",
    "Films",
    "Fundraising",
    "Just for Fun",
    "Lecture",
    "Performance",
    "Workshop",
    "(Other)",
    "Conferences"
]);

exports.group_types = index([
    "Volunteer",
    "Service Learning",
    "On-the-Job Training"
]);

exports.opportunity_types = index([
    "Internship",
    "Paying Job",
    "Volunteer Service",
    "Mentoring",
    "Tutoring",
    "Service Learning",
    "Performance"
]);

exports.organization_types = index([
    "Community",
    "Education",
    "Business",
    "Non-Profit",
    "Municipal",
    "Civic",
    "Greek",
    "Citizen"
]);

exports.roles = index({
    1: "Noblehour Admin",
    2: "Admin",
    3: "Moderator",
    4: "Contributor",
    5: "Citizen",
    6: "Follower"
});

exports.submission_statuses = index([
    "Unsubmitted",
    "Approved",
    "Denied",
    "Pending"
]);

exports.vertex_types = index([
    "News",
    "Group",
    "Organization",
    "Opportunity",
    "Organization (Offline)",
    "Event",
    "Customer",
    "User",
    "Submission",
    "Submission History",
    "Hours",
    "Address",
    "Asset",
    "URL",
    "Hours Set",
    "Email"
]);

function index(list) {
    var by_name = {};
    var by_id = {};

    each(list, !!list.length ? array : add);

    function array(name, id) {
        add(id, name);
    }

    function add(id, name) {
        by_id[id] = name;
        by_name[constant(name)] = parseInt(id, 10);
    }

    return {
        by_id: by_id,
        by_name: by_name,
        find: finder
    };
}

function finder(input) {
    return this.by_id[input] || this.by_name[input] || null;
}
