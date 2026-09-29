// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

import { Router } from 'express'

import {
  login,
  registro,
  logout,
  perfil,
  loginGoogle,
  loginFacebook,
  verificarEmail,
  reenviarVerificacion
} from '../controllers/auth.controller.js'

import {
  forgotPassword,
  resetPassword
} from '../controllers/passwordReset.controller.js'

import {
  validarLogin,
  validarRegistro,
  validarReenviarVerificacion
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

// POST /api/auth/google
router.post('/google', loginGoogle)

// POST /api/auth/facebook
router.post('/facebook', loginFacebook)

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword)

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword)

// GET /api/auth/verificar-email?token=...
router.get('/verificar-email', verificarEmail)

// POST /api/auth/reenviar-verificacion
router.post(
  '/reenviar-verificacion',
  validarReenviarVerificacion,
  reenviarVerificacion
)

// ============================================
// RUTAS PROTEGIDAS
// ============================================

// GET /api/auth/perfil
router.get('/perfil', verificarToken, perfil)

export default router