const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const app = require("../server"); // <-- Your express app


describe("Student API Test Suite", () => {

    // ------------------------------
    // 1. GET ALL STUDENTS
    // ------------------------------
    it("GET /students → should return list of students", (done) => {
        request(app)
            .get("/students")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an("array");
                done();
            });
    });

    // ------------------------------
    // 2. POST → Add New Student
    // ------------------------------
    it("POST /students → should create a new student", (done) => {
        request(app)
            .post("/students")
            .send({
                name: "Test User",
                age: 22,
                branch: "cse"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.include.keys("id");
                done();
            });
    });

    // ------------------------------
    // 3. PUT → Update student
    // ------------------------------
    it("PUT /students/:id → should update an existing student", (done) => {
        request(app)
            .put("/students/1")
            .send({
                name: "Updated User",
                age: 25,
                branch: "ece"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    // ------------------------------
    // 4. DELETE → Remove student
    // ------------------------------
    it("DELETE /students/:id → should delete student", (done) => {
        request(app)
            .delete("/students/1")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});
