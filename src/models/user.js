const mongoose =  require('mongoose');
// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const UserSchema = Schema({
    name: String,
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);