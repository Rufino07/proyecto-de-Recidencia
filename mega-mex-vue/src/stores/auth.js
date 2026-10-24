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
    // Toma el primer nombre (antes del primer espacio)
    return usuario.value.nombre.split(' ')[0]
  })

  const iniciales = computed(() => {
    if (!usuario.value?.nombre) return '?'
    const partes = usuario.value.nombre.trim().split(' ')
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase()
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
  })

  // ============================================
  // ACCIONES
  // ============================================

  /**
   * Carga el usuario desde /api/auth/perfil.
   * Se llama al iniciar la app (App.vue) y después del login.
   * Si no hay sesión, deja usuario = null.
   */
  const cargarUsuario = async () => {
    cargando.value = true
    try {
      const res = await fetch('/api/auth/perfil', {
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
   * Setea el usuario manualmente (después de un login exitoso).
   * Evita una llamada extra al backend.
   */
  const setUsuario = (u) => {
    usuario.value = u
    inicializado.value = true
  }

  /**
   * Cierra sesión: llama al backend y limpia el estado.
   */
  const cerrarSesion = async () => {
    try {
      await fetch('/api/auth/logout', {
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
    // estado
    usuario,
    cargando,
    inicializado,
    // getters
    estaLogueado,
    esAdmin,
    nombreCorto,
    iniciales,
    // acciones
    cargarUsuario,
    setUsuario,
    cerrarSesion
  }
})