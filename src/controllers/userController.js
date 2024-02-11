// userController.js
const User = require('../models/userModel');

const prueba = async (req, res) => {
  try {

    res.status(200).json({
      status: 'success',
      message: 'Prueba exitosa',
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Hubo un error en la prueba',
      error: error.message,
    })
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    // Validar que se proporciona el nombre
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userData = { name };
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json({ 
        message: "Exito, usuario creado correctamente",
        user: savedUser });
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
  prueba,
};
