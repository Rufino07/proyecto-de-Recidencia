// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

import { Router } from 'express'
import {
  login,
  registro,
  perfil
} from '../controllers/auth.controller.js'

import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// POST /api/auth/login
router.post('/login', login)

// POST /api/auth/registro
router.post('/registro', registro)

// ============================================
// RUTAS PROTEGIDAS
// ============================================

// GET /api/auth/perfil (requiere token)
router.get('/perfil', verificarToken, perfil)

export default router