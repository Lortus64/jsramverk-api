process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    // Test list all names
    describe('GET /listNames', () => {
        it('Gets list of names', (done) => {
            chai.request(server)
                .get("/listNames")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);
                    res.body[0].should.have.property('name');

                    done();
                });
        });
    });

    // Test list one
    describe('POST /listOne', () => {
        it('Gets list of one file', (done) => {
            // request to get a id
            chai.request(server)
                .get("/listNames")
                .end((err, res) => {
                    var id = res.body[0]._id;

                    // test request
                    chai.request(server)
                        .post("/listOne")
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({id: id})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.an("array");
                            res.body.length.should.be.above(0);
                            res.body[0].should.have.property('_id');
                            res.body[0].should.have.property('name');
                            res.body[0].should.have.property('content');

                            done();
                        });
                });
        });
    });

    // Test create file
    describe('Post /update create new ', () => {
        it('Create new file', (done) => {
            var name = "Test 123";
            var content = "asdasd";

            chai.request(server)
                .post("/update")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({name: name, content: content})
                .end((err, res) => {
                    res.body.data.status.should.equal(201);

                    chai.request(server)
                        .get("/listNames")
                        .end((err, res) => {
                            res.body[2].name.should.equal(name);
                            done();
                        });
                });
        });
    });

    // Test update filr
    describe('Post /update update file ', () => {
        it('Update file', (done) => {
            var name = "new name";
            var content = "new text";

            // Prep
            chai.request(server)
                .get("/listNames")
                .end((err, res) => {
                    var id = res.body[0]._id;

                    // test request
                    chai.request(server)
                        .post("/update")
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({id: id, name: name, content: content})
                        .end((err, res) => {
                            res.body.data.status.should.equal(201);

                            chai.request(server)
                                .post("/listOne")
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .send({id: id})
                                .end((err, res) => {
                                    res.body[0].name.should.equal(name);
                                    res.body[0].content.should.equal(content);

                                    done();
                                });
                        });
                });
        });
    });
});
