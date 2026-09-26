// ============================================
// CONTROLADOR DE SUCURSALES
// ============================================

import pool from '../config/db.js'


// ============================================
// LISTAR TODAS LAS SUCURSALES (público)
// GET /api/sucursales
// ============================================

export const listarSucursales = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         id,
         nombre,
         direccion,
         telefono,
         horario,
         mapa,
         activa,
         creado_en,
         actualizado_en
       FROM sucursales
       ORDER BY id DESC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      sucursales: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarSucursales:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener las sucursales.'
    })
  }
}


// ============================================
// OBTENER UNA SUCURSAL POR ID (público)
// GET /api/sucursales/:id
// ============================================

export const obtenerSucursal = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `SELECT 
         id,
         nombre,
         direccion,
         telefono,
         horario,
         mapa,
         activa,
         creado_en,
         actualizado_en
       FROM sucursales
       WHERE id = $1`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Sucursal no encontrada.'
      })
    }

    res.json({
      ok: true,
      sucursal: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error obtenerSucursal:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener la sucursal.'
    })
  }
}


// ============================================
// CREAR SUCURSAL (solo admin)
// POST /api/sucursales
// ============================================

export const crearSucursal = async (req, res) => {
  try {
    const {
      nombre,
      direccion,
      telefono,
      horario,
      mapa,
      activa
    } = req.body

    // Validaciones
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre es obligatorio.'
      })
    }

    if (!direccion || !direccion.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La dirección es obligatoria.'
      })
    }

    const resultado = await pool.query(
      `INSERT INTO sucursales 
        (nombre, direccion, telefono, horario, mapa, activa)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, direccion, telefono, horario, mapa, activa, creado_en`,
      [
        nombre.trim(),
        direccion.trim(),
        telefono?.trim() || null,
        horario?.trim() || null,
        mapa?.trim() || null,
        activa !== false
      ]
    )

    res.status(201).json({
      ok: true,
      mensaje: 'Sucursal creada correctamente.',
      sucursal: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error crearSucursal:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear la sucursal.'
    })
  }
}


// ============================================
// EDITAR SUCURSAL (solo admin)
// PUT /api/sucursales/:id
// ============================================

export const editarSucursal = async (req, res) => {
  try {
    const { id } = req.params

    const {
      nombre,
      direccion,
      telefono,
      horario,
      mapa,
      activa
    } = req.body

    // Verificar que existe
    const existe = await pool.query(
      'SELECT id FROM sucursales WHERE id = $1',
      [id]
    )

    if (existe.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Sucursal no encontrada.'
      })
    }

    const resultado = await pool.query(
      `UPDATE sucursales
       SET
         nombre     = COALESCE($1, nombre),
         direccion  = COALESCE($2, direccion),
         telefono   = COALESCE($3, telefono),
         horario    = COALESCE($4, horario),
         mapa       = COALESCE($5, mapa),
         activa     = COALESCE($6, activa)
       WHERE id = $7
       RETURNING id, nombre, direccion, telefono, horario, mapa, activa`,
      [
        nombre?.trim() || null,
        direccion?.trim() || null,
        telefono?.trim() || null,
        horario?.trim() || null,
        mapa?.trim() || null,
        typeof activa === 'boolean' ? activa : null,
        id
      ]
    )

    res.json({
      ok: true,
      mensaje: 'Sucursal actualizada correctamente.',
      sucursal: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error editarSucursal:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar la sucursal.'
    })
  }
}


// ============================================
// ELIMINAR SUCURSAL (solo admin)
// DELETE /api/sucursales/:id
// ============================================

export const eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM sucursales WHERE id = $1 RETURNING id, nombre',
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Sucursal no encontrada.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Sucursal eliminada correctamente.',
      sucursal: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error eliminarSucursal:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar la sucursal.'
    })
  }
}