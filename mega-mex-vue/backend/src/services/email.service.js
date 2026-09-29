// ============================================
// SERVICIO DE EMAILS (RESEND)
// ============================================
// Envía correos transaccionales de Mega-Mex
// usando la API de Resend.
// ============================================

import { Resend } from 'resend'

// Inicializar cliente de Resend con la API Key del .env
const resend = new Resend(process.env.RESEND_API_KEY)

// Remitente (en dev: onboarding@resend.dev; en prod: no-reply@megamex.com)
const REMITENTE = process.env.RESEND_FROM || 'onboarding@resend.dev'

// URL del frontend (para construir enlaces en los correos)
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://localhost:5173'

// ============================================
// PLANTILLA BASE (diseño del correo)
// ============================================

function plantillaBase(titulo, contenidoHTML) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${titulo}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 30px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
              <!-- Encabezado -->
              <tr>
                <td style="background-color: #C8102E; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 1px;">
                    🛒 Mega-Mex
                  </h1>
                </td>
              </tr>
              <!-- Contenido -->
              <tr>
                <td style="padding: 40px 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                  ${contenidoHTML}
                </td>
              </tr>
              <!-- Pie -->
              <tr>
                <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; color: #888888; font-size: 13px;">
                  <p style="margin: 0 0 8px 0;">
                    Este correo fue enviado automáticamente por Mega-Mex.
                  </p>
                  <p style="margin: 0;">
                    Si no solicitaste esto, puedes ignorar este mensaje.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// ============================================
// ENVIAR EMAIL DE VERIFICACIÓN
// ============================================
// Se envía al registrarse. Contiene el enlace
// con el token que el usuario debe hacer clic.
// ============================================

export async function enviarEmailVerificacion(destinatario, nombre, token) {
  const enlace = `${FRONTEND_URL}/verificar-email?token=${token}`

  const contenidoHTML = `
    <h2 style="color: #C8102E; margin-top: 0;">¡Hola, ${nombre}!</h2>
    <p>
      Gracias por registrarte en <strong>Mega-Mex</strong>. 
      Para activar tu cuenta, necesitamos confirmar tu correo electrónico.
    </p>
    <p>
      Haz clic en el siguiente botón para verificar tu cuenta:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${enlace}" 
         style="background-color: #C8102E; color: #ffffff; padding: 14px 30px; 
                text-decoration: none; border-radius: 6px; font-weight: bold; 
                display: inline-block; font-size: 16px;">
        Verificar mi cuenta
      </a>
    </div>
    <p style="font-size: 14px; color: #666;">
      O copia y pega este enlace en tu navegador:
    </p>
    <p style="font-size: 13px; color: #0066cc; word-break: break-all;">
      ${enlace}
    </p>
    <p style="font-size: 14px; color: #999; margin-top: 30px;">
      ⏱️ Este enlace expira en <strong>24 horas</strong>.
    </p>
  `

  const html = plantillaBase('Verifica tu cuenta - Mega-Mex', contenidoHTML)

  try {
    const { data, error } = await resend.emails.send({
      from: REMITENTE,
      to: destinatario,
      subject: 'Verifica tu cuenta - Mega-Mex',
      html
    })

    if (error) {
      console.error('❌ Error al enviar email de verificación:', error)
      throw new Error(error.message || 'Error al enviar email')
    }

    console.log('✅ Email de verificación enviado:', data.id)
    return { ok: true, id: data.id }

  } catch (err) {
    console.error('❌ Error en enviarEmailVerificacion:', err.message)
    throw err
  }
}

// ============================================
// EXPORT DEFAULT (por si se necesita el cliente)
// ============================================

export default resend