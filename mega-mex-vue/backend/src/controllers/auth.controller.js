// ============================================
// CONTROLADOR DE AUTENTICACIÓN
// ============================================

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import pool from '../config/db.js'
import { OAuth2Client } from 'google-auth-library'
import { enviarEmailVerificacion } from '../services/email.service.js'


 // ============================================
 // CONFIGURACIÓN DE COOKIES
 // ============================================

const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 2 * 60 * 60 * 1000
const JWT_EXPIRES = process.env.JWT_EXPIRES || '2h'

const esProduccion = process.env.NODE_ENV === 'production'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: esProduccion,
  sameSite: esProduccion ? 'none' : 'lax',
  maxAge: COOKIE_MAX_AGE
}

const COOKIE_USUARIO_OPTIONS = {
  httpOnly: false,
  secure: esProduccion,
  sameSite: esProduccion ? 'none' : 'lax',
  maxAge: COOKIE_MAX_AGE
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
    { expiresIn: JWT_EXPIRES }
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

    // 🔥 CAMBIO 4: se agrega avatar_url al SELECT
    const resultado = await pool.query(
      `SELECT id, nombre, correo, password_hash, rol, activo, email_verificado, avatar_url
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

    // Verificar si el correo está confirmado
    if (!usuario.email_verificado) {
      return res.status(403).json({
        ok: false,
        mensaje:
          'Debes verificar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.',
        codigo: 'EMAIL_NO_VERIFICADO'
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

    // 🔥 CAMBIO 4: se agrega avatar (null si no tiene)
    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      avatar: usuario.avatar_url || null
    }

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

    // Generar token de verificación
    const verificacionToken = crypto.randomBytes(32).toString('hex')
    const expiracion = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const tokenCreadoEn = new Date()

    // Insertar usuario con email_verificado = false
    const resultado = await pool.query(
      `INSERT INTO usuarios 
         (nombre, correo, password_hash, rol, email_verificado, verificacion_token, verificacion_token_expira, verificacion_token_creado_en)
       VALUES ($1, $2, $3, 'cliente', FALSE, $4, $5, $6)
       RETURNING id, nombre, correo, rol`,
      [nombreLimpio, correoLimpio, hash, verificacionToken, expiracion, tokenCreadoEn]
    )

    const nuevoUsuario = resultado.rows[0]

    // Enviar email de verificación
    try {
      await enviarEmailVerificacion(
        correoLimpio,
        nombreLimpio,
        verificacionToken
      )
    } catch (emailErr) {
      console.error('❌ Error enviando email de verificación:', emailErr.message)
    }

    res.status(201).json({
      ok: true,
      mensaje:
        'Cuenta creada. Revisa tu correo para verificar tu cuenta antes de iniciar sesión.',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
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
    const esProduccion = process.env.NODE_ENV === 'production'

    // Eliminar la cookie del token JWT
    res.clearCookie('token', {
      httpOnly: true,
      secure: esProduccion,
      sameSite: esProduccion ? 'none' : 'lax'
    })

    // Eliminar la cookie de información del usuario
    res.clearCookie('usuario', {
      httpOnly: false,
      secure: esProduccion,
      sameSite: esProduccion ? 'none' : 'lax'
    })

    // Confirmar que la sesión se cerró
    return res.json({
      ok: true,
      mensaje: 'Sesión cerrada correctamente.'
    })

  } catch (err) {
    console.error('❌ Error en logout:', err.message)

    return res.status(500).json({
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
    // 🔥 CAMBIO 3: se agrega avatar_url al SELECT
    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo, creado_en, avatar_url
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

    const u = resultado.rows[0]

    // 🔥 CAMBIO 3: se devuelve como "avatar" (consistente con login)
    res.json({
      ok: true,
      usuario: {
        id: u.id,
        nombre: u.nombre,
        correo: u.correo,
        rol: u.rol,
        activo: u.activo,
        creado_en: u.creado_en,
        avatar: u.avatar_url || null
      }
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
    const avatarUrl = picture || null

    // ==========================================
    // 2. BUSCAR USUARIO EN LA BD
    // 🔥 CAMBIO 1: se agrega avatar_url al SELECT
    // ==========================================

    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo, avatar_url
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    let usuario

    // ==========================================
    // 3. SI NO EXISTE → CREAR CON avatar_url
    // 🔥 CAMBIO 1: se guarda avatar_url en el INSERT
    // ==========================================

    if (resultado.rows.length === 0) {

      const insert = await pool.query(
        `INSERT INTO usuarios (nombre, correo, password_hash, rol, email_verificado, avatar_url)
         VALUES ($1, $2, $3, 'cliente', TRUE, $4)
         RETURNING id, nombre, correo, rol, activo, avatar_url`,
        [
          name || correoLimpio.split('@')[0],
          correoLimpio,
          'GOOGLE_OAUTH_NO_PASSWORD',
          avatarUrl
        ]
      )

      usuario = insert.rows[0]

    } else {
      usuario = resultado.rows[0]

      // 🔥 CAMBIO 1: si ya existía, actualizamos el avatar
      // (Google cambia las URLs de las fotos con el tiempo)
      if (avatarUrl && avatarUrl !== usuario.avatar_url) {
        await pool.query(
          `UPDATE usuarios
           SET avatar_url = $1, actualizado_en = NOW()
           WHERE id = $2`,
          [avatarUrl, usuario.id]
        )
        usuario.avatar_url = avatarUrl
      }
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
    // 🔥 CAMBIO 1: usamos avatar_url de la BD (fuente de verdad)
    // ==========================================

    const token = generarToken(usuario)

    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      avatar: usuario.avatar_url || null
    }

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

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
    // 🔥 CAMBIO 2: se agrega avatar_url al SELECT
    // ==========================================

    const resultado = await pool.query(
      `SELECT id, nombre, correo, rol, activo, avatar_url
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    let usuario

    // ==========================================
    // 5. SI NO EXISTE → CREAR CON avatar_url
    // 🔥 CAMBIO 2: se guarda avatar_url en el INSERT
    // ==========================================

    if (resultado.rows.length === 0) {
      const insert = await pool.query(
        `INSERT INTO usuarios (nombre, correo, password_hash, rol, email_verificado, avatar_url)
         VALUES ($1, $2, $3, 'cliente', TRUE, $4)
         RETURNING id, nombre, correo, rol, activo, avatar_url`,
        [
          name || correoLimpio.split('@')[0],
          correoLimpio,
          'FACEBOOK_OAUTH_NO_PASSWORD',
          avatarUrl
        ]
      )

      usuario = insert.rows[0]
    } else {
      usuario = resultado.rows[0]

      // 🔥 CAMBIO 2: si ya existía, actualizamos el avatar
      // (Facebook expira las URLs de sus fotos, hay que refrescarlas)
      if (avatarUrl && avatarUrl !== usuario.avatar_url) {
        await pool.query(
          `UPDATE usuarios
           SET avatar_url = $1, actualizado_en = NOW()
           WHERE id = $2`,
          [avatarUrl, usuario.id]
        )
        usuario.avatar_url = avatarUrl
      }
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
    // 🔥 CAMBIO 2: usamos avatar_url de la BD
    // ==========================================

    const token = generarToken(usuario)

    const usuarioSeguro = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      avatar: usuario.avatar_url || null
    }

    res.cookie('token', token, COOKIE_OPTIONS)
    res.cookie(
      'usuario',
      JSON.stringify(usuarioSeguro),
      COOKIE_USUARIO_OPTIONS
    )

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


// ============================================
// VERIFICAR EMAIL
// GET /api/auth/verificar-email?token=...
// ============================================

export const verificarEmail = async (req, res) => {
  try {
    const { token } = req.query

    if (!token) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Token de verificación faltante.'
      })
    }

    const resultado = await pool.query(
      `SELECT id, nombre, correo, email_verificado, verificacion_token_expira
       FROM usuarios
       WHERE verificacion_token = $1
       LIMIT 1`,
      [token]
    )

    if (resultado.rows.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Token inválido o ya usado.'
      })
    }

    const usuario = resultado.rows[0]

    if (usuario.email_verificado) {
      return res.json({
        ok: true,
        mensaje: 'Tu correo ya estaba verificado. Puedes iniciar sesión.'
      })
    }

    if (
      usuario.verificacion_token_expira &&
      new Date(usuario.verificacion_token_expira) < new Date()
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El enlace de verificación ha expirado. Solicita uno nuevo.'
      })
    }

    await pool.query(
      `UPDATE usuarios
       SET email_verificado = TRUE,
           verificacion_token = NULL,
           verificacion_token_expira = NULL,
           verificacion_token_creado_en = NULL,
           actualizado_en = NOW()
       WHERE id = $1`,
      [usuario.id]
    )

    console.log('✅ Email verificado:', usuario.correo)

    res.json({
      ok: true,
      mensaje: '¡Correo verificado correctamente! Ya puedes iniciar sesión.'
    })

  } catch (err) {
    console.error('❌ Error en verificarEmail:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al verificar el correo.'
    })
  }
}


// ============================================
// REENVIAR EMAIL DE VERIFICACIÓN
// POST /api/auth/reenviar-verificacion
// ============================================

export const reenviarVerificacion = async (req, res) => {
  try {
    const { correo } = req.body

    if (!correo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El correo es obligatorio.'
      })
    }

    const correoLimpio = correo.trim().toLowerCase()

    const RESPUESTA_GENERICA = {
      ok: true,
      mensaje:
        'Si el correo está registrado y sin verificar, te enviamos un nuevo enlace. Revisa tu bandeja de entrada (y spam).'
    }

    const resultado = await pool.query(
      `SELECT id, nombre, correo, email_verificado,
              verificacion_token_creado_en
       FROM usuarios
       WHERE LOWER(correo) = $1
       LIMIT 1`,
      [correoLimpio]
    )

    if (resultado.rows.length === 0) {
      return res.json(RESPUESTA_GENERICA)
    }

    const usuario = resultado.rows[0]

    if (usuario.email_verificado) {
      return res.json(RESPUESTA_GENERICA)
    }

    // RATE LIMIT: 1 reenvío cada 5 minutos
    if (usuario.verificacion_token_creado_en) {
      const ahora = Date.now()
      const creadoEn = new Date(usuario.verificacion_token_creado_en).getTime()
      const minutosTranscurridos = (ahora - creadoEn) / 1000 / 60

      if (minutosTranscurridos < 5) {
        console.log(
          `⏳ Reenvío bloqueado por rate limit: ${usuario.correo} ` +
          `(${minutosTranscurridos.toFixed(1)} min)`
        )
        return res.json(RESPUESTA_GENERICA)
      }
    }

    const nuevoToken = crypto.randomBytes(32).toString('hex')
    const nuevaExpiracion = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const nuevoCreadoEn = new Date()

    await pool.query(
      `UPDATE usuarios
       SET verificacion_token = $1,
           verificacion_token_expira = $2,
           verificacion_token_creado_en = $3,
           actualizado_en = NOW()
       WHERE id = $4`,
      [nuevoToken, nuevaExpiracion, nuevoCreadoEn, usuario.id]
    )

    try {
      await enviarEmailVerificacion(
        usuario.correo,
        usuario.nombre,
        nuevoToken
      )
      console.log('✅ Email de verificación reenviado:', usuario.correo)
    } catch (emailErr) {
      console.error(
        '❌ Error reenviando email de verificación:',
        emailErr.message
      )
    }

    res.json(RESPUESTA_GENERICA)

  } catch (err) {
    console.error('❌ Error en reenviarVerificacion:', err.message)
    res.status(500).json({
      ok: false,
      mensaje: 'Error del servidor al reenviar el correo.'
    })
  }
}