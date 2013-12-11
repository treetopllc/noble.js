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
    "Location"
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
    "URL"
]);

function index(list) {
    var x = 0,
        len = list.length,
        by_name = {},
        by_id = {};

    for (x = 0; x < len; x += 1) {
        by_name[list[x].toUpperCase()] = x;
        by_id[x] = list[x];
    }

    return {
        by_id: by_id,
        by_name: by_name
    };
}
