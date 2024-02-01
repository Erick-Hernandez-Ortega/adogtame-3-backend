const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// Endpoint de ejemplo
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Hola, este es un endpoint de ejemplo!' });
});


// Configuración de rutas y otros elementos aquí...

app.listen(port, () => {
    console.log('Servidor Express escuchando en el puerto ' + port);
});
