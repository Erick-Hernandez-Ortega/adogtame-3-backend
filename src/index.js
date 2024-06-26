const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importamos por separado las rutas de cada archivo
const userRoutes = require('./routes/userRoutes.js');
const petRoutes = require('./routes/petRoutes.js');
const adoptionRoutes = require('./routes/adoptionRoutes.js');

const { connectToDatabase } = require('./config/db-config');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
// Middleware para parsear el cuerpo de las solicitudes de un formulario como JSON
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

// Configuración de rutas y otros elementos aquí...
app.use('/user', userRoutes);
app.use('/pet', petRoutes);
app.use('/adoption', adoptionRoutes);

if (require.main === module) {
    // Si este archivo es ejecutado directamente (no importado como un módulo en otro archivo), entonces iniciamos el servidor.
    app.listen(port, () => {
        console.log('Servidor Express escuchando en el puerto ' + port);
    });
}

module.exports = app 
