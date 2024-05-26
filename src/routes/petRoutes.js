// routes/mascotaRoutes.js
const express = require('express');
const multer = require('multer');

// Configurar almacenamiento de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mascotaController = require('../controllers/petController');

const router = express.Router();

// GET
router.get('/prueba', mascotaController.prueba);

// POST
router.post('', upload.array('images'), mascotaController.createPet);

module.exports = router;