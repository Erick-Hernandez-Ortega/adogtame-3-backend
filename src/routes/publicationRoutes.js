// routes/publicacionRoutes.js
const express = require('express');
const publicacionController = require('../controllers/publicationController');
const autentication = require('../middlewares/auth');

const router = express.Router();
// TODO crear fn de crear publicacion
// TODO crear fn de get all publicacion

// * GET
router.get('/prueba', publicacionController.prueba);

// * POST 
router.post('', autentication.auth, publicacionController.createPublication);

module.exports = router;