// ============================================
// RUTAS: RECUPERACIÓN DE CONTRASEÑA
// ============================================

import { Router } from 'express'
import {
  forgotPassword,
  resetPassword
} from '../controllers/passwordReset.controller.js'

const router = Router()

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword)

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword)

export default router