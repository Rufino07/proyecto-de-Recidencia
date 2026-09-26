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

const router = Router()

// ============================================
// RUTA PÚBLICA
// ============================================

// POST /api/contacto
// El cliente envía un mensaje (NO necesita login)
router.post('/', enviarMensaje)

// ============================================
// RUTAS SOLO ADMIN
// ============================================

// GET /api/contacto
// El admin ve todos los mensajes recibidos
router.get('/', verificarToken, verificarAdmin, listarMensajes)

// PUT /api/contacto/:id
// El admin marca/desmarca como leído
router.put('/:id', verificarToken, verificarAdmin, marcarLeido)

// DELETE /api/contacto/:id
// El admin elimina un mensaje
router.delete('/:id', verificarToken, verificarAdmin, eliminarMensaje)

export default router