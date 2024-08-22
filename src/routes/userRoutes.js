// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUserCreation } = require('../validations/userValidations');
const autentication = require('../middlewares/auth');

const router = express.Router();

// GET
router.get('/prueba', autentication.auth, userController.prueba);
router.get('/:email', userController.findByEmail);
router.get('/id/:id', userController.findById);

// http://localhost:3001/user
router.post('', validateUserCreation, userController.createUser);
router.post('/login', userController.login);
router.post('/logout', autentication.auth, userController.logout);

module.exports = router;