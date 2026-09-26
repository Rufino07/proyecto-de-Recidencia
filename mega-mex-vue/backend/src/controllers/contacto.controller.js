// ============================================
// CONTROLADOR DE CONTACTO
// ============================================
//
// Diferente a otros módulos:
// - Cliente puede POST (enviar mensaje) sin autenticarse
// - Admin puede GET, PUT, DELETE
//
// ============================================

import pool from '../config/db.js'


// ============================================
// ENVIAR MENSAJE (público)
// POST /api/contacto
// ============================================

export const enviarMensaje = async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      correo,
      mensaje
    } = req.body

    // Validaciones
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre es obligatorio.'
      })
    }

    if (!correo || !correo.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El correo es obligatorio.'
      })
    }

    if (!mensaje || !mensaje.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El mensaje es obligatorio.'
      })
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo.trim())) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ingresa un correo electrónico válido.'
      })
    }

    const resultado = await pool.query(
      `INSERT INTO mensajes_contacto 
        (nombre, telefono, correo, mensaje)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, correo, creado_en`,
      [
        nombre.trim(),
        telefono?.trim() || null,
        correo.trim().toLowerCase(),
        mensaje.trim()
      ]
    )

    res.status(201).json({
      ok: true,
      mensaje: 'Mensaje enviado correctamente.',
      datos: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error enviarMensaje:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al enviar el mensaje.'
    })
  }
}


// ============================================
// LISTAR MENSAJES (solo admin)
// GET /api/contacto
// ============================================

export const listarMensajes = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         id,
         nombre,
         telefono,
         correo,
         mensaje,
         leido,
         creado_en
       FROM mensajes_contacto
       ORDER BY 
         leido ASC,
         creado_en DESC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      mensajes: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarMensajes:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los mensajes.'
    })
  }
}


// ============================================
// MARCAR COMO LEÍDO / NO LEÍDO (solo admin)
// PUT /api/contacto/:id
// ============================================

export const marcarLeido = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar que existe
    const existe = await pool.query(
      'SELECT id FROM mensajes_contacto WHERE id = $1',
      [id]
    )

    if (existe.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Mensaje no encontrado.'
      })
    }

    // Toggle: cambiar el estado (true → false, false → true)
    const resultado = await pool.query(
      `UPDATE mensajes_contacto
       SET leido = NOT leido
       WHERE id = $1
       RETURNING id, nombre, correo, leido`,
      [id]
    )

    res.json({
      ok: true,
      mensaje: 'Estado actualizado.',
      datos: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error marcarLeido:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el estado.'
    })
  }
}


// ============================================
// ELIMINAR MENSAJE (solo admin)
// DELETE /api/contacto/:id
// ============================================

export const eliminarMensaje = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM mensajes_contacto WHERE id = $1 RETURNING id, nombre, correo',
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Mensaje no encontrado.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Mensaje eliminado correctamente.',
      datos: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error eliminarMensaje:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el mensaje.'
    })
  }
}
