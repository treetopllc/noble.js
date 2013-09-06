describe("Alerts", function () {
    var mailboxId;

    before(function (done) {
        if (config.alerts.mailbox_id) {
            mailboxId = config.alerts.mailbox_id;
            return done();
        }

        this.timeout("10s");

        client.mailboxes(function (err, list) {
            if (err) return done(err);

            async.detectSeries(list, function (item, done) {
                client.mailbox(item).get(function (err, alerts) {
                    done(err ? false : !!alerts.length);
                });
            }, function (result) {
                mailboxId = result;
                done();
            });
        });
    });

    describe("#mailboxes()", function () {
        it("should return a Request object", function (done) {
            expect(client.mailboxes(ignore(done))).to.be.a(Request);
        });

        it("should return an array of results", function (done) {
            client.mailboxes(function (err, results) {
                if (err) return done(err);

                expect(results).to.be.an(Array);
                done();
            });
        });
    });

    describe("#mailbox()", function () {
        it("should return a Mailbox object", function () {
            expect(client.mailbox(mailboxId)).to.be.a(require("noble.js/lib/Mailbox"));
        });

        it("should set the client and id properly", function () {
            expect(client.mailbox(mailboxId)).to.eql({
                client: client,
                id: mailboxId
            });
        });
    });

    describe("Mailbox", function (done) {
        var mailbox;

        before(function () {
            mailbox = client.mailbox(mailboxId);
        });

        describe("#get()", function () {
            it("should return a Request object", function (done) {
                var req = mailbox.get(ignore(done));
                expect(req).to.be.a(Request);
            });

            it("should sucessfully run (smoke test)", function (done) {
                mailbox.get(done);
            });

            it("should return an array as the resultset", function (done) {
                mailbox.get(function (err, data) {
                    if (err) return done(err);

                    expect(data).to.be.an(Array);
                    done();
                });
            });

            it("should parse date fields as Date objects", function (done) {
                mailbox.get(function (err, data) {
                    if (err) return done(err);

                    each(data, function (alert) {
                        each([ "created", "modified" ], function (prop) {
                            if (alert[prop]) {
                                expect(alert[prop]).to.be.a(Date);
                                expect(isNaN(alert[prop].valueOf())).to.be(false);
                            }
                        });
                    });

                    done();
                });
            });
        });

        describe.skip("#create()", function () {
            it("should return a Request object", function (done) {
                var req = client.mailbox("test-invalid").create({}, {}, ignore(done));
                expect(req).to.be.a(Request);
            });

            it.skip("should not allow us to create an invalid mailbox", function (done) {
                client.mailbox("test-invalid").create({}, {}, function (err, data) {
                    expect(err).to.be.ok();
                    done();
                });
            });

            it("should allow the creation of a valid mailbox", function (done) {
                var attr = {
                        firstname: "Test",
                        lastname: "User",
                        email: "test.user@example.com"
                    },
                    pref = {};

                client.mailbox("test-id-1").create(attr, pref, done);
            });
        });

        describe("#stats()", function () {
            it("should return a Request object", function (done) {
                var req = mailbox.stats(ignore(done));
                expect(req).to.be.a(Request);
            });

            it("should successfully run (smoke test)", function (done) {
                mailbox.stats(done);
            });

            it("should return an object of stats", function (done) {
                mailbox.stats(function (err, stats) {
                    if (err) return done(err);

                    expect(stats).to.have.keys("deleted", "new", "read", "total");
                    done();
                });
            });
        });

        describe("#markUnread()", function () {
            var alertId;

            before(function (done) {
                mailbox.get(function (err, alerts) {
                    if (err) {
                        done(err);
                    } else if (!alerts || alerts.length < 1) {
                        done(new Error("no alerts found in test mailbox"));
                    } else {
                        alertId = [ alerts[0].id ];
                        done();
                    }
                });
            });

            beforeEach(function (done) {
                mailbox.markRead(alertId, done);
            });

            it("should return a Request object", function (done) {
                var req = mailbox.markUnread(alertId, ignore(done));
                expect(req).to.be.a(Request);
            });

            it("should successfully run (smoke test)", function (done) {
                mailbox.markUnread(alertId, done);
            });

            it("should change the read property of the alert", function (done) {
                mailbox.markUnread(alertId, function (err, data) {
                    if (err) return done(err);

                    expect(data[0]).to.have.property("read", false);
                    done();
                });
            });
        });

        describe("#markRead()", function () {
            var alertId;

            before(function (done) {
                mailbox.get(function (err, alerts) {
                    if (err) return done(err);

                    alertId = [ alerts[0].id ];
                    done();
                });
            });

            beforeEach(function (done) {
                mailbox.markUnread(alertId, done);
            });

            it("should return a Request object", function (done) {
                var req = mailbox.markRead(alertId, ignore(done));
                expect(req).to.be.a(Request);
            });

            it("should successfully run (smoke test)", function (done) {
                mailbox.markRead(alertId, done);
            });

            it("should change the read property of the alert", function (done) {
                mailbox.markRead(alertId, function (err, data) {
                    if (err) return done(err);

                    expect(data[0]).to.have.property("read", true);
                    done();
                });
            });
        });
    });
});
