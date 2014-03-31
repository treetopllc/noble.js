describe("lib/utils.js", function () {
    describe("utils", function () {
        var utils = require("noble.js/lib/utils");

        describe(".translate(input, type, from, to)", function () {
            var translate = utils.translate;

            it("should be a function", function () {
                expect(translate).to.be.a(Function);
            });

            it("should read an id field and write a name field", function () {
                var input = { type_id: 10 };

                translate(input, "vertex_types", "type_id", "type");

                expect(input).to.eql({
                    type_id: 10,
                    type: "Hours"
                });
            });

            it("should return the input object", function () {
                var input = {};
                expect(translate(input, "foo", "bar")).to.equal(input);
            });

            it("should drop `_id` of `from` when `to` is absent", function () {
                var input = { type_id: 10 };

                translate(input, "vertex_types", "type_id");

                expect(input).to.eql({
                    type_id: 10,
                    type: "Hours"
                });
            });

            it("should do nothing if the `type` does not exist in reference", function () {
                var input = { type_id: 10 };

                translate(input, "does_not_exist", "type_id");

                expect(input).to.eql({ type_id: 10 });
            });

            it("should do nothing if `from` does not exist on the target object", function () {
                var input = {};

                translate(input, "vertex_types", "type_id");

                expect(input).to.eql({});
            });

            it("should not overwrite the `to` property if it already exists", function () {
                var input = {
                    edge_type: "hello world",
                    edge_type_id: 0
                };

                translate(input, "edge_types", "edge_type_id");

                expect(input.edge_type).to.equal("hello world");
            });
        });
    });
});
