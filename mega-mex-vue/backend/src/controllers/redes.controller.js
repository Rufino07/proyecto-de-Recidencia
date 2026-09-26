// ============================================
// CONTROLADOR DE REDES SOCIALES
// ============================================
//
// Configuración global (solo Facebook e Instagram)
// - GET /api/redes → obtener
// - PUT /api/redes → actualizar (solo admin)
// ============================================

import pool from '../config/db.js'


// ============================================
// OBTENER REDES SOCIALES (público)
// GET /api/redes
// ============================================

export const obtenerRedes = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         id,
         facebook,
         instagram,
         actualizado_en
       FROM redes_sociales
       ORDER BY id ASC
       LIMIT 1`
    )

    if (resultado.rows.length === 0) {
      return res.json({
        ok: true,
        redes: {
          id: null,
          facebook: '',
          instagram: ''
        }
      })
    }

    res.json({
      ok: true,
      redes: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error obtenerRedes:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener las redes sociales.'
    })
  }
}


// ============================================
// ACTUALIZAR REDES SOCIALES (solo admin)
// PUT /api/redes
// ============================================

export const actualizarRedes = async (req, res) => {
  try {
    const { facebook, instagram } = req.body

    const existe = await pool.query(
      'SELECT id FROM redes_sociales ORDER BY id ASC LIMIT 1'
    )

    let resultado

    if (existe.rows.length === 0) {

      resultado = await pool.query(
        `INSERT INTO redes_sociales (facebook, instagram)
         VALUES ($1, $2)
         RETURNING id, facebook, instagram, actualizado_en`,
        [
          facebook?.trim() || null,
          instagram?.trim() || null
        ]
      )

    } else {

      const id = existe.rows[0].id

      resultado = await pool.query(
        `UPDATE redes_sociales
         SET
           facebook  = $1,
           instagram = $2
         WHERE id = $3
         RETURNING id, facebook, instagram, actualizado_en`,
        [
          facebook?.trim() || null,
          instagram?.trim() || null,
          id
        ]
      )

    }

    res.json({
      ok: true,
      mensaje: 'Redes sociales actualizadas correctamente.',
      redes: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error actualizarRedes:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar las redes sociales.'
    })
  }
}