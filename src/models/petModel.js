const { Schema, model } = require('mongoose');
const Usuario = require('./userModel.js');

const MascotaSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    stirilized: {
        type: Boolean,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    typeOfPet: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Mascota', MascotaSchema);