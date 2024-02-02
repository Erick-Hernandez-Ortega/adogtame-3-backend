// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Endpoint para agregar un usuario
router.post('/users', userController.createUser);

module.exports = router;