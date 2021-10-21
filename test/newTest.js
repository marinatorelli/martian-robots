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
    describe("GET /api", () => {
        it("It should GET all the expeditions", (done) => {
            chai.request(server)
                .get("/api")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('json');
                    //response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/task")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
});