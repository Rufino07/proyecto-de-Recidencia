// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

import { apiFetch } from './api.js'

// Clave de localStorage
const CLAVE_USUARIO = 'usuarioMegaMex'


// =====================================================
// GUARDAR USUARIO EN LOCALSTORAGE
// =====================================================

const guardarUsuario = (usuario) => {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario))
}


// =====================================================
// INICIAR SESIÓN
// =====================================================

export const iniciarSesion = async (correo, password) => {
  const correoLimpio = correo.trim().toLowerCase()

  try {
    const respuesta = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        correo: correoLimpio,
        password
      })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible iniciar sesión.')
    }

    if (datos.usuario) {
      guardarUsuario(datos.usuario)
    }

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}


// =====================================================
// REGISTRAR NUEVO USUARIO
// =====================================================
// NOTA: El backend ya NO loguea automáticamente.
// Ahora envía un correo de verificación. No se guarda
// usuario en localStorage hasta que verifique e inicie sesión.

export const registrarUsuario = async ({ nombre, correo, password }) => {
  const nombreLimpio = nombre.trim()
  const correoLimpio = correo.trim().toLowerCase()

  try {
    const respuesta = await apiFetch('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombreLimpio,
        correo: correoLimpio,
        password
      })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible crear la cuenta.')
    }

    // NO guardamos usuario en localStorage:
    // el usuario debe verificar su correo antes de iniciar sesión.

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}


// =====================================================
// OBTENER USUARIO ACTUAL
// =====================================================

export const obtenerUsuario = () => {
  const datos = localStorage.getItem(CLAVE_USUARIO)

  if (!datos) return null

  try {
    return JSON.parse(datos)
  } catch {
    localStorage.removeItem(CLAVE_USUARIO)
    return null
  }
}


// =====================================================
// OBTENER SESIÓN (compatibilidad)
// =====================================================

export const obtenerSesion = () => {
  const usuario = obtenerUsuario()
  if (!usuario) return null
  return { usuario }
}


// =====================================================
// OBTENER TOKEN (compatibilidad, siempre null)
// =====================================================

export const obtenerToken = () => null


// =====================================================
// SABER SI HAY UNA SESIÓN
// =====================================================

export const estaAutenticado = () => !!obtenerUsuario()


// =====================================================
// VERIFICAR ROL
// =====================================================

export const tieneRol = (rol) => {
  const usuario = obtenerUsuario()
  return usuario?.rol === rol
}


// =====================================================
// VERIFICAR ADMINISTRADOR
// =====================================================

export const esAdministrador = () => tieneRol('admin')


// =====================================================
// VERIFICAR CLIENTE
// =====================================================

export const esCliente = () => tieneRol('cliente')


// =====================================================
// CERRAR SESIÓN
// =====================================================

export const cerrarSesion = async () => {
  try {
    await apiFetch('/auth/logout', { method: 'POST' })
  } catch (err) {
    console.warn('Error cerrando sesión en servidor:', err)
  } finally {
    localStorage.removeItem(CLAVE_USUARIO)
  }
}


// =====================================================
// INICIAR SESIÓN CON FACEBOOK
// =====================================================

export const iniciarSesionFacebook = async (accessToken) => {
  try {
    const respuesta = await apiFetch('/auth/facebook', {
      method: 'POST',
      body: JSON.stringify({ accessToken })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible iniciar sesión con Facebook.')
    }

    if (datos.usuario) {
      guardarUsuario(datos.usuario)
    }

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}


// =====================================================
// SOLICITAR RECUPERACIÓN DE CONTRASEÑA
// =====================================================

export const forgotPassword = async (correo) => {
  const correoLimpio = correo.trim().toLowerCase()

  try {
    const respuesta = await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ correo: correoLimpio })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible procesar la solicitud.')
    }

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}


// =====================================================
// RESETEAR CONTRASEÑA
// =====================================================

export const resetPassword = async (token, password) => {
  try {
    const respuesta = await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible cambiar la contraseña.')
    }

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}


// =====================================================
// VERIFICAR EMAIL (a partir del token del enlace)
// =====================================================

export const verificarEmail = async (token) => {
  try {
    const respuesta = await apiFetch(
      `/auth/verificar-email?token=${encodeURIComponent(token)}`,
      { method: 'GET' }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible verificar el correo.')
    }

    return datos

  } catch (err) {
    if (err.esDeRed) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
    }
    throw err
  }
}