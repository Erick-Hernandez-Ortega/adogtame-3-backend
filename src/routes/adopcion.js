// routes/adopcionRoutes.js
const express = require('express');
const adopcionController = require('../controllers/adopcion');

const router = express.Router();

// GET
router.get('/prueba', adopcionController.prueba);

module.exports = router;