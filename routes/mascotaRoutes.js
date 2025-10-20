const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotas');

// Rutas API
router.get('/', mascotaController.obtenerMascotas);         // GET /api/mascotas
router.get('/:id', mascotaController.obtenerMascotaPorId);  // GET /api/mascotas/:id
router.post('/', mascotaController.crearMascota);           // POST /api/mascotas
router.put('/:id', mascotaController.actualizarMascota);    // PUT /api/mascotas/:id
router.delete('/:id', mascotaController.eliminarMascota);   // DELETE /api/mascotas/:id

module.exports = router;
