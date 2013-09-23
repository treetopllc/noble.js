describe("utils", function () {
    var utils = api.utils,
        _originalDateParse = Date.parse,
        _badDateParse = function () { return NaN; };

    describe(".parseDate()", function () {
        it("should still work when Date.parse returns a NaN", function () {
            Date.parse = _badDateParse;

            var d = utils.parseDate("2013-04-11T20:41:00.000000Z");
            expect(d.getUTCFullYear()).to.equal(2013);
            expect(d.getUTCMonth()).to.equal(3);
            expect(d.getUTCDate()).to.equal(11);
            expect(d.getUTCHours()).to.equal(20);
            expect(d.getUTCMinutes()).to.equal(41);
            expect(d.getUTCSeconds()).to.equal(0);
            expect(d.getUTCMilliseconds()).to.equal(0);

            Date.parse = _originalDateParse;
        });

        it("should throw an exception when Date.parse fails", function () {
            expect(function () {
                Date.parse = _badDateParse;
                utils.parseDate("abc");
                Date.parse = _originalDateParse;
            }).to.throwException(/Could not parse abc as a date/);
        });

        it("should handle time zones other than UTC", function () {
            Date.parse = _badDateParse;

            var d = utils.parseDate("2013-04-11T20:41:00.000000+01:00");
            expect(d.getUTCFullYear()).to.equal(2013);
            expect(d.getUTCMonth()).to.equal(3);
            expect(d.getUTCDate()).to.equal(11);
            expect(d.getUTCHours()).to.equal(19);
            expect(d.getUTCMinutes()).to.equal(41);
            expect(d.getUTCSeconds()).to.equal(0);
            expect(d.getUTCMilliseconds()).to.equal(0);

            Date.parse = _originalDateParse;
        });
    });
});
