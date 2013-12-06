var Chance = require("chance");
var extend = require("extend");

var chance = exports.chance = new Chance();

exports.token = function (predef) {
    return extend({
        user_id:       guid(),
        access_token:  token(),
        refresh_token: token(),
        expires_in:    1000
    }, predef);
};

exports.result = function (predef) {
    return extend({
        id:             guid(),
        name:           chance.name(),
        description:    chance.paragraph(),
        slug:           slug(),
        vertex_type_id: type_id(),
        deleted:        deleted(),
        created:        isodate(),
        modified:       isodate()
    }, predef);
};

exports.user = function (predef) {
    return extend({
        id:                  guid(),
        firstname:           chance.first(),
        lastname:            chance.last(),
        vertex_type_id:      type_id(),
        created:             isodate(),
        modified:            isodate(),
        deleted:             deleted(),
        birthdate:           chance.date({ string: true }),
        email:               chance.email(),
        enable_type_id:      chance.pick([ 0, 1 ]),
        gender:              chance.gender()[0],
        zipcode:             chance.zip(),
        timezone:            timezone(),
        email_authorized:    chance.bool({ likelihood: 90 }),
        wants_email:         chance.bool({ likelihood: 75 }),
        newsletter:          chance.bool(),
        pending_first_steps: chance.pick([ 0, 1 ])
    }, predef);
};

exports.userFeed = function (predef) {
    return extend({
        id:                guid(),
        type_id:           type_id(),
        name:              chance.sentence(),
        description:       chance.paragraph(),
        slug:              slug(),
        author_id:         guid(),
        author_name:       chance.name(),
        author_slug:       slug(),
        portal_id:         guid(),
        portal_name:       chance.string(),
        portal_slug:       slug(),
        portal_product_id: chance.string(),
        subtype_id:        subtype_id(),
        featured:          isodate(),
        start_ts:          isodate(),
        end_ts:            isodate(),
        repeat_days:       chance.integer({ min: 0, max: 127 }), // bitmask?
        longitude:         chance.longitude(),
        latitude:          chance.latitude(),
        created:           isodate(),
        modified:          isodate(),
        deleted:           deleted()
    }, predef);
};

exports.userRole = function (predef) {
    return extend({
        id:        guid(),
        vertex_id: guid(),
        override:  chance.bool()
    }, predef);
};

exports.userSubmission = function (predef) {
    return extend({
        submission_id:           guid(),
        submission_created:      isodate(),
        submission_modified:     isodate(),
        submission_deleted:      deleted(),
        submission_edge_type_id: type_id(),
        submission_status_id:    submissionStatus(),
        submission_status:       chance.string(),
        content_id:              guid(),
        content_name:            chance.name(),
        content_description:     chance.paragraph(),
        content_type_id:         type_id(),
        content_author_id:       guid(),
        content_author_name:     chance.name(),
        content_created:         isodate(),
        content_modified:        isodate(),
        content_deleted:         deleted(),
        destination_id:          guid(),
        destination_type_id:     type_id(),
        destination_created:     isodate(),
        destination_modified:    isodate(),
        destination_deleted:     deleted(),
        destination_name:        chance.string(),
        destination_description: chance.paragraph
    }, predef);
};

exports.submission = function (predef) {
    return extend(exports.vertex(), {
        edge_type_id: type_id(),
        featured:     isodate(),
        status:       submissionStatus()
    }, predef);
};

exports.submissionHistory = function (predef) {
    return extend({
        id:          guid(),
        old_status:  submissionStatus(),
        new_status:  submissionStatus(),
        description: chance.sentence()
    }, predef);
};

exports.vertex = function (predef) {
    return extend({
        id:             guid(),
        vertex_type_id: type_id(),
        deleted:        deleted(),
        created:        isodate(),
        modified:       isodate()
    }, predef);
};

// private helpers

function token() {
    return chance.hash({ length: 12 });
}

function guid() {
    return chance.guid();
}

function isodate() {
    return chance.date().toISOString();
}

function type_id() {
    return chance.integer({ min: 0, max: 13 });
}

function subtype_id() {
    return chance.integer({ min: 0, max: 13 });
}

function slug() {
    return chance.string({ pool: "1234567890", length: 7 });
}

function deleted() {
    return chance.bool({ likelihood: 1 });
}

function timezone() {
    return chance.pick([ "US/Pacific", "US/Mountain", "US/Central", "US/Eastern" ]);
}

function submissionStatus() {
    return chance.integer({ min: 0, max: 3 });
}
