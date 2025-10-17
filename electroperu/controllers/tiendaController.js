const db = require('../config/db')

exports.crearTienda = async (req, res) => {
  const {tienda} = req.body

  if (!tienda){
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  const sql = "INSERT INTO tiendas (tienda) VALUES (?)"

  try{
    const [result] = await db.query(sql, [tienda])
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Registrado correctamente'
    })
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno en el servidor'})
  }
}

exports.obtenerTiendas = async (req, res) => {
  const sql = "SELECT * FROM tiendas ORDER BY id DESC"

  try{
    const [result] = await db.query(sql)
    res.status(200).json(result)
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno en el servidor'})
  }
}