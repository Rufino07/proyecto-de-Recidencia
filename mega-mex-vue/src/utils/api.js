// =====================================================
// CLIENTE HTTP CENTRALIZADO
// =====================================================
// Maneja todas las peticiones al backend.
// Si detecta 401 (sesión expirada), limpia y redirige al login.

const API_URL = '/api'

// =====================================================
// MANEJAR SESIÓN EXPIRADA
// =====================================================

const manejarSesionExpirada = (codigo) => {
  // Limpiar localStorage
  localStorage.removeItem('usuarioMegaMex')

  // Solo redirigir si no estamos ya en el login
  if (window.location.pathname !== '/login') {
    // Pasar código por URL para mostrar mensaje en Login.vue
    window.location.href = `/login?sesion=${codigo || 'expirada'}`
  }
}

// =====================================================
// PETICIÓN GENÉRICA
// =====================================================

export const apiFetch = async (endpoint, opciones = {}) => {
  const opcionesFinales = {
    credentials: 'include',   // ← SIEMPRE enviar cookies
    headers: {
      'Content-Type': 'application/json',
      ...(opciones.headers || {})
    },
    ...opciones
  }

  let respuesta

  try {
    respuesta = await fetch(`${API_URL}${endpoint}`, opcionesFinales)
  } catch (err) {
    // Error de red (backend apagado, sin internet, etc.)
    const error = new Error(
      'No se pudo conectar con el servidor. Verifica tu conexión.'
    )
    error.esDeRed = true
    throw error
  }

  // ============================================
  // DETECTAR 401 (SESIÓN EXPIRADA / NO AUTENTICADO)
  // ============================================

  if (respuesta.status === 401) {
    let datos = {}
    try {
      datos = await respuesta.clone().json()
    } catch {
      // Si no hay JSON, seguimos
    }

    // Solo manejar como expirada si NO es un login/registro
    const esRutaDeLogin =
      endpoint.includes('/auth/login') ||
      endpoint.includes('/auth/registro') ||
      endpoint.includes('/auth/forgot-password') ||
      endpoint.includes('/auth/reset-password')

    if (!esRutaDeLogin) {
      manejarSesionExpirada(datos.codigo)
    }
  }

  return respuesta
}