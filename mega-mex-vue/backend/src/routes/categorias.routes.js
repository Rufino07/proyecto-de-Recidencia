// ============================================
// RUTAS DE CATEGORÍAS
// ============================================

import { Router } from 'express'
import { listarCategorias } from '../controllers/categorias.controller.js'

const router = Router()

// ============================================
// RUTAS PÚBLICAS
// ============================================

// GET /api/categorias - Listar todas las categorías activas
router.get('/', listarCategorias)

export default router