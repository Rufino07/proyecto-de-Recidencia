// ============================================
// CONTROLADOR DE PROMOCIONES
// ============================================

import pool from '../config/db.js'


// ============================================
// LISTAR TODAS LAS PROMOCIONES (público)
// GET /api/promociones
// ============================================

export const listarPromociones = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         id,
         titulo,
         descripcion,
         vigencia,
         imagen,
         activo,
         creado_en,
         actualizado_en
       FROM promociones
       ORDER BY id DESC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      promociones: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarPromociones:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener las promociones.'
    })
  }
}


// ============================================
// OBTENER UNA PROMOCIÓN POR ID (público)
// GET /api/promociones/:id
// ============================================

export const obtenerPromocion = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `SELECT 
         id,
         titulo,
         descripcion,
         vigencia,
         imagen,
         activo,
         creado_en,
         actualizado_en
       FROM promociones
       WHERE id = $1`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Promoción no encontrada.'
      })
    }

    res.json({
      ok: true,
      promocion: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error obtenerPromocion:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener la promoción.'
    })
  }
}


// ============================================
// CREAR PROMOCIÓN (solo admin)
// POST /api/promociones
// ============================================

export const crearPromocion = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      vigencia,
      imagen,
      activo
    } = req.body

    // Validaciones
    if (!titulo || !titulo.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El título es obligatorio.'
      })
    }

    const resultado = await pool.query(
      `INSERT INTO promociones 
        (titulo, descripcion, vigencia, imagen, activo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, titulo, descripcion, vigencia, imagen, activo, creado_en`,
      [
        titulo.trim(),
        descripcion?.trim() || null,
        vigencia?.trim() || null,
        imagen || null,
        activo !== false
      ]
    )

    res.status(201).json({
      ok: true,
      mensaje: 'Promoción creada correctamente.',
      promocion: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error crearPromocion:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear la promoción.'
    })
  }
}


// ============================================
// EDITAR PROMOCIÓN (solo admin)
// PUT /api/promociones/:id
// ============================================

export const editarPromocion = async (req, res) => {
  try {
    const { id } = req.params

    const {
      titulo,
      descripcion,
      vigencia,
      imagen,
      activo
    } = req.body

    // Verificar que existe
    const existe = await pool.query(
      'SELECT id FROM promociones WHERE id = $1',
      [id]
    )

    if (existe.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Promoción no encontrada.'
      })
    }

    const resultado = await pool.query(
      `UPDATE promociones
       SET
         titulo       = COALESCE($1, titulo),
         descripcion  = COALESCE($2, descripcion),
         vigencia     = COALESCE($3, vigencia),
         imagen       = COALESCE($4, imagen),
         activo       = COALESCE($5, activo)
       WHERE id = $6
       RETURNING id, titulo, descripcion, vigencia, imagen, activo`,
      [
        titulo?.trim() || null,
        descripcion?.trim() || null,
        vigencia?.trim() || null,
        imagen || null,
        typeof activo === 'boolean' ? activo : null,
        id
      ]
    )

    res.json({
      ok: true,
      mensaje: 'Promoción actualizada correctamente.',
      promocion: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error editarPromocion:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar la promoción.'
    })
  }
}


// ============================================
// ELIMINAR PROMOCIÓN (solo admin)
// DELETE /api/promociones/:id
// ============================================

export const eliminarPromocion = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM promociones WHERE id = $1 RETURNING id, titulo',
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Promoción no encontrada.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Promoción eliminada correctamente.',
      promocion: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error eliminarPromocion:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar la promoción.'
    })
  }
}