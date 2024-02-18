// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUserCreation, validateLogin } = require('../validations/userValidations');

const router = express.Router();

// GET
// router.get('/prueba', userController.prueba);

// http://localhost:3001/user
router.post('', validateUserCreation, userController.createUser);
router.post('/login', validateLogin, userController.login);

module.exports = router;