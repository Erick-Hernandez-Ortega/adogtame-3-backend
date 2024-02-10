// routes/mascotaRoutes.js
const express = require('express');
const mascotaController = require('../controllers/mascota');

const router = express.Router();

// GET
router.get('/prueba', mascotaController.prueba);

module.exports = router;