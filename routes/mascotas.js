const express = require('express');
const router = express.Router();
const db = require('../models/db');

// --- API JSON routes (prefijo /api/mascotas)
// GET /api/mascotas -> listar
router.get('/api/mascotas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// GET /api/mascotas/:id -> obtener 1
router.get('/api/mascotas/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// POST /api/mascotas -> crear
router.post('/api/mascotas', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const [result] = await db.query('INSERT INTO mascotas (nombre, edad) VALUES (?, ?)', [nombre, edad]);
    const [newRow] = await db.query('SELECT * FROM mascotas WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// PUT /api/mascotas/:id -> actualizar
router.put('/api/mascotas/:id', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    await db.query('UPDATE mascotas SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, req.params.id]);
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// DELETE /api/mascotas/:id -> eliminar
router.delete('/api/mascotas/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
    res.json({ message: 'eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
});

// --- RUTAS EJS para frontend simple
// Index: lista mascotas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.render('index', { mascotas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('error interno');
  }
});

// Formulario crear
router.get('/nueva', (req, res) => {
  res.render('form', { mascota: null });
});

// Crear via form (POST /)
router.post('/', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    await db.query('INSERT INTO mascotas (nombre, edad) VALUES (?, ?)', [nombre, edad]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error interno');
  }
});

// Editar form
router.get('/editar/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.redirect('/');
    res.render('form', { mascota: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('error interno');
  }
});

// Actualizar via form (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    await db.query('UPDATE mascotas SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, req.params.id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error interno');
  }
});

// Eliminar via form
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error interno');
  }
});

module.exports = router;
