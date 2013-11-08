index("edge_types", [
    "Parent", "Contributed", "Admin", "Moderator", "Contributor", "Citizen",
    "Follower", "Like", "Has", "Author", "Verifier", "Verification"
]);

index("submission_statuses", [
    "Unsubmitted", "Accepted", "Denied", "Pending"
]);

index("vertex_subtypes", [
    "None", "Internship", "Paying Job", "Volunteer Service", "Mentoring",
    "Tutoring", "Service Learning", "Performance", "Celebration",
    "Culinary Arts", "Demonstrations", "Discussions", "Educational", "Family",
    "Films", "Fundraising", "Just for Fun", "Lecture", "Performance",
    "Workshop", "(Other)", "Conferences", "Club", "Non-profit", "For-profit",
    "School", "Government"
]);

index("vertex_types", [
    "News", "Group", "Organization", "Opportunity", "Organization", "Event",
    "Customer", "User", "Resource", "Submission"
]);

function index(name, list) {
    var x = 0,
        len = list.length,
        by_name = {},
        by_id = {};

    for (x = 0; x < len; x += 1) {
        by_name[list[x].toUpperCase()] = x;
        by_id[x] = list[x].toUpperCase();
    }

    exports[name] = {
        by_id: by_id,
        by_name: by_name
    };
}
