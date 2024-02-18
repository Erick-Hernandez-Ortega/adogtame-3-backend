// Validaciones de user
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: "Error", message: "Falta un campo para hacer el login" });
    }
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ status: "error", message: "El correo no coincide con ningún usuario" });
        }
        const existingPwd = await bcrypt.compare(password, existingUser.password);
        if (!existingPwd) {
            return res.status(404).json({ status: "error", message: "La contraseña no coincide" });
        }
        req.currentUser = existingUser;
        next();
    } catch (error) {
        console.error('Error al validar el inicio de sesión:', error);
        return res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

module.exports = {
    validateUserCreation,
    validateLogin,
};