// ============================================
// MIDDLEWARE DE AUTENTICACIÓN JWT
// ============================================

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// ============================================
// VERIFICAR TOKEN (lee de cookie)
// ============================================

export const verificarToken = (req, res, next) => {
  try {
    // Leer token de la cookie (no del header)
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Token no proporcionado.'
      })
    }

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardar usuario en el request
    req.usuario = decoded

    next()

  } catch (err) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token inválido o expirado.'
    })
  }
}

// ============================================
// VERIFICAR ADMIN
// ============================================

export const verificarAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({
      ok: false,
      mensaje: 'Acceso denegado. Se requiere rol de administrador.'
    })
  }

  next()
}

// ============================================
// VERIFICAR CLIENTE
// ============================================

export const verificarCliente = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      ok: false,
      mensaje: 'No autenticado.'
    })
  }

  next()
}