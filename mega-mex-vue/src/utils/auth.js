// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

// URL del backend (Node.js + Express)
const API_URL = 'http://localhost:3000/api'


// =====================================================
// CLAVE DE LOCALSTORAGE
// =====================================================
// Solo guardamos el usuario (no el token, ese va en cookie httpOnly)

const CLAVE_USUARIO = 'usuarioMegaMex'


// =====================================================
// GUARDAR USUARIO EN LOCALSTORAGE
// =====================================================

const guardarUsuario = (usuario) => {
  localStorage.setItem(
    CLAVE_USUARIO,
    JSON.stringify(usuario)
  )
}


// =====================================================
// INICIAR SESIÓN
// =====================================================

export const iniciarSesion = async (correo, password) => {

  const correoLimpio = correo.trim().toLowerCase()

  try {

    const respuesta = await fetch(
      `${API_URL}/auth/login`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',   // ← NUEVO: enviar/recibir cookies

        body: JSON.stringify({
          correo: correoLimpio,
          password: password
        })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No fue posible iniciar sesión.'
      )
    }

    // El token ya está en la cookie httpOnly
    // Solo guardamos el usuario para saber quién está logueado
    if (datos.usuario) {
      guardarUsuario(datos.usuario)
    }

    return datos

  }

  catch (err) {

    if (err.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      )
    }

    throw err

  }

}


// =====================================================
// REGISTRAR NUEVO USUARIO
// =====================================================

export const registrarUsuario = async ({ nombre, correo, password }) => {

  const nombreLimpio = nombre.trim()
  const correoLimpio = correo.trim().toLowerCase()

  try {

    const respuesta = await fetch(
      `${API_URL}/auth/registro`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',   // ← NUEVO

        body: JSON.stringify({
          nombre: nombreLimpio,
          correo: correoLimpio,
          password: password
        })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No fue posible crear la cuenta.'
      )
    }

    // Guardar usuario (el token va en cookie)
    if (datos.usuario) {
      guardarUsuario(datos.usuario)
    }

    return datos

  }

  catch (err) {

    if (err.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      )
    }

    throw err

  }

}


// =====================================================
// OBTENER USUARIO ACTUAL
// =====================================================

export const obtenerUsuario = () => {

  const datos = localStorage.getItem(CLAVE_USUARIO)

  if (!datos) {
    return null
  }

  try {
    return JSON.parse(datos)
  }

  catch {
    localStorage.removeItem(CLAVE_USUARIO)
    return null
  }

}


// =====================================================
// OBTENER SESIÓN (compatibilidad)
// =====================================================

export const obtenerSesion = () => {

  const usuario = obtenerUsuario()

  if (!usuario) {
    return null
  }

  return {
    usuario
    // El token ya no se expone al frontend
  }

}


// =====================================================
// OBTENER TOKEN
// =====================================================
// El token ya no es accesible desde JS.
// Este método se mantiene por compatibilidad pero devuelve null.

export const obtenerToken = () => {
  return null
}


// =====================================================
// SABER SI HAY UNA SESIÓN
// =====================================================

export const estaAutenticado = () => {

  return !!obtenerUsuario()

}


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

export const esAdministrador = () => {

  return tieneRol('admin')

}


// =====================================================
// VERIFICAR CLIENTE
// =====================================================

export const esCliente = () => {

  return tieneRol('cliente')

}


// =====================================================
// CERRAR SESIÓN
// =====================================================

export const cerrarSesion = async () => {

  try {
    // Llamar al backend para que borre las cookies
    await fetch(
      `${API_URL}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )
  }

  catch (err) {
    console.warn('Error cerrando sesión en servidor:', err)
  }

  finally {
    // Limpiar el usuario del localStorage
    localStorage.removeItem(CLAVE_USUARIO)
  }

}


// =====================================================
// INICIAR SESIÓN CON FACEBOOK
// =====================================================

export const iniciarSesionFacebook = async (accessToken) => {

  try {

    const respuesta = await fetch(
      `${API_URL}/auth/facebook`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',   // ← cookies httpOnly

        body: JSON.stringify({ accessToken })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No fue posible iniciar sesión con Facebook.'
      )
    }

    // Guardar usuario (el token va en cookie)
    if (datos.usuario) {
      guardarUsuario(datos.usuario)
    }

    return datos

  }

  catch (err) {

    if (err.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      )
    }

    throw err

  }

}


// =====================================================
// SOLICITAR RECUPERACIÓN DE CONTRASEÑA
// =====================================================
// Envía el correo del usuario para pedir un enlace de reseteo

export const forgotPassword = async (correo) => {

  const correoLimpio = correo.trim().toLowerCase()

  try {

    const respuesta = await fetch(
      `${API_URL}/auth/forgot-password`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',

        body: JSON.stringify({ correo: correoLimpio })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No fue posible procesar la solicitud.'
      )
    }

    return datos

  }

  catch (err) {

    if (err.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      )
    }

    throw err

  }

}


// =====================================================
// RESETEAR CONTRASEÑA
// =====================================================
// Recibe el token del enlace y la nueva contraseña

export const resetPassword = async (token, password) => {

  try {

    const respuesta = await fetch(
      `${API_URL}/auth/reset-password`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',

        body: JSON.stringify({ token, password })
      }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No fue posible cambiar la contraseña.'
      )
    }

    return datos

  }

  catch (err) {

    if (err.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      )
    }

    throw err

  }

}