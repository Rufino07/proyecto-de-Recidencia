// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

// URL del backend (Node.js + Express)
const API_URL = 'http://localhost:3000/api'


// =====================================================
// CLAVE DE LOCALSTORAGE
// =====================================================

const CLAVE_SESION = 'sesionMegaMex'


// =====================================================
// GUARDAR SESIÓN
// =====================================================

const guardarSesion = (sesion) => {

  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(sesion)
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

    // Guardar sesión con token JWT real
    guardarSesion({
      token: datos.token,
      usuario: datos.usuario
    })

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

    // Guardar sesión automáticamente después del registro
    if (datos.token) {
      guardarSesion({
        token: datos.token,
        usuario: datos.usuario
      })
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
// OBTENER SESIÓN
// =====================================================

export const obtenerSesion = () => {

  const datos = localStorage.getItem(CLAVE_SESION)

  if (!datos) {
    return null
  }

  try {
    return JSON.parse(datos)
  }

  catch {
    localStorage.removeItem(CLAVE_SESION)
    return null
  }

}


// =====================================================
// OBTENER USUARIO ACTUAL
// =====================================================

export const obtenerUsuario = () => {

  const sesion = obtenerSesion()

  return sesion?.usuario || null

}


// =====================================================
// OBTENER TOKEN
// =====================================================

export const obtenerToken = () => {

  const sesion = obtenerSesion()

  return sesion?.token || null

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

export const cerrarSesion = () => {

  localStorage.removeItem(CLAVE_SESION)

}