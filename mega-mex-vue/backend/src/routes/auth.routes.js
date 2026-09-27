// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

import { Router } from 'express'

import {
  login,
  registro,
  logout,
  perfil
} from '../controllers/auth.controller.js'

import {
  validarLogin,
  validarRegistro
} from '../validators/auth.validator.js'

import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// POST /api/auth/login
router.post('/login', validarLogin, login)

// POST /api/auth/registro
router.post('/registro', validarRegistro, registro)

// POST /api/auth/logout
router.post('/logout', logout)

// ============================================
// RUTAS PROTEGIDAS
// ============================================

// GET /api/auth/perfil
router.get('/perfil', verificarToken, perfil)

export default router