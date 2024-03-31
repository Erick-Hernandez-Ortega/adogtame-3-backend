// routes/publicacionRoutes.js
const express = require('express');
const publicacionController = require('../controllers/publicationController');

const router = express.Router();

// * GET
router.get('/prueba', publicacionController.prueba);

// * POST 
router.post('');

module.exports = router;