// routes/mascotaRoutes.js
const express = require('express');
const mascotaController = require('../controllers/petController');

const router = express.Router();

// GET
router.get('/prueba', mascotaController.prueba);

// POST
router.post('', mascotaController.createPet);

module.exports = router;