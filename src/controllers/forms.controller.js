import { pool } from '../db/connection.js';

export const saveForms = async (req, res) => {
  console.log("📩 Entró al guardado de formularios");

  try {
    const { departamento, municipio, zona, puesto, mesa, lugar, valores_json } = req.body;

    // 🔍 1. Verificar si ya existe un registro con esos mismos datos
    const [exists] = await pool.query(
      `SELECT id FROM formularios
       WHERE departamento = ? AND municipio = ? AND zona = ? AND puesto = ? AND mesa = ?
       LIMIT 1`,
      [departamento, municipio, zona, puesto, mesa]
    );

    if (exists.length > 0) {
      console.log("⚠️ Registro duplicado detectado, no se guardará.");
      return res.status(409).json({
        message: "Ya existe un formulario con esos mismos datos (departamento, municipio, zona, puesto y mesa).",
        duplicated: true,
      });
    }

    // 📝 2. Si no existe, proceder con el insert
    const [result] = await pool.query(
      `INSERT INTO formularios (departamento, municipio, zona, puesto, mesa, lugar, valores_json)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [departamento, municipio, zona, puesto, mesa, lugar, JSON.stringify(valores_json)]
    );

    console.log("✅ Formulario guardado correctamente, ID:", result.insertId);

    res.json({
      message: "Formulario guardado correctamente",
      insertId: result.insertId,
      duplicated: false,
    });
  } catch (error) {
    console.error("❌ Error guardando formularios:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const getForms = async (req, res) => {
  console.log("entro a comparar")
  try {
    const { zona, puesto } = req.body; // recibimos zona y puesto desde POST
console.log(zona)
console.log(puesto)
 

    // Consulta SQL con parámetros para evitar inyección SQL
    const [rows] = await pool.query(
      `SELECT * FROM formularios WHERE zona = ? AND puesto = ?`,
      [zona, puesto]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los formularios" });
  }
};



export const getZonasYPuestos = async (req, res) => {
  console.log("mande las zonas")
  try {
    // Obtener zonas únicas
    const [zonas] = await pool.query(
      "SELECT DISTINCT zona FROM formularios ORDER BY zona ASC"
    );

    // Obtener puestos únicos
    const [puestos] = await pool.query(
      "SELECT DISTINCT puesto, lugar FROM formularios ORDER BY puesto ASC"
    );
 

    // Devolver ambas listas al frontend
    res.json({
      zonas: zonas.map(z => z.zona),
      puestos: puestos.map(p => ({ puesto: p.puesto, lugar: p.lugar })),
    });

  } catch (error) {
    console.error("Error obteniendo zonas y puestos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

