const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config({ path: '.env' });

// Clave secreta
const secret = process.env.SECRET;

exports.createToken = (user) => {
    try {
        const payload = {
            id: user._id,
            /*             name: user.name,
                        username: user.username,
                        age: user.age,
                        email: user.email,
                        image: user.imagen, */
            iat: moment().unix(),
            exp: moment().add(30, "days").unix(),
        }

        return jwt.encode(payload, secret);
    } catch (error) {
        console.error(error);
        return {
            error: 'Internal Error'
        }
    }
}