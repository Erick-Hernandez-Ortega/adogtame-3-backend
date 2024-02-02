const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/db-config');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());


connectToDatabase();

// Endpoint de ejemplo
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Hola, este es un endpoint de ejemplo!' });
});


// Configuración de rutas y otros elementos aquí...
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('Servidor Express escuchando en el puerto ' + port);
});
