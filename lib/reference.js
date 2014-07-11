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
    //11: "Hours",
    12: "Revision",
    //13: "Location",
    14: "Email",
    15: "Partner"
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

exports.opportunity_types = index({
    "-1": "Offline",
    0: "Internship",
    1: "Paying Job",
    2: "Volunteer Service",
    3: "Mentoring",
    4: "Tutoring",
    5: "Service Learning",
    6: "Performance"
});

exports.organization_types = index({
    "-1": "Offline",
    0: "Community",
    1: "Education",
    2: "Business",
    3: "Non-Profit",
    4: "Municipal",
    5: "Civic",
    6: "Greek",
    7: "Citizen"
});

exports.project_activities = index([
    "Teaching",
    "Research/Creative",
    "Service"
]);

exports.project_focuses = index([
    "Arts and Culture",
    "Education",
    "Community and Economic Development",
    "Government/Public Safety",
    "Environment and Sustainability",
    "Health and Wellness",
    "Social Issues"
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

exports.vertex_types = index({
    0: "News",
    1: "Group",
    2: "Organization",
    3: "Opportunity",
    4: "Project",
    5: "Event",
    6: "Customer",
    7: "User",
    8: "Submission",
    9: "Submission History",
    10: "Hours",
    11: "Address",
    12: "Asset",
    13: "URL",
    14: "Hours Set",
    15: "Email",
    16: "Relationship"
});

exports.activity_types = index([
    "Create",
    "Update",
    "Delete"
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
        by_name: by_name
    };
}
