let request = require("supertest")
let assert = require("chai").assert
let app = require("../app")

describe("Log", function() {
    it("Create Log register", function(done) {
        request(app).post("/log")
        .expect(200)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            assert.equal(res.body.status, true)
            request(app).get("/job/" + res.body.data.jobId )
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(resJob => {
                done()
            })
        })
    })    
})