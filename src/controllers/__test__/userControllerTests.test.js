const request = require("supertest");
const app = require("../../index");


describe("POST /user", () => {
    // Validations
    it('Should display a 400 error for empty input', async () => {
        const response = await request(app).post('/user').send({
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Falta un campo para la creación de usuario')
    })
    it('Should display a 400 error for invalid email', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'joselin',
            age: 23,
            email: 'kk',
            password: 'Jose1234'
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Error de formato de email')
    })
    it('Should display a 400 error for invalid age', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'Joselin1',
            age: 'hola',
            email: 'jose1@gmail.com',
            password: 'Jose1234'
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Error edad debe ser un numero')
    })
    it('Should display a 400 error for invalid name', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose123',
            username: 'Joselin1',
            age: '23',
            email: 'jose1@gmail.com',
            password: 'Jose1234'
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Error nombre NO debe contener numeros')
    })
    it('Should display a 400 error for invalid password', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'Joselin1',
            age: '23',
            email: 'jose1@gmail.com',
            password: 'Jose123'
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Error la contraseña debera de tener almenos una mayuscula, un numero y debe tener minimo 8 caracteres')
    })
    it('Should display a 409 error for existing email', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'joselin',
            age: 23,
            email: 'jose@gmail.com',
            password: 'Jose1234'
        });

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('El email proporcionado ya está en uso')
    })
    it('Should display a 409 error for existing username', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'Joselin',
            age: 23,
            email: 'jose1@gmail.com',
            password: 'Jose1234'
        });

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('El username proporcionado ya está en uso')
    })
    // Success Response
    it('Should display a 201 status for success response', async () => {
        const response = await request(app).post('/user').send({
            name: 'jose',
            username: 'joselin1',
            age: 23,
            email: 'jose1@gmail.com',
            password: 'Jose1234'
        });

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
    })
})