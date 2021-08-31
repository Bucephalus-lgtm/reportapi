process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Report = require('../models/report');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Reports', () => {
    beforeEach((done) => {
        Report.remove({}, (err) => {
            done();
        });
    });

    describe('POST /api/report', () => {
        it('it should POST a report ', (done) => {
            let report = {
                userID: "user-2",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Quintal",
                convFctr: 100,
                price: 1600
            }
            chai.request(server)
                .post('/report')
                .send(report)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('report successfully added!');
                    res.body.report.should.have.property('userID');
                    res.body.report.should.have.property('marketID');
                    res.body.report.should.have.property('marketName');
                    res.body.report.should.have.property('cmdtyID');
                    res.body.report.should.have.property('cmdtyName');
                    res.body.report.should.have.property('marketType');
                    res.body.report.should.have.property('convFctr');
                    res.body.report.should.have.property('price');
                    res.body.report.should.have.property('priceUnit');
                    done();
                });
        });

    });

    describe('GET /api/report', () => {
        it('it should GET a report by the given id', (done) => {
            let report = new Report({
                userId: "user-2",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Quintal",
                convFctr: 100,
                price: 1600
            });
            report.save((err, report) => {
                chai.request(server)
                    .get('/report')
                    .query({
                        reportId: '612d34906461c3a7b2d44e98',
                    })
                    .send(report)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('userId');
                        res.body.should.have.property('marketID');
                        res.body.should.have.property('marketName');
                        res.body.should.have.property('cmdtyID');
                        res.body.should.have.property('cmdtyName');
                        res.body.should.have.property('priceUnit');
                        res.body.should.have.property('convFctr');
                        res.body.should.have.property('price');
                        res.body.should.have.property('id').eql(report.id);
                        done();
                    });
            });

        });
    });
});