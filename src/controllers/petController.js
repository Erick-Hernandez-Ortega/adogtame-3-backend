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

const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Mascota.findById(id, { __v: 0 });

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                message: 'Mascota no encontrada',
            });
        }

        const base64Image = pet.image.data.toString('base64');
        const imageDataUri = `data:${pet.image.contentType};base64,${base64Image}`;

        res.status(200).json({
            status: 'success',
            message: 'Mascota encontrada',
            pet: {
                ...pet.toJSON(), 
                image: imageDataUri, 
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error',
            error: error.message,
        });
    }
}

const getPetsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const pets = await Mascota.find({ owner: userId }, { __v: 0 });

        if (!pets) {
            return res.status(404).json({
                status: 'error',
                message: 'Mascotas no encontradas',
            });
        }

        const petsWithImages = pets.map(pet => {
            const base64Image = pet.image.data.toString('base64');
            const imageDataUri = `data:${pet.image.contentType};base64,${base64Image}`;
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
                image: imageDataUri
            };
        });

        res.status(200).json({
            status: 'success',
            message: 'Mascotas encontradas',
            pets: petsWithImages
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Hubo un error',
            error: error.message,
        });
    }
}


module.exports = {
    prueba,
    createPet,
    getAllPetsAvailable,
    getPetById,
    getPetsByUserId
}