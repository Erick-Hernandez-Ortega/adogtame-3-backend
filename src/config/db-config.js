const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
};

module.exports = { connectToDatabase };