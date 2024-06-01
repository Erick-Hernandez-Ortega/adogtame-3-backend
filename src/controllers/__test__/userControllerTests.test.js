const request = require("supertest");
const app = require("../../index");


describe("POST /user", () => {
    it('Should display a 400 error for invalid input', async () => {
        const response = await request(app).post('/user').send({
        });
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
    })
})