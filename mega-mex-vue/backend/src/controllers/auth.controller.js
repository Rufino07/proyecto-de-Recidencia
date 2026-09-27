// ============================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

// ============================================
// CONFIGURACIÓN DE COOKIES
// ============================================

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 2 * 60 * 60 * 1000  // 2 horas
}

const COOKIE_USUARIO_OPTIONS = {
  httpOnly: false,            // El frontend puede leerlo
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 2 * 60 * 60 * 1000  // 2 horas
}


// ============================================
// GENERAR TOKEN JWT
// ============================================

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }  // ← Reducido de 7d a 2h
  )
}


// ============================================
// LOGIN
// POST /api/auth/login
// ============================================

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body

    // Validar campos
    if (!correo || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Correo y contraseña son obligatorios.'
      })
    }

    const correoLimpio = correo.trim().toLowerCase()

    // Buscar usuario
    const resultado = await pool.query(
      `SELECT id, nombre, correo, password_hash, rol, activo
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Correo o contraseña incorrectos.'
      })
    }

    const usuario = resultado.rows[0]

    // Verificar si está activo
    if (!usuario.activo) {
      return res.status(403).json({
        ok: false,
        mensaje: 'Esta cuenta está desactivada.'
      })
    }

    // Verificar contraseña con bcrypt
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    )

    if (!passwordValida) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Correo o contraseña incorrectos.'
      })
    }

    // Generar token
    const token = generarToken(usuario)

    // Datos seguros del usuario (sin password_hash)
    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }

    // ============================================
    // GUARDAR EN COOKIES
    // ============================================

    // Cookie 1: token (httpOnly → inaccesible desde JS)
    res.cookie('token', token, COOKIE_OPTIONS)

    // Cookie 2: datos del usuario (NO httpOnly → el frontend los lee)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

    // ============================================
    // RESPONDER SIN EL TOKEN EN EL BODY
    // ============================================

    res.json({
      ok: true,
      usuario: usuarioSeguro
      // ⚠️ NO se envía el token en el body
    })

  } catch (err) {
    console.error('❌ Error en login:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al iniciar sesión.'
    })
  }
}


// ============================================
// REGISTRO (solo clientes)
// POST /api/auth/registro
// ============================================

export const registro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body

    // Validar campos
    if (!nombre || !correo || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Nombre, correo y contraseña son obligatorios.'
      })
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 6 caracteres.'
      })
    }

    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim().toLowerCase()

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correoLimpio)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ingresa un correo electrónico válido.'
      })
    }

    // Verificar que no sea el correo del admin
    if (correoLimpio === 'megamex.abarrotes@gmail.com') {
      return res.status(403).json({
        ok: false,
        mensaje: 'Este correo está reservado.'
      })
    }

    // Verificar si ya existe
    const existe = await pool.query(
      `SELECT id FROM usuarios WHERE LOWER(correo) = $1`,
      [correoLimpio]
    )

    if (existe.rows.length > 0) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya existe una cuenta con este correo.'
      })
    }

    // Hashear contraseña
    const hash = await bcrypt.hash(password, 10)

    // Insertar (SIEMPRE como cliente)
    const resultado = await pool.query(
      `INSERT INTO usuarios (nombre, correo, password_hash, rol)
       VALUES ($1, $2, $3, 'cliente')
       RETURNING id, nombre, correo, rol`,
      [nombreLimpio, correoLimpio, hash]
    )

    const nuevoUsuario = resultado.rows[0]

    // Generar token
    const token = generarToken(nuevoUsuario)

    // Datos seguros
    const usuarioSeguro = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol
    }

    // ============================================
    // GUARDAR EN COOKIES
    // ============================================

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

    // ============================================
    // RESPONDER
    // ============================================

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente.',
      usuario: usuarioSeguro
      // ⚠️ NO se envía el token en el body
    })

  } catch (err) {
    console.error('❌ Error en registro:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al crear la cuenta.'
    })
  }
}


// ============================================
// LOGOUT
// POST /api/auth/logout
// ============================================

export const logout = (req, res) => {
  try {
    // Borrar ambas cookies
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    res.clearCookie('usuario', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    res.json({
      ok: true,
      mensaje: 'Sesión cerrada correctamente.'
    })

  } catch (err) {
    console.error('❌ Error en logout:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al cerrar sesión.'
    })
  }
}


// ============================================
// OBTENER PERFIL (usuario autenticado)
// GET /api/auth/perfil
// ============================================

export const perfil = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo, creado_en
       FROM usuarios
       WHERE id = $1`,
      [req.usuario.id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado.'
      })
    }

    res.json({
      ok: true,
      usuario: resultado.rows[0]
    })

  } catch (err) {
    console.error('❌ Error en perfil:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor.'
    })
  }
}