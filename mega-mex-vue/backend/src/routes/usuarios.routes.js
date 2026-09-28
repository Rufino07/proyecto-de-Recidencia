// ============================================
// RUTAS DE USUARIOS (solo admin)
// ============================================

import { Router } from 'express'

import {
  listarUsuarios,
  cambiarRol,
  cambiarEstado
} from '../controllers/usuarios.controller.js'

import {
  verificarToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js'

const router = Router()

// ============================================
// MIDDLEWARES GLOBALES PARA ESTE ROUTER
// Todas las rutas requieren: sesión válida + rol admin
// ============================================

router.use(verificarToken, verificarAdmin)

// ============================================
// RUTAS
// ============================================

// GET /api/usuarios
// Lista usuarios con búsqueda/filtros opcionales
router.get('/', listarUsuarios)

// PUT /api/usuarios/:id/rol
// Body: { rol: 'admin' | 'cliente' }
router.put('/:id/rol', cambiarRol)

// PUT /api/usuarios/:id/estado
// Body: { activo: true | false }
router.put('/:id/estado', cambiarEstado)

export default router