const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Página principal (lista mascotas)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.render('index', { mascotas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno');
  }
});

// Formulario crear
router.get('/nueva', (req, res) => {
  res.render('crearmascota', { mascota: null });
});

// Formulario editar
router.get('/editar/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.redirect('/mascotas');
    res.render('editarmascota', { mascota: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno');
  }
});

module.exports = router;
