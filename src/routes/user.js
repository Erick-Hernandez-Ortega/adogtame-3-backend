// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Endpoint para agregar un usuario

// GET
router.get('/prueba', userController.prueba);
// POST
router.post('/create', userController.createUser);

module.exports = router;