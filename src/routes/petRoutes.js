// routes/mascotaRoutes.js
const express = require('express');
const multer = require('multer');
const autentication = require('../middlewares/auth');

// Configurar almacenamiento de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mascotaController = require('../controllers/petController');
const { validatePublicationPet } = require('../validations/petValidations');

const router = express.Router();

// GET
router.get('/prueba', mascotaController.prueba);
router.get('/all-available', mascotaController.getAllPetsAvailable);
router.get('/:id', mascotaController.getPetById);
router.get('/user/:userId/pets', mascotaController.getPetsByUserId);

// POST
router.post('', autentication.auth, validatePublicationPet, upload.single('image'), mascotaController.createPet);

module.exports = router;