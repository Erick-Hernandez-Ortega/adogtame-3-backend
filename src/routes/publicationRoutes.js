// routes/publicacionRoutes.js
const express = require('express');
const publicacionController = require('../controllers/publicationController');
const autentication = require('../middlewares/auth');

const router = express.Router();

// * GET
router.get('/prueba', publicacionController.prueba);

// * POST 
router.post('', autentication.auth, publicacionController.createPublication);

module.exports = router;