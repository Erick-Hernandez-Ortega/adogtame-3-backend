const { Schema, model } = require('mongoose');
const Usuario = require('./user.js');
const Mascota = require('./Mascota.js');

const AdopcionSchema = Schema({
    mascota: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Adopcion', AdopcionSchema);