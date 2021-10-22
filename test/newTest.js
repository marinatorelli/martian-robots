let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /expedition", () => {
        it("It should GET all the expeditions", (done) => {
            chai.request(server)
                .get("/expedition")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('json');
                done();
                });
        });
    });
    describe("GET /analytics", () => {
        it("It should GET all the expeditions", (done) => {
            chai.request(server)
                .get("/analytics")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('json');
                done();
                });
            });

        it("It should NOT GET anything", (done) => {
            chai.request(server)
                .get("/notacall")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });


    });
});