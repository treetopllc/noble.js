var constant = require("to-constant-case");
var each = require("each");

exports.edge_types = index([
    "Parent",
    "Content",
    "Admin",
    "Moderator",
    "Contributor",
    "Citizen",
    "Follower",
    "Like",
    "Author",
    "Verifier",
    "Submission",
    "Hours",
    "Change",
    "Location",
    "Email"
]);

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
    "Conferences",
    "Club",
    "Non-Profit",
    "For-Profit",
    "School",
    "Government"
]);

exports.submission_statuses = index([
    "Unsubmitted",
    "Accepted",
    "Denied",
    "Pending"
]);

exports.roles = index([
    "Noblehour Admin",
    "Admin",
    "Moderator",
    "Contributor",
    "Citizen",
    "Follower"
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

    each(list, function (name, id) {
        by_id[id] = name;
        by_name[constant(name)] = id;
    });

    return {
        by_id: by_id,
        by_name: by_name,
        find: finder
    };
}

function finder(input) {
    return this.by_id[input] || this.by_name[input] || null;
}
