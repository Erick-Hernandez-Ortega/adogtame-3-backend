// userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const userValidation = require('../validations/userValidations');
const { checkTokenStatus } = require('../services/checkToken');

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
        status: "success",
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios' });
    }

    const validationStatus = await userValidation.validateLogin(email, password);
    if (validationStatus.status === 'error') return res.status(400).json({ message: validationStatus.message });

    const token = jwt.createToken(validationStatus.user);

    res.status(200).json({
      status: 'success',
      token: token,
    })
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    let token = req.headers.authorization.replace(/['"]+/g, '');

    const tokenStatus = await checkTokenStatus(token)
    if (tokenStatus.status === 'error') {
      return res.status(400).json({ status: 'error', message: tokenStatus.message });
    }

    if (tokenStatus.isTokenRemoved) {
      return res.status(400).json({ status: 'error', message: 'Token Removido Anteriomente' });
    }

    const user = await User.findById(tokenStatus.userID);
    user.isTokenRemoved = true;
    await user.save();

    res.status(200).json({
      status: 'Sesion cerrada correctamente',
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error })
  }
}

const findByEmail = async (req, res) => {
  try {
    const { email } = req.params

    if (!email) return res.status(400).json({ error: 'Email no valido', status: 'error', });

    const user = await User.findOne({ email: email }, { password: 0, __v: 0 });

    if (user === null) return res.status(404).json({ error: 'Usuario no encontrado' });

    return res.status(200).json({ user: user, status: 'success', message: 'Usuario encontrado' });
  } catch (error) {
    res.status(400).json({ error: 'Internal Error', message: error });
  }
}

module.exports = {
  createUser,
  login,
  logout,
  prueba,
  findByEmail
};
