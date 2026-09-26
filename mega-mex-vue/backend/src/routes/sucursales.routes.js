// ============================================
// RUTAS DE SUCURSALES
// ============================================

import { Router } from 'express'

import {
  listarSucursales,
  obtenerSucursal,
  crearSucursal,
  editarSucursal,
  eliminarSucursal
} from '../controllers/sucursales.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// GET /api/sucursales
router.get('/', listarSucursales)

// GET /api/sucursales/:id
router.get('/:id', obtenerSucursal)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// POST /api/sucursales
router.post('/', verificarToken, verificarAdmin, crearSucursal)

// PUT /api/sucursales/:id
router.put('/:id', verificarToken, verificarAdmin, editarSucursal)

// DELETE /api/sucursales/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarSucursal)

export default router