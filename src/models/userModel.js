const { Schema, model } = require('mongoose');

// Creamos el objeto del esquema y sus atributos
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    age: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        default: 'defaulf.png',
    },
    isTokenRemoved: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = model('User', UserSchema);