// ============================================
// CONTROLADOR DE PRODUCTOS
// ============================================

import pool from '../config/db.js'

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

    // Validaciones
    if (!nombre || !tipo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre y el tipo son obligatorios.'
      })
    }

    const tiposValidos = ['Mayoreo', 'Menudeo', 'Mayoreo y menudeo']

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
      })
    }

    const resultado = await pool.query(
      `INSERT INTO productos 
        (nombre, tipo, descripcion, imagen, categoria_id, activo)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, tipo, descripcion, imagen, categoria_id, activo`,
      [
        nombre.trim(),
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

    // Verificar que existe
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

    // Validar tipo si viene
    if (tipo) {
      const tiposValidos = ['Mayoreo', 'Menudeo', 'Mayoreo y menudeo']

      if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
        })
      }
    }

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
        nombre?.trim() || null,
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