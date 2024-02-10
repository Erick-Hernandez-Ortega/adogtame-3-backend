// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// GET
router.get('/prueba', userController.prueba);
// POST
router.post('/create', userController.createUser);

module.exports = router;