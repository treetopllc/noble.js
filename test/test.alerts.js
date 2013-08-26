describe("Alerts", function () {
    var mailboxId;

    before(function (done) {
        if (config.mailbox_id) {
            mailboxId = config.mailbox_id;
            return done();
        }

        client.mailboxes(function (err, list) {
            if (err) return done(err);

            async.detectSeries(list, function (item, done) {
                client.mailbox(item, function (err, alerts) {
                    if (err || !alerts.length) {
                        done(false);
                    } else {
                        done(!!alerts.length);
                    }
                });
            }, function (result) {
                mailboxId = result;
                done();
            });
        });
    });

    describe("#mailboxes()", function () {
        it("should return a Request object", function (done) {
            var req = client.mailboxes(ignore(done));
            expect(req).to.be.an.instanceOf(Request);
        });

        it("should return an array of results", function (done) {
            client.mailboxes(function (err, results) {
                if (err) return done(err);

                expect(results).to.be.an.instanceOf(Array);
                done();
            });
        });
    });

    describe("#mailbox()", function (done) {
        it("should return a Request object", function (done) {
            var req = client.mailbox(mailboxId, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should sucessfully run (smoke test)", function (done) {
            client.mailbox(mailboxId, done);
        });

        it("should return an array as the resultset", function (done) {
            client.mailbox(mailboxId, function (err, data) {
                if (err) return done(err);

                expect(data).to.be.an.instanceOf(Array);
                done();
            });
        });

        it("should parse date fields as Date objects", function (done) {
            client.mailbox(mailboxId, function (err, data) {
                if (err) return done(err);

                each(data, function (alert) {
                    each([ "created", "modified" ], function (prop) {
                        if (alert[prop]) {
                            expect(alert[prop]).to.be.an.instanceOf(Date);
                            expect(isNaN(alert[prop].valueOf())).to.be.false;
                        }
                    });
                });

                done();
            });
        });
    });

    describe("#mailboxUnread()", function () {
        var alertId;

        before(function (done) {
            client.mailbox(mailboxId, function (err, alerts) {
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
            client.mailboxRead(mailboxId, alertId, done);
        });

        it("should return a Request object", function (done) {
            var req = client.mailboxUnread(mailboxId, alertId, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should successfully run (smoke test)", function (done) {
            client.mailboxUnread(mailboxId, alertId, done);
        });

        it("should change the read property of the alert", function (done) {
            client.mailboxUnread(mailboxId, alertId, function (err) {
                if (err) return done(err);

                client.mailbox(mailboxId, function (err, alerts) {
                    if (err) return done(err);

                    expect(alerts[0]).to.have.property("read", false);
                    done();
                });
            });
        });
    });

    describe("#mailboxRead()", function () {
        var alertId;

        before(function (done) {
            client.mailbox(mailboxId, function (err, alerts) {
                if (err) return done(err);

                alertId = [ alerts[0].id ];
                done();
            });
        });

        beforeEach(function (done) {
            client.mailboxUnread(mailboxId, alertId, done);
        });

        it("should return a Request object", function (done) {
            var req = client.mailboxRead(mailboxId, alertId, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should successfully run (smoke test)", function (done) {
            client.mailboxRead(mailboxId, alertId, done);
        });

        it("should change the read property of the alert", function (done) {
            client.mailboxRead(mailboxId, alertId, function (err) {
                if (err) return done(err);

                client.mailbox(mailboxId, function (err, alerts) {
                    if (err) return done(err);

                    expect(alerts[0]).to.have.property("read", true);
                    done();
                });
            });
        });
    });

    describe.skip("#mailboxCreate()", function () {
        var id = "test-id-1",
            attr = {
                firstname: "Test",
                lastname: "User",
                email: "test.user@example.com"
            },
            pref = {};

        it("should return a Request object", function (done) {
            var req = client.mailboxCreate(id, attr, pref, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it.skip("should not allow us to create an invalid mailbox", function (done) {
            client.mailboxCreate("test-invalid", {}, {}, function (err, data) {
                expect(err).to.be.ok;
                done();
            });
        });

        it("should allow the creation of a valid mailbox", function (done) {
            client.mailboxCreate(id, attr, pref, done);
        });
    });

    describe.skip("#mailboxAttributes()", function () {
        var id = "test-id-3",
            attr = {
                firstname: "Test",
                lastname: "User",
                email: "test.user@example.com"
            },
            pref = {};

        before(function (done) {
            client.mailboxCreate(id, attr, pref, done);
        });

        it("should return a Request object", function (done) {
            var req = client.mailboxAttributes(id, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should sucessfully run (smoke test)", function (done) {
            client.mailboxAttributes(id, done);
        });

        it("should return an object as the resultset", function (done) {
            client.mailboxAttributes(id, function (err, data) {
                if (err) return done(err);

                expect(data).to.be.an("object");
                done();
            });
        });
    });

    describe.skip("#mailboxPreferences()", function () {
        var id = "test-id-4",
            attr = {
                firstname: "Test",
                lastname: "User",
                email: "test.user@example.com"
            },
            pref = {
                email: true,
                mobile: false,
                sms: false
            };

        before(function (done) {
            client.mailboxCreate(id, attr, pref, done);
        });

        it("should return a Request object", function (done) {
            var req = client.mailboxPreferences(id, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should sucessfully run (smoke test)", function (done) {
            client.mailboxPreferences(id, done);
        });

        it("should return an object as the resultset", function (done) {
            client.mailboxPreferences(id, function (err, data) {
                if (err) return done(err);

                expect(data).to.be.an("object");
                done();
            });
        });
    });

    describe.skip("#dispatch()", function () {
        var mailboxId = "test-id-5",
            alertMeta = {
                type: "10",
                template_attrs: {
                    subject: "Test Subject",
                    prefix: "test-prefix-",
                    suffix: "-test-suffix"
                },
                action_attrs: {
                    group_id: "some-uuid",
                    entity_id: "some-other-uuid"
                }
            },
            alertOptions = {};

        before(function (done) {
            client.mailboxCreate(mailboxId, {
                firstname: "Test",
                lastname: "User",
                email: "test.user@example.com"
            }, {}, done);
        });

        it("should return a Request object", function (done) {
            var req = client.dispatch([ mailboxId ], alertMeta, alertOptions, ignore(done));
            expect(req).to.be.an.instanceOf(Request);
            req.abort();
        });

        it("should sucessfully run (smoke test)", function (done) {
            client.dispatch([ mailboxId ], alertMeta, alertOptions, done);
        });
    });
});
