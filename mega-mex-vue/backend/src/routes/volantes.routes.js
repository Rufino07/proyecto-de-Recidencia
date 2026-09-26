// ============================================
// RUTAS DE VOLANTES (FLYERS)
// ============================================

import { Router } from 'express'

import {
  listarVolantes,
  obtenerVolante,
  crearVolante,
  editarVolante,
  eliminarVolante
} from '../controllers/volantes.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// GET /api/volantes
router.get('/', listarVolantes)

// GET /api/volantes/:id
router.get('/:id', obtenerVolante)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// POST /api/volantes
router.post('/', verificarToken, verificarAdmin, crearVolante)

// PUT /api/volantes/:id
router.put('/:id', verificarToken, verificarAdmin, editarVolante)

// DELETE /api/volantes/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarVolante)

export default router