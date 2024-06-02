const Mascota = require('../models/petModel');

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

const createPet = async (req, res) => {
    try {
        
        const pet = JSON.parse(req.body.pet);
        const id = req.user;
        const images = req.files;

        const newPet = new Mascota(pet);
        newPet.images = images.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));
        newPet.owner = id;
        await newPet.save();

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
    createPet
}