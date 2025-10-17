//GET - Obtener, PUT = Actualizar, POST = crear, DELETE = eliminar
const express = require('express')

//Enrutador
const router = express.Router()

//Acceso = Crear, Listar, etc...
const tiendaController = require('../controllers/tiendaController')

router.get('/', tiendaController.obtenerTiendas)
router.post('/', tiendaController.crearTienda)

module.exports = router