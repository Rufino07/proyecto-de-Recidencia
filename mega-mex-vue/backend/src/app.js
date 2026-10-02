// ============================================
// CONFIGURACIÓN DE EXPRESS
// ============================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'

// Importar rutas
import authRoutes from './routes/auth.routes.js'
import productosRoutes from './routes/productos.routes.js'
import promocionesRoutes from './routes/promociones.routes.js'
import volantesRoutes from './routes/volantes.routes.js'
import sucursalesRoutes from './routes/sucursales.routes.js'
import redesRoutes from './routes/redes.routes.js'
import contactoRoutes from './routes/contacto.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'   // ← NUEVO
import usuariosRoutes from './routes/usuarios.routes.js'   // ← NUEVO

dotenv.config()

const app = express()

// ============================================
// SEGURIDAD: HEADERS (HELMET)
// ============================================

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false    // ← NUEVO: permite popups de Google
}))

// ============================================
// SEGURIDAD: CORS (LISTA BLANCA ESTRICTA)
// ============================================

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://localhost:5173',
  'https://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://127.0.0.1:5173',
  'https://127.0.0.1:5174',
  'https://eloquence-vagabond-shortage.ngrok-free.dev'   // ← NUEVA
]
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn('⚠️ CORS bloqueado para:', origin)
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
}))

// ============================================
// SEGURIDAD: RATE LIMITING
// ============================================

// Limite global: 200 requests por 15 min por IP
const limiterGlobal = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    ok: false,
    mensaje: 'Demasiadas peticiones. Intenta más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Limite estricto para auth: 10 intentos por 15 min por IP
const limiterAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    ok: false,
    mensaje: 'Demasiados intentos de login. Espera 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

app.use('/api/', limiterGlobal)
app.use('/api/auth/login', limiterAuth)
app.use('/api/auth/registro', limiterAuth)

// ============================================
// PARSERS DE BODY (CON LÍMITE) + COOKIES
// ============================================

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

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
app.use('/api/productos', productosRoutes)
app.use('/api/promociones', promocionesRoutes)
app.use('/api/volantes', volantesRoutes)
app.use('/api/sucursales', sucursalesRoutes)
app.use('/api/redes', redesRoutes)
app.use('/api/contacto', contactoRoutes)
app.use('/api/usuarios', usuariosRoutes)   // ← NUEVO
app.use('/api/categorias', categoriasRoutes)   // ← NUEVO
// ============================================
// RUTA NO ENCONTRADA
// ============================================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Recurso no encontrado.'
  })
})

// ============================================
// MANEJO GLOBAL DE ERRORES (SIN LEAKS)
// ============================================

app.use((err, req, res, next) => {
  console.error('❌ Error interno:', err.message)

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  res.status(err.status || 500).json({
    ok: false,
    mensaje: 'Error interno del servidor.'
  })
})

export default app