// userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

module.exports = {
  createUser,
};
