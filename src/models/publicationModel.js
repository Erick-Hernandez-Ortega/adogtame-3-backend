const { Schema, model } = require('mongoose');
const Usuario = require('./userModel.js');
const Mascota = require('./petModel.js');

const PublicacionSchema = Schema({
    content: {
        type: String,
        required: true,
    },
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

module.exports = model('Publicacion', PublicacionSchema);