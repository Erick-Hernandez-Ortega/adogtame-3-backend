const Publicacion = require('../models/publicationModel');

const prueba = async (req, res) => {
    try {

        res.status(200).json({
            status: 'success',
            message: 'Prueba exitosa',
        })

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error en la prueba',
            error: error.message,
        })
    }
};

const createPublication = async (req, res) => {
    try {
        console.log("object");

        res.status(200).json({
            status: 'success',
            message: 'Prueba exitosa',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error en la prueba',
            error: error.message,
        });
    }
};

module.exports = {
    prueba,
    createPublication
}