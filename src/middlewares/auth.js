const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config({ path: '.env' });
const User = require('../models/userModel');
const secret = process.env.SECRET;

exports.auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            error: 'La petición no tiene la cabecera',
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    const user = await User.findOne({ isTokenRemoved: true });
    if (!user) {
        return res.status(401).json({ message: 'Token revocado o inválido' });
    }

    try {
        let payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(403).json({
                status: 'error',
                message: 'Token expirado',
            });
        }

        req.user = payload;
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: 'Error al enviar el token' })
    }

    next();
}