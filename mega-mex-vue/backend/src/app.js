// ============================================
// CONFIGURACIÓN DE EXPRESS
// ============================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Importar rutas
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ============================================
// RUTA DE PRUEBA
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Backend Mega-Mex funcionando 🚀',
    timestamp: new Date().toISOString()
  })
})

// ============================================
// RUTAS DE LA API
// ============================================

app.use('/api/auth', authRoutes)

// ============================================
// RUTA NO ENCONTRADA
// ============================================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  })
})

// ============================================
// MANEJO GLOBAL DE ERRORES
// ============================================

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(err.status || 500).json({
    ok: false,
    mensaje: err.message || 'Error interno del servidor'
  })
})

export default app