/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 *
 * Heavily modified by Dominic Barnes <dominic@treetopllc.com>
 * Aug 26, 2013
 */

//            1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec      8 Z 9 ±    10 tzHH    11 tzmm
var regex = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,
    numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];

module.exports = function (date) {
    var struct = regex.exec(date),
        minutesOffset = 0;

    if (!struct) {
        throw new Error("Could not parse " + date + " as a date");
    }

    // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
    for (var i = 0, k; (k = numericKeys[i]); ++i) {
        struct[k] = +struct[k] || 0;
    }

    // allow undefined days and months
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;

    if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11];

        if (struct[9] === '+') {
            minutesOffset = 0 - minutesOffset;
        }
    }

    return Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
};
