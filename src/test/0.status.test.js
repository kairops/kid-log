let request = require("supertest")
let assert = require("chai").assert
let app = require("../app")

describe("Status", function() {
    it("Go to status services", function(done) {
        request(app).get("/")
        .expect(200)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            console.log(res.body)
            assert.equal(res.body.status, true)
            done()
        })
    })    
})