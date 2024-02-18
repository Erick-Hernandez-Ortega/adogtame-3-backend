// userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const userValidation = require('../validations/userValidations');
const saltRounds = 10;

// No me quites mi función de pruebas :/
const prueba = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Success',
      message: 'Todo bien',
      user: req.user
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Algo tronó',
      error: error.message,
    })
  }
}

// Función para hashear la contraseña
const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Función para verificar la contraseña
const comparePasswords = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

const createUser = async (req, res) => {
  const { name, age, email, password, username } = req.body;

  try {
    const userData = { name, age, email, password: await hashPassword(password), username };
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json({
        message: "Exito, usuario creado correctamente",
        user: savedUser
      });
    } catch (error) {
      throw error;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) throw new Error('No se pudo obtener al usuario');

    const validationStatus = await userValidation.validateLogin(userData.email, userData.password);
    if (validationStatus.status === 'error') throw new Error(validationStatus.message);

    const token = jwt.createToken(validationStatus.user);

    res.status(200).json({
      status: 'success',
      token: token,
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal Error' })
  }
};

module.exports = {
  createUser,
  login,
  prueba,
};
