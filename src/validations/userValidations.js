// Validaciones de user
const User = require('../models/userModel');

const validateUserCreation = async (req, res, next) => {
    const { name, age, email, password, username } = req.body;

    if (!name || !age || !email || !password || !username) {
        return res.status(400).json({ status: "Error", message: "Falta un campo para la creación de usuario" });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ status: "Error", message: "Error de formato de email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ status: "Error", message: "El email proporcionado ya está en uso" });
    }

    if (isNaN(age)) {
        return res.status(400).json({ status: "Error", message: "Error edad debe ser un numero" });
    }

    if (!isValidName(name)) {
        return res.status(400).json({ status: "Error", message: "Error nombre NO debe contener numeros" });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ status: "Error", message: "Error la contraseña debera de tener una mayuscula un numero y" });
    }

    next();
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/
    return nameRegex.test(name);
}

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

module.exports = {
    validateUserCreation,
};