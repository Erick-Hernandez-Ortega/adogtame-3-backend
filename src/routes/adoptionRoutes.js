// routes/adopcionRoutes.js
const express = require('express');
const adopcionController = require('../controllers/adoptionController');

const router = express.Router();

// GET
router.get('/prueba', adopcionController.prueba);

module.exports = router;