// ============================================
// RUTAS DE REDES SOCIALES
// ============================================

import { Router } from 'express'

import {
  obtenerRedes,
  actualizarRedes
} from '../controllers/redes.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTA PÚBLICA
// ============================================

// GET /api/redes
router.get('/', obtenerRedes)

// ============================================
// RUTA SOLO ADMIN
// ============================================

// PUT /api/redes
router.put('/', verificarToken, verificarAdmin, actualizarRedes)

export default router