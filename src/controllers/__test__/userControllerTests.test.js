const request = require("supertest");
const app = require("../../index");


describe("POST /user", () => {
    it('Should display a 400 error for invalid input', async () => {
        const response = await request(app).post('/user').send({

        });
        console.log(response.body);
    })
})