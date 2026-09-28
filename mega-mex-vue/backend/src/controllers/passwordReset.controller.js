// ============================================
// CONTROLADOR: RECUPERACIÓN DE CONTRASEÑA
// ============================================

import crypto from 'crypto'
import bcrypt from 'bcrypt'
import pool from '../config/db.js'

export const forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body

    if (!correo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El correo es obligatorio.'
      })
    }

    const resultado = await pool.query(
      'SELECT id, nombre, correo FROM usuarios WHERE correo = $1 AND activo = true',
      [correo.trim().toLowerCase()]
    )

    const respuestaGenerica = {
      ok: true,
      mensaje: 'Si el correo existe, recibirás un enlace de recuperación.'
    }

    if (resultado.rows.length === 0) {
      return res.json(respuestaGenerica)
    }

    const usuario = resultado.rows[0]

    const token = crypto.randomBytes(32).toString('hex')
    const expira = new Date(Date.now() + 60 * 60 * 1000)

    await pool.query(
      'UPDATE usuarios SET reset_token = $1, reset_token_expira = $2 WHERE id = $3',
      [token, expira, usuario.id]
    )

    const frontendUrl = process.env.FRONTEND_URL || 'https://localhost:5173'
    const enlace = `${frontendUrl}/reset-password?token=${token}`

    console.log('\n════════════════════════════════════════════')
    console.log('📧 RECUPERACIÓN DE CONTRASEÑA')
    console.log('════════════════════════════════════════════')
    console.log(`👤 Usuario: ${usuario.nombre}`)
    console.log(`📨 Correo:  ${usuario.correo}`)
    console.log(`🔗 Enlace:  ${enlace}`)
    console.log(`⏱️  Expira:  ${expira.toLocaleString('es-MX')}`)
    console.log('════════════════════════════════════════════\n')

    return res.json(respuestaGenerica)

  } catch (error) {
    console.error('❌ Error en forgotPassword:', error.message)
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al procesar la solicitud.'
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Token y contraseña son obligatorios.'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 8 caracteres.'
      })
    }

    const resultado = await pool.query(
      `SELECT id, nombre, correo
       FROM usuarios
       WHERE reset_token = $1
         AND reset_token_expira > NOW()
         AND activo = true`,
      [token]
    )

    if (resultado.rows.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El enlace es inválido o ha expirado.'
      })
    }

    const usuario = resultado.rows[0]

    const hash = await bcrypt.hash(password, 10)

    await pool.query(
      `UPDATE usuarios
       SET password_hash = $1,
           reset_token = NULL,
           reset_token_expira = NULL
       WHERE id = $2`,
      [hash, usuario.id]
    )

    console.log(`✅ Contraseña actualizada para: ${usuario.correo}`)

    return res.json({
      ok: true,
      mensaje: 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.'
    })

  } catch (error) {
    console.error('❌ Error en resetPassword:', error.message)
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al procesar la solicitud.'
    })
  }
}