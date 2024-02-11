// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET
router.get('/prueba', userController.prueba);

// http://localhost:3001/user
router.post('', userController.createUser);

module.exports = router;