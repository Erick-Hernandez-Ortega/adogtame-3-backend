const request = require("supertest");
const app = require("../../index");

// TODO arreglar el cierre de sesion de Mongo y la detención del servidor y termiar pruebas de logout
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

describe("POST /user/login", () => {
    // Validations
    it("Should display a 400 error for empty input", async () => {
        const response = await request(app).post('/user/login').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('El correo electrónico y la contraseña son obligatorios')
    })
    it("Should display a 400 error for invalid email or username", async () => {
        const response = await request(app).post('/user/login').send({
            email: 'correo@correo.com',
            password: 'Jose1234'
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('El correo o el nombre de usurio no coinciden con ningún usuario')
    })
    it("Should display a 400 error for invalid password", async () => {
        const response = await request(app).post('/user/login').send({
            email: 'jose@gmail.com',
            password: 'Jose123'
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('La contraseña no coincide')
    })
    // Succesfull Response
    it("Should display a 200 status for a succesfull response", async () => {
        const response = await request(app).post('/user/login').send({
            email: 'jose@gmail.com',
            password: 'Jose1234'
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })
})

describe("POST /user/logout", () => {
    // Validations
    it("Should display a 403 error for header not found", async () => {
        const response = await request(app).post('/user/logout').set('Authorization', '')

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('La petición no tiene la cabecera')
    })
    it("Should display a 404 error for token expired", async () => {
        const response = await request(app).post('/user/logout').set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1ZDE1ZDNmOTVmMTg0ODhiNzBiMzg2NSIsImlhdCI6MTcxNzg4NTAwMCwiZXhwIjoxNzE3ODg1MDEwfQ.sI0OI6mT-ht7AOFu3BNU4w9YChsjP71XlTthMn0aF3g')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Token invalido')
    })
    it("Should display a 400 error for user NOT found", async () => {
        const response = await request(app).post('/user/logout').set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2NjRkYTlkOGZjMzM4NjRkYTM1OTY5MiIsImlhdCI6MTcxNzg4NTY5MCwiZXhwIjoxNzIwNDc3NjkwfQ.lzlbcD_-jxEIxIlczfsRDNg5fviDX8nkKH6Jm6dDRJA')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Usuario no encontrado')
    })
    // Succesfull Response
    /*it("Should display a 200 status for a succesfull response", async () => {
        const response = await request(app).post('/user/login').send({
            email: 'jose@gmail.com',
            password: 'Jose1234'
        })
 
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    }) */
})