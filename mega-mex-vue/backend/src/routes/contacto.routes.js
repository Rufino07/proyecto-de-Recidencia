// ============================================
// RUTAS DE CONTACTO
// ============================================

import { Router } from 'express'

import {
  enviarMensaje,
  listarMensajes,
  marcarLeido,
  eliminarMensaje
} from '../controllers/contacto.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

import { validarMensajeContacto } from '../validators/auth.validator.js'

const router = Router()

// ============================================
// RUTA PÚBLICA
// ============================================

// POST /api/contacto
router.post('/', validarMensajeContacto, enviarMensaje)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// GET /api/contacto
router.get('/', verificarToken, verificarAdmin, listarMensajes)

// PUT /api/contacto/:id
router.put('/:id', verificarToken, verificarAdmin, marcarLeido)

// DELETE /api/contacto/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarMensaje)

export default router