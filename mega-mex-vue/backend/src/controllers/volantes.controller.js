// ============================================
// CONTROLADOR DE VOLANTES (FLYERS)
// ============================================

import pool from '../config/db.js'


// ============================================
// LISTAR TODOS LOS VOLANTES (público)
// GET /api/volantes
// ============================================

export const listarVolantes = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         id,
         titulo,
         descripcion,
         imagen,
         activo,
         creado_en,
         actualizado_en
       FROM volantes
       ORDER BY id DESC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      volantes: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarVolantes:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los volantes.'
    })
  }
}


// ============================================
// OBTENER UN VOLANTE POR ID (público)
// GET /api/volantes/:id
// ============================================

export const obtenerVolante = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `SELECT 
         id,
         titulo,
         descripcion,
         imagen,
         activo,
         creado_en,
         actualizado_en
       FROM volantes
       WHERE id = $1`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Volante no encontrado.'
      })
    }

    res.json({
      ok: true,
      volante: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error obtenerVolante:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el volante.'
    })
  }
}


// ============================================
// CREAR VOLANTE (solo admin)
// POST /api/volantes
// ============================================

export const crearVolante = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
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
      `INSERT INTO volantes 
        (titulo, descripcion, imagen, activo)
       VALUES ($1, $2, $3, $4)
       RETURNING id, titulo, descripcion, imagen, activo, creado_en`,
      [
        titulo.trim(),
        descripcion?.trim() || null,
        imagen || null,
        activo !== false
      ]
    )

    res.status(201).json({
      ok: true,
      mensaje: 'Volante creado correctamente.',
      volante: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error crearVolante:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el volante.'
    })
  }
}


// ============================================
// EDITAR VOLANTE (solo admin)
// PUT /api/volantes/:id
// ============================================

export const editarVolante = async (req, res) => {
  try {
    const { id } = req.params

    const {
      titulo,
      descripcion,
      imagen,
      activo
    } = req.body

    // Verificar que existe
    const existe = await pool.query(
      'SELECT id FROM volantes WHERE id = $1',
      [id]
    )

    if (existe.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Volante no encontrado.'
      })
    }

    const resultado = await pool.query(
      `UPDATE volantes
       SET
         titulo       = COALESCE($1, titulo),
         descripcion  = COALESCE($2, descripcion),
         imagen       = COALESCE($3, imagen),
         activo       = COALESCE($4, activo)
       WHERE id = $5
       RETURNING id, titulo, descripcion, imagen, activo`,
      [
        titulo?.trim() || null,
        descripcion?.trim() || null,
        imagen || null,
        typeof activo === 'boolean' ? activo : null,
        id
      ]
    )

    res.json({
      ok: true,
      mensaje: 'Volante actualizado correctamente.',
      volante: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error editarVolante:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el volante.'
    })
  }
}


// ============================================
// ELIMINAR VOLANTE (solo admin)
// DELETE /api/volantes/:id
// ============================================

export const eliminarVolante = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM volantes WHERE id = $1 RETURNING id, titulo',
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Volante no encontrado.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Volante eliminado correctamente.',
      volante: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error eliminarVolante:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el volante.'
    })
  }
}