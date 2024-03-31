const { Schema, model } = require('mongoose');
const Usuario = require('./userModel.js');

const MascotaSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    stirilized: {
        type: Boolean,
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
    images: {
        type: [String],
    },
    // date: {
    //     type: Date,
    //     default: Date.now(),
    // },
});

module.exports = model('Mascota', MascotaSchema);