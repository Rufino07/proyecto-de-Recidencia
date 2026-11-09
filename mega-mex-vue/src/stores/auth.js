
 // ============================================
 // STORE DE AUTENTICACIÓN
 // ============================================
 // Maneja el estado global del usuario logueado:
 // - usuario (objeto con id, nombre, correo, rol, avatar)
 // - cargando (para no parpadear el navbar al inicio)
 // - inicializado (para no llamar /perfil más de una vez)
 // ============================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// URL de la API para desarrollo y producción
const API_URL = import.meta.env.VITE_API_URL || '/api'

export const useAuthStore = defineStore('auth', () => {
  // ============================================
  // ESTADO
  // ============================================

  const usuario = ref(null)
  const cargando = ref(false)
  const inicializado = ref(false)

  // ============================================
  // GETTERS (computed)
  // ============================================

  const estaLogueado = computed(() => usuario.value !== null)

  const esAdmin = computed(() => usuario.value?.rol === 'admin')

  const nombreCorto = computed(() => {
    if (!usuario.value?.nombre) return ''
    return usuario.value.nombre.split(' ')[0]
  })

  const iniciales = computed(() => {
    if (!usuario.value?.nombre) return '?'
    const partes = usuario.value.nombre.trim().split(' ')
    if (partes.length === 1) {
      return partes[0].charAt(0).toUpperCase()
    }
    return (
      partes[0].charAt(0) +
      partes[partes.length - 1].charAt(0)
    ).toUpperCase()
  })

  // ============================================
  // ACCIONES
  // ============================================

  /**
   * Carga el usuario desde la API REST.
   * Se llama al iniciar la app y después del login.
   * Si no hay sesión, deja usuario = null.
   */
  const cargarUsuario = async () => {
    cargando.value = true

    try {
      const res = await fetch(`${API_URL}/auth/perfil`, {
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()
        usuario.value = data.usuario || null
      } else {
        usuario.value = null
      }
    } catch (err) {
      console.error('❌ Error al cargar usuario:', err)
      usuario.value = null
    } finally {
      cargando.value = false
      inicializado.value = true
    }
  }

  /**
   * Establece el usuario después de un login exitoso.
   */
  const setUsuario = (u) => {
    usuario.value = u
    inicializado.value = true
  }

  /**
   * Cierra sesión en el backend
   * y limpia el estado del usuario.
   */
  const cerrarSesion = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err)
    } finally {
      usuario.value = null
    }
  }

  return {
    usuario,
    cargando,
    inicializado,
    estaLogueado,
    esAdmin,
    nombreCorto,
    iniciales,
    cargarUsuario,
    setUsuario,
    cerrarSesion
  }
})
