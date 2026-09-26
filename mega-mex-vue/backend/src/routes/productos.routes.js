// ============================================
// RUTAS DE PRODUCTOS
// ============================================

import { Router } from 'express'

import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto
} from '../controllers/productos.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// GET /api/productos
router.get('/', listarProductos)

// GET /api/productos/:id
router.get('/:id', obtenerProducto)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// POST /api/productos
router.post('/', verificarToken, verificarAdmin, crearProducto)

// PUT /api/productos/:id
router.put('/:id', verificarToken, verificarAdmin, editarProducto)

// DELETE /api/productos/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarProducto)

export default router