// ============================================
// CONTROLADOR DE USUARIOS (solo admin)
// ============================================

import pool from '../config/db.js'

// ============================================
// LISTAR USUARIOS (con búsqueda y filtros)
// GET /api/usuarios
// Query params opcionales:
//   ?buscar=texto       → filtra por nombre o correo (ILIKE)
//   ?rol=admin|cliente  → filtra por rol
//   ?activo=true|false  → filtra por estado
// ============================================

export const listarUsuarios = async (req, res) => {
  try {
    const { buscar, rol, activo } = req.query

    // Construir WHERE dinámico
    const condiciones = []
    const valores = []

    if (buscar && buscar.trim() !== '') {
      valores.push(`%${buscar.trim()}%`)
      condiciones.push(
        `(nombre ILIKE $${valores.length} OR correo ILIKE $${valores.length})`
      )
    }

    if (rol && rol !== '') {
      if (!['admin', 'cliente'].includes(rol)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El rol debe ser "admin" o "cliente".'
        })
      }
      valores.push(rol)
      condiciones.push(`rol = $${valores.length}`)
    }

    if (activo !== undefined && activo !== '') {
      if (!['true', 'false'].includes(activo)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El parámetro "activo" debe ser "true" o "false".'
        })
      }
      valores.push(activo === 'true')
      condiciones.push(`activo = $${valores.length}`)
    }

    const where = condiciones.length > 0
      ? `WHERE ${condiciones.join(' AND ')}`
      : ''

    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo, creado_en, actualizado_en
       FROM usuarios
       ${where}
       ORDER BY creado_en DESC`,
      valores
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      usuarios: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error en listarUsuarios:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al obtener los usuarios.'
    })
  }
}


// ============================================
// CAMBIAR ROL DE UN USUARIO
// PUT /api/usuarios/:id/rol
// Body: { rol: 'admin' | 'cliente' }
// ============================================

export const cambiarRol = async (req, res) => {
  try {
    const { id } = req.params
    const { rol } = req.body

    // Validar rol
    if (!rol || !['admin', 'cliente'].includes(rol)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El rol debe ser "admin" o "cliente".'
      })
    }

    // Evitar que un admin se quite su propio rol
    if (Number(id) === req.usuario.id && rol !== 'admin') {
      return res.status(400).json({
        ok: false,
        mensaje: 'No puedes cambiarte el rol a ti mismo.'
      })
    }

    // ============================================
    // REGLA: Solo puede existir 1 administrador
    // ============================================
    if (rol === 'admin') {
      const existeAdmin = await pool.query(
        `SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1`
      )

      if (existeAdmin.rows.length > 0) {
        return res.status(409).json({
          ok: false,
          mensaje: 'Ya existe un administrador. Para transferir el rol, hazlo manualmente desde la base de datos.'
        })
      }
    }

    const resultado = await pool.query(
      `UPDATE usuarios
       SET rol = $1, actualizado_en = NOW()
       WHERE id = $2
       RETURNING id, nombre, correo, rol, activo, creado_en, actualizado_en`,
      [rol, id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Rol actualizado correctamente.',
      usuario: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error en cambiarRol:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al cambiar el rol.'
    })
  }
}


// ============================================
// ACTIVAR / DESACTIVAR USUARIO
// PUT /api/usuarios/:id/estado
// Body: { activo: true | false }
// ============================================

export const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params
    const { activo } = req.body

    // Validar que sea booleano
    if (typeof activo !== 'boolean') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El campo "activo" debe ser true o false.'
      })
    }

    // Evitar que un admin se desactive a sí mismo
    if (Number(id) === req.usuario.id && activo === false) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No puedes desactivar tu propia cuenta.'
      })
    }

    const resultado = await pool.query(
      `UPDATE usuarios
       SET activo = $1, actualizado_en = NOW()
       WHERE id = $2
       RETURNING id, nombre, correo, rol, activo, creado_en, actualizado_en`,
      [activo, id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado.'
      })
    }

    res.json({
      ok: true,
      mensaje: activo
        ? 'Usuario activado correctamente.'
        : 'Usuario desactivado correctamente.',
      usuario: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error en cambiarEstado:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al cambiar el estado.'
    })
  }
}