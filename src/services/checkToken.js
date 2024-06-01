const jwt = require('jwt-simple');
const secret = process.env.SECRET;
const User = require('../models/userModel');

exports.checkTokenStatus = async (token) => {
    try {
        const payload = jwt.decode(token, secret);

        // Buscar el usuario por su ID en el payload
        const user = await User.findById(payload.id);

        if (!user) {
            return { status: 'error', message: 'Usuario no encontrado' };
        }

        // Devolver el estado de isTokenRemoved del usuario
        return { status: 'success', isTokenRemoved: user.isTokenRemoved, userID: payload.id };
    } catch (error) {
        console.error('Error al verificar el estado del token:', error);
        return { status: 'error', message: 'Error al verificar el estado del token' };
    }
};