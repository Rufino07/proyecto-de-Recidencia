// ============================================
// CONTROLADOR DE PRODUCTOS
// ============================================

import pool from '../config/db.js'

// ============================================
// CONSTANTES DE VALIDACIÓN
// ============================================

const TIPOS_VALIDOS = ['Mayoreo', 'Menudeo', 'Mayoreo y menudeo']
const NOMBRE_MIN = 2
const NOMBRE_MAX = 200
const DESCRIPCION_MAX = 1000

// ============================================
// LISTAR TODOS LOS PRODUCTOS (público)
// GET /api/productos
// ============================================

export const listarProductos = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT 
         p.id,
         p.nombre,
         p.tipo,
         p.descripcion,
         p.imagen,
         p.activo,
         p.categoria_id,
         c.nombre AS categoria,
         p.creado_en,
         p.actualizado_en
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       ORDER BY p.id DESC`
    )

    res.json({
      ok: true,
      total: resultado.rows.length,
      productos: resultado.rows
    })

  } catch (err) {
    console.error('❌ Error listarProductos:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los productos.'
    })
  }
}

// ============================================
// OBTENER UN PRODUCTO POR ID (público)
// GET /api/productos/:id
// ============================================

export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `SELECT 
         p.id,
         p.nombre,
         p.tipo,
         p.descripcion,
         p.imagen,
         p.activo,
         p.categoria_id,
         c.nombre AS categoria
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = $1`,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado.'
      })
    }

    res.json({
      ok: true,
      producto: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error obtenerProducto:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el producto.'
    })
  }
}

// ============================================
// CREAR PRODUCTO (solo admin)
// POST /api/productos
// ============================================

export const crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      tipo,
      descripcion,
      imagen,
      categoria_id,
      activo
    } = req.body

    // --------------------------------------------
    // VALIDACIONES
    // --------------------------------------------

    // 1. Campos obligatorios
    if (!nombre || !tipo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre y el tipo son obligatorios.'
      })
    }

    // 2. Nombre debe ser string
    if (typeof nombre !== 'string') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre debe ser texto.'
      })
    }

    // 3. Limpiar nombre
    const nombreLimpio = nombre.trim()

    // 4. Longitud mínima del nombre
    if (nombreLimpio.length < NOMBRE_MIN) {
      return res.status(400).json({
        ok: false,
        mensaje: `El nombre debe tener al menos ${NOMBRE_MIN} caracteres.`
      })
    }

    // 5. Longitud máxima del nombre
    if (nombreLimpio.length > NOMBRE_MAX) {
      return res.status(400).json({
        ok: false,
        mensaje: `El nombre no puede superar los ${NOMBRE_MAX} caracteres.`
      })
    }

    // 6. Tipo válido
    if (!TIPOS_VALIDOS.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
      })
    }

    // 7. Longitud máxima de descripción
    if (descripcion && descripcion.length > DESCRIPCION_MAX) {
      return res.status(400).json({
        ok: false,
        mensaje: `La descripción no puede superar los ${DESCRIPCION_MAX} caracteres.`
      })
    }

    // --------------------------------------------
    // INSERT
    // --------------------------------------------

    const resultado = await pool.query(
      `INSERT INTO productos 
        (nombre, tipo, descripcion, imagen, categoria_id, activo)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, tipo, descripcion, imagen, categoria_id, activo`,
      [
        nombreLimpio,
        tipo,
        descripcion?.trim() || null,
        imagen || null,
        categoria_id || null,
        activo !== false
      ]
    )

    res.status(201).json({
      ok: true,
      mensaje: 'Producto creado correctamente.',
      producto: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error crearProducto:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el producto.'
    })
  }
}

// ============================================
// EDITAR PRODUCTO (solo admin)
// PUT /api/productos/:id
// ============================================

export const editarProducto = async (req, res) => {
  try {
    const { id } = req.params

    const {
      nombre,
      tipo,
      descripcion,
      imagen,
      categoria_id,
      activo
    } = req.body

    // --------------------------------------------
    // VALIDACIONES
    // --------------------------------------------

    // 1. Verificar que el producto existe
    const existe = await pool.query(
      'SELECT id FROM productos WHERE id = $1',
      [id]
    )

    if (existe.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado.'
      })
    }

    // 2. Si viene nombre, validar
    let nombreLimpio = null

    if (nombre !== undefined) {
      if (typeof nombre !== 'string') {
        return res.status(400).json({
          ok: false,
          mensaje: 'El nombre debe ser texto.'
        })
      }

      nombreLimpio = nombre.trim()

      if (nombreLimpio.length < NOMBRE_MIN) {
        return res.status(400).json({
          ok: false,
          mensaje: `El nombre debe tener al menos ${NOMBRE_MIN} caracteres.`
        })
      }

      if (nombreLimpio.length > NOMBRE_MAX) {
        return res.status(400).json({
          ok: false,
          mensaje: `El nombre no puede superar los ${NOMBRE_MAX} caracteres.`
        })
      }
    }

    // 3. Si viene tipo, validar
    if (tipo) {
      if (!TIPOS_VALIDOS.includes(tipo)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
        })
      }
    }

    // 4. Si viene descripción, validar longitud
    if (descripcion && descripcion.length > DESCRIPCION_MAX) {
      return res.status(400).json({
        ok: false,
        mensaje: `La descripción no puede superar los ${DESCRIPCION_MAX} caracteres.`
      })
    }

    // --------------------------------------------
    // UPDATE
    // --------------------------------------------

    const resultado = await pool.query(
      `UPDATE productos
       SET
         nombre       = COALESCE($1, nombre),
         tipo         = COALESCE($2, tipo),
         descripcion  = COALESCE($3, descripcion),
         imagen       = COALESCE($4, imagen),
         categoria_id = COALESCE($5, categoria_id),
         activo       = COALESCE($6, activo)
       WHERE id = $7
       RETURNING id, nombre, tipo, descripcion, imagen, categoria_id, activo`,
      [
        nombreLimpio,
        tipo || null,
        descripcion?.trim() || null,
        imagen || null,
        categoria_id || null,
        typeof activo === 'boolean' ? activo : null,
        id
      ]
    )

    res.json({
      ok: true,
      mensaje: 'Producto actualizado correctamente.',
      producto: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error editarProducto:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el producto.'
    })
  }
}

// ============================================
// ELIMINAR PRODUCTO (solo admin)
// DELETE /api/productos/:id
// ============================================

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING id, nombre',
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado.'
      })
    }

    res.json({
      ok: true,
      mensaje: 'Producto eliminado correctamente.',
      producto: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error eliminarProducto:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el producto.'
    })
  }
}