describe("Date Parsing", function () {
    var parse = api.isoDateParse;

    it("should not get a NaN", function () {
        expect(isNaN(parse("2013-04-11T20:41:00.000000Z"))).to.be(false);
    });

    it("should parse the date correctly", function () {
        var d = new Date(parse("2013-04-11T20:41:00.000000Z"));

        expect(d.getUTCFullYear()).to.equal(2013);
        expect(d.getUTCMonth()).to.equal(3);
        expect(d.getUTCDate()).to.equal(11);
        expect(d.getUTCHours()).to.equal(20);
        expect(d.getUTCMinutes()).to.equal(41);
        expect(d.getUTCSeconds()).to.equal(0);
        expect(d.getUTCMilliseconds()).to.equal(0);
    });

    it("should throw an exception when an unparsable date is used", function () {
        expect(function () {
            parse("abc");
        }).to.throwException(/Could not parse abc as a date/);
    });
});
