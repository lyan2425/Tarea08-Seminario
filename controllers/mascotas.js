const db = require('../config/db');

// Funciones API
const obtenerMascotas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
};

const obtenerMascotaPorId = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
};

const crearMascota = async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const [result] = await db.query('INSERT INTO mascotas (nombre, edad) VALUES (?, ?)', [nombre, edad]);
    const [newRow] = await db.query('SELECT * FROM mascotas WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
};

const actualizarMascota = async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    await db.query('UPDATE mascotas SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, req.params.id]);
    const [rows] = await db.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
};

const eliminarMascota = async (req, res) => {
  try {
    await db.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
    res.json({ message: 'eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error interno' });
  }
};

module.exports = {
  obtenerMascotas,
  obtenerMascotaPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota
};
