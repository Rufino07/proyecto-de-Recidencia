// ============================================
// RUTAS DE PROMOCIONES
// ============================================

import { Router } from 'express'

import {
  listarPromociones,
  obtenerPromocion,
  crearPromocion,
  editarPromocion,
  eliminarPromocion
} from '../controllers/promociones.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// GET /api/promociones
router.get('/', listarPromociones)

// GET /api/promociones/:id
router.get('/:id', obtenerPromocion)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// POST /api/promociones
router.post('/', verificarToken, verificarAdmin, crearPromocion)

// PUT /api/promociones/:id
router.put('/:id', verificarToken, verificarAdmin, editarPromocion)

// DELETE /api/promociones/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarPromocion)

export default router