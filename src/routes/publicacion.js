// routes/publicacionRoutes.js
const express = require('express');
const publicacionController = require('../controllers/publicacion');

const router = express.Router();

// GET
router.get('/prueba', publicacionController.prueba);

module.exports = router;