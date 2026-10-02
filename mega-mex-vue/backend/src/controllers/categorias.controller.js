// ============================================
// CONTROLADOR DE CATEGORÍAS
// ============================================

import pool from '../config/db.js'

// ============================================
// LISTAR TODAS LAS CATEGORÍAS (público)
// GET /api/categorias
// ============================================

export const listarCategorias = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id, nombre, descripcion, activo, creado_en
       FROM categorias
       WHERE activo = true
       ORDER BY nombre ASC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      categorias: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarCategorias:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener las categorías.'
    })
  }
}