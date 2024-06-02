// Validaciones de user
const User = require('../models/userModel');
const mongoose = require('mongoose');

const validatePublicationPet = async (req, res, next) => {
    const id = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({
            status: 'error',
            message: 'ID de usuario no valido',
        });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(403).json({
            status: 'error',
            message: 'Usuario no encontrado',
        });
    }


    next();
}

module.exports = {
    validatePublicationPet
};