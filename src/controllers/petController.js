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
        const image = req.file;

        const newPet = new Mascota(pet);
        if (image) {
            newPet.image = {
                data: image.buffer,
                contentType: image.mimetype
            };
        }
        newPet.owner = id;
        await newPet.save();

        res.status(200).json({
            status: 'success',
            message: 'Mascota creada exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error al crear la mascota',
            error: error.message,
        });
    }
};


const getAllPetsAvailable = async (req, res) => {
    try {
        const pets = await Mascota.find({ available: true }, { __v: 0 });
        
        const petsWithImages = pets.map(pet => {
            const base64Image = pet.image.data.toString('base64');

            delete pet.image;
            return {
                _id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                description: pet.description,
                stirilized: pet.stirilized,
                sex: pet.sex,
                typeOfPet: pet.typeOfPet,
                size: pet.size,
                available: pet.available,
                date: pet.date,
                owner: pet.owner,
                dataUrl: `data:${pet.image.contentType};base64,${base64Image}`
            };
        });
       
        res.status(200).json({
            status: 'success',
            message: 'Exito al obtener las mascotas',
            pets: petsWithImages
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error',
            error: error.message,
        });
    }
};


module.exports = {
    prueba,
    createPet,
    getAllPetsAvailable
}