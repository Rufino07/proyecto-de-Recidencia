// ============================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
import { OAuth2Client } from 'google-auth-library'

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
// GOOGLE OAUTH CLIENT
// ============================================

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// ============================================
// FACEBOOK OAUTH
// ============================================

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
const FACEBOOK_GRAPH_VERSION = 'v19.0'
const FACEBOOK_GRAPH_URL = `https://graph.facebook.com/${FACEBOOK_GRAPH_VERSION}`
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
    { expiresIn: '2h' }
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

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

    res.json({
      ok: true,
      usuario: usuarioSeguro
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

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente.',
      usuario: usuarioSeguro
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


// ============================================
// LOGIN CON GOOGLE
// POST /api/auth/google
// ============================================

export const loginGoogle = async (req, res) => {
  try {
    const { credential } = req.body

    // Validar que venga el token de Google
    if (!credential) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Falta el token de Google.'
      })
    }

    // ==========================================
    // 1. VERIFICAR TOKEN CON GOOGLE
    // ==========================================

    let payload

    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      payload = ticket.getPayload()

    } catch (err) {
      console.error('❌ Token de Google inválido:', err.message)
      return res.status(401).json({
        ok: false,
        mensaje: 'Token de Google inválido o expirado.'
      })
    }

    const { email, name, picture } = payload

    if (!email) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Google no proporcionó un correo válido.'
      })
    }

    const correoLimpio = email.trim().toLowerCase()

    // ==========================================
    // 2. BUSCAR USUARIO EN LA BD
    // ==========================================

    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    let usuario

    // ==========================================
    // 3. SI NO EXISTE → CREAR COMO CLIENTE
    // ==========================================

    if (resultado.rows.length === 0) {

      const insert = await pool.query(
        `INSERT INTO usuarios (nombre, correo, password_hash, rol)
         VALUES ($1, $2, $3, 'cliente')
         RETURNING id, nombre, correo, rol, activo`,
        [
          name || correoLimpio.split('@')[0],
          correoLimpio,
          'GOOGLE_OAUTH_NO_PASSWORD'
        ]
      )

      usuario = insert.rows[0]

    } else {
      usuario = resultado.rows[0]
    }

    // ==========================================
    // 4. VERIFICAR QUE ESTÉ ACTIVO
    // ==========================================

    if (!usuario.activo) {
      return res.status(403).json({
        ok: false,
        mensaje: 'Esta cuenta está desactivada.'
      })
    }

    // ==========================================
    // 5. GENERAR TOKEN Y GUARDAR COOKIES
    // ==========================================

    const token = generarToken(usuario)

    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      avatar: picture || null
    }

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

    // ==========================================
    // 6. RESPONDER
    // ==========================================

    res.json({
      ok: true,
      mensaje: 'Login con Google exitoso.',
      usuario: usuarioSeguro
    })

  } catch (err) {
    console.error('❌ Error en loginGoogle:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al iniciar sesión con Google.'
    })
  }
}
// ============================================
// LOGIN CON FACEBOOK
// POST /api/auth/facebook
// ============================================

export const loginFacebook = async (req, res) => {
  try {
    const { accessToken } = req.body

    // ==========================================
    // 1. VALIDAR QUE VENGA EL TOKEN
    // ==========================================

    if (!accessToken) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Falta el token de Facebook.'
      })
    }

    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
      console.error('❌ Faltan FACEBOOK_APP_ID o FACEBOOK_APP_SECRET en .env')
      return res.status(500).json({
        ok: false,
        mensaje: 'Configuración de Facebook incompleta en el servidor.'
      })
    }

    // ==========================================
    // 2. VERIFICAR TOKEN CON /debug_token
    // ==========================================

    const debugUrl =
      `${FACEBOOK_GRAPH_URL}/debug_token` +
      `?input_token=${encodeURIComponent(accessToken)}` +
      `&access_token=${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`

    const debugResp = await fetch(debugUrl)
    const debugData = await debugResp.json()

    if (!debugData.data || !debugData.data.is_valid) {
      console.error('❌ Token de Facebook inválido:', debugData)
      return res.status(401).json({
        ok: false,
        mensaje: 'Token de Facebook inválido o expirado.'
      })
    }

    if (String(debugData.data.app_id) !== String(FACEBOOK_APP_ID)) {
      console.error('❌ Token de Facebook de otra app:', debugData.data.app_id)
      return res.status(401).json({
        ok: false,
        mensaje: 'El token no pertenece a esta aplicación.'
      })
    }

    // ==========================================
    // 3. OBTENER DATOS DEL USUARIO CON /me
    // ==========================================

    const meUrl =
      `${FACEBOOK_GRAPH_URL}/me` +
      `?fields=id,name,email,picture.type(large)` +
      `&access_token=${encodeURIComponent(accessToken)}`

    const meResp = await fetch(meUrl)
    const meData = await meResp.json()

    if (meData.error) {
      console.error('❌ Error Graph API /me:', meData.error)
      return res.status(401).json({
        ok: false,
        mensaje: 'No se pudo obtener el perfil de Facebook.'
      })
    }

    const { email, name, picture } = meData

    if (!email) {
      return res.status(400).json({
        ok: false,
        mensaje:
          'Facebook no proporcionó un correo. ' +
          'Autoriza el acceso al correo o usa otro método de login.'
      })
    }

    const correoLimpio = email.trim().toLowerCase()
    const avatarUrl = picture?.data?.url || null

    // ==========================================
    // 4. BUSCAR USUARIO EN LA BD
    // ==========================================

    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    let usuario

    // ==========================================
    // 5. SI NO EXISTE → CREAR COMO CLIENTE
    // ==========================================

    if (resultado.rows.length === 0) {
      const insert = await pool.query(
        `INSERT INTO usuarios (nombre, correo, password_hash, rol)
         VALUES ($1, $2, $3, 'cliente')
         RETURNING id, nombre, correo, rol, activo`,
        [
          name || correoLimpio.split('@')[0],
          correoLimpio,
          'FACEBOOK_OAUTH_NO_PASSWORD'
        ]
      )

      usuario = insert.rows[0]
    } else {
      usuario = resultado.rows[0]
    }

    // ==========================================
    // 6. VERIFICAR QUE ESTÉ ACTIVO
    // ==========================================

    if (!usuario.activo) {
      return res.status(403).json({
        ok: false,
        mensaje: 'Esta cuenta está desactivada.'
      })
    }

    // ==========================================
    // 7. GENERAR TOKEN Y GUARDAR COOKIES
    // ==========================================

    const token = generarToken(usuario)

    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      avatar: avatarUrl
    }

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

    // ==========================================
    // 8. RESPONDER
    // ==========================================

    res.json({
      ok: true,
      mensaje: 'Login con Facebook exitoso.',
      usuario: usuarioSeguro
    })

  } catch (err) {
    console.error('❌ Error en loginFacebook:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al iniciar sesión con Facebook.'
    })
  }
}