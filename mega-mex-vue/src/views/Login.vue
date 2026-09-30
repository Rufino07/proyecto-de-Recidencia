<template>
  <main class="pagina-login">

    <div class="fondo-luz luz-1"></div>
    <div class="fondo-luz luz-2"></div>
    <div class="fondo-luz luz-3"></div>

    <div class="particulas">
      <span
        v-for="n in 12"
        :key="n"
        :class="`particula particula-${n}`"
      ></span>
    </div>

    <section class="login-card">

     

      <section class="formulario">

        <div class="encabezado">

          <div
            class="icono-usuario"
            :class="{ admin: tipoAcceso === 'admin' }"
          >
            <span :key="tipoAcceso" class="icono-cambio">
              {{ tipoAcceso === 'usuario' ? '👤' : '🔐' }}
            </span>
          </div>

          <h2>Iniciar sesión</h2>
          <p>Selecciona tu tipo de acceso</p>

        </div>

        <div class="selector">

          <div
            class="selector-fondo"
            :class="{ mover: tipoAcceso === 'admin' }"
          ></div>

          <button
            type="button"
            :class="{ activo: tipoAcceso === 'usuario' }"
            @click="cambiarTipo('usuario')"
          >
            <span>👤</span>
            Usuario
          </button>

          <button
            type="button"
            :class="{ activo: tipoAcceso === 'admin' }"
            @click="cambiarTipo('admin')"
          >
            <span>🔐</span>
            Administrador
          </button>

        </div>

        <Transition name="cambio" mode="out-in">

          <div :key="tipoAcceso" class="contenido-login">

            <div class="tipo-info">

              <h3 v-if="tipoAcceso === 'usuario'">
                Acceso de usuario
              </h3>

              <h3 v-else>
                Acceso administrativo
              </h3>

              <p v-if="tipoAcceso === 'usuario'">
                Ingresa con tu cuenta o crea una nueva.
              </p>

              <p v-else>
                Acceso exclusivo para personal autorizado.
              </p>

            </div>

            <form autocomplete="off" @submit.prevent="login">

              <div class="campo">

                <label for="correo">Correo electrónico</label>

                <div
                  class="input-contenedor"
                  :class="{
                    'input-valido': correoFeedback.valido === true,
                    'input-invalido': correoFeedback.valido === false
                  }"
                >

                  <span class="icono-input">✉️</span>

                  <input
                    id="correo"
                    v-model="correo"
                    type="email"
                    name="correo_login_megamex"
                    placeholder="correo@ejemplo.com"
                    autocomplete="new-password"
                    autocapitalize="off"
                    autocorrect="off"
                    spellcheck="false"
                    :disabled="cargando"
                  >

                  <Transition name="feedback">
                    <span
                      v-if="correoFeedback.valido === true"
                      class="feedback-icono feedback-ok"
                    >✓</span>
                    <span
                      v-else-if="correoFeedback.valido === false"
                      class="feedback-icono feedback-error"
                    >!</span>
                  </Transition>

                </div>

                <Transition name="feedback">
                  <p
                    v-if="correoFeedback.valido !== null"
                    class="feedback-mensaje"
                    :class="correoFeedback.valido ? 'texto-ok' : 'texto-error'"
                  >
                    {{ correoFeedback.mensaje }}
                  </p>
                </Transition>

              </div>

              <div class="campo">

                <label for="password">Contraseña</label>

                <div
                  class="input-contenedor"
                  :class="{
                    'input-valido': passwordFeedback.valido === true,
                    'input-invalido': passwordFeedback.valido === false
                  }"
                >

                  <span class="icono-input">🔒</span>

                  <input
                    id="password"
                    v-model="password"
                    :type="mostrarPassword ? 'text' : 'password'"
                    name="password_login_megamex"
                    placeholder="Ingresa tu contraseña"
                    autocomplete="new-password"
                    autocapitalize="off"
                    autocorrect="off"
                    spellcheck="false"
                    :disabled="cargando"
                  >

                  <button
                    type="button"
                    class="mostrar-password"
                    :disabled="cargando"
                    @click="mostrarPassword = !mostrarPassword"
                  >
                    {{ mostrarPassword ? '🙈' : '👁️' }}
                  </button>

                </div>

                <Transition name="feedback">
                  <p
                    v-if="passwordFeedback.valido !== null"
                    class="feedback-mensaje"
                    :class="passwordFeedback.valido ? 'texto-ok' : 'texto-error'"
                  >
                    {{ passwordFeedback.mensaje }}
                  </p>
                </Transition>

              </div>

              <Transition name="mensaje">
                <div v-if="error" class="mensaje-error">
                  <span>⚠️</span>
                  {{ error }}
                </div>
              </Transition>

              <Transition name="mensaje">
                <div v-if="mensaje" class="mensaje-info">
                  <span>ℹ️</span>
                  {{ mensaje }}
                </div>
              </Transition>

              <button
                type="submit"
                class="btn-login"
                :disabled="cargando || !formularioValido"
              >

                <span class="brillo"></span>

                <span v-if="cargando" class="loader"></span>

                <span v-if="cargando">
                  Verificando acceso...
                </span>

                <span v-else-if="tipoAcceso === 'admin'">
                  Iniciar como administrador
                  <span class="flecha">→</span>
                </span>

                <span v-else>
                  Iniciar sesión
                  <span class="flecha">→</span>
                </span>

              </button>

            </form>

            <!-- Link olvidé mi contraseña (solo para usuarios) -->
            <div v-if="tipoAcceso === 'usuario'" class="olvide-link">
              <button type="button" @click="irAOlvidePassword">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <!-- ============================================ -->
            <!-- BLOQUE DE REENVÍO DE VERIFICACIÓN (NUEVO)   -->
            <!-- Solo aparece cuando el login falla por      -->
            <!-- correo no verificado                        -->
            <!-- ============================================ -->

            <Transition name="mensaje">
              <div v-if="mostrarReenvio" class="reenvio-bloque">

                <div class="reenvio-info">
                  <span>📧</span>
                  <div>
                    <strong>¿No recibiste el correo?</strong>
                    <p>Podemos enviarte uno nuevo para verificar tu cuenta.</p>
                  </div>
                </div>

                <div v-if="!reenvioExitoso" class="reenvio-form">

                  <div class="campo-reenvio">
                    <label for="correo-reenvio">Correo electrónico</label>
                    <input
                      id="correo-reenvio"
                      v-model="correoReenvio"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      autocomplete="off"
                      :disabled="reenviando"
                    >
                  </div>

                  <button
                    type="button"
                    class="btn-reenviar"
                    :disabled="reenviando || !correoReenvioValido"
                    @click="reenviar"
                  >
                    <span v-if="reenviando" class="loader loader-oscuro"></span>
                    <span v-if="reenviando">Enviando...</span>
                    <span v-else>Reenviar correo</span>
                  </button>

                </div>

                <div v-else class="reenvio-ok">
                  <span>✅</span>
                  <p>{{ reenvioMensaje }}</p>
                </div>

              </div>
            </Transition>

            <template v-if="tipoAcceso === 'usuario'">

              <div class="separador">
                <span></span>
                <p>o continuar con</p>
                <span></span>
              </div>

              <div class="login-social">

                <button
                  type="button"
                  class="social-btn google-btn"
                  title="Continuar con Google"
                  aria-label="Continuar con Google"
                  :disabled="cargandoGoogle"
                  @click="loginSocial('Google')"
                >

                  <span class="social-icon google-icon">

                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path fill="#4285F4" d="M21.35 12.18c0-.64-.06-1.26-.17-1.86H12v3.52h5.25a4.49 4.49 0 0 1-1.95 2.95v2.29h3.16c1.85-1.7 2.89-4.22 2.89-6.9Z" />
                      <path fill="#34A853" d="M12 21.7c2.64 0 4.86-.87 6.48-2.37l-3.16-2.29c-.88.59-2 .94-3.32.94-2.55 0-4.71-1.72-5.48-4.03H3.26v2.36A9.79 9.79 0 0 0 12 21.7Z" />
                      <path fill="#FBBC05" d="M6.52 13.95A5.9 5.9 0 0 1 6.21 12c0-.68.12-1.34.31-1.95V7.69H3.26A9.8 9.8 0 0 0 2.2 12c0 1.57.38 3.06 1.06 4.31l3.26-2.36Z" />
                      <path fill="#EA4335" d="M12 6.02c1.44 0 2.73.5 3.75 1.47l2.8-2.8A9.39 9.39 0 0 0 12 2.3a9.79 9.79 0 0 0-8.74 5.39l3.26 2.36C7.29 7.74 9.45 6.02 12 6.02Z" />
                    </svg>

                  </span>

                  <span class="social-nombre">
                    {{ cargandoGoogle ? 'Conectando...' : 'Google' }}
                  </span>

                </button>

               <button
  type="button"
  class="social-btn facebook-btn"
  title="Continuar con Facebook"
  aria-label="Continuar con Facebook"
  :disabled="cargandoFacebook"
  @click="loginSocial('Facebook')"
>

  <span class="social-icon facebook-icon">f</span>

  <span class="social-nombre">
    {{ cargandoFacebook ? 'Conectando...' : 'Facebook' }}
  </span>

</button>

              </div>

              <div class="crear-cuenta">

                <span>¿No tienes una cuenta?</span>

                <button type="button" @click="irARegistro">
                  Crear una cuenta
                </button>

              </div>

            </template>

            <div v-else class="seguridad-admin">

              <span class="escudo">🛡️</span>

              <div>
                <strong>Área protegida</strong>
                <p>Solo el personal autorizado puede acceder al panel.</p>
              </div>

            </div>

          </div>

        </Transition>

      </section>

    </section>

  </main>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { iniciarSesion, reenviarVerificacion } from '../utils/auth'

import {
  validarCorreo,
  validarPasswordLogin,
  debeMostrarFeedback
} from '../utils/validaciones'

const router = useRouter()
const route = useRoute()


// ============================================
// GOOGLE CLIENT ID
// ============================================

const GOOGLE_CLIENT_ID = '1003235781938-1sv6ttf3d455biko2qrh5c49s0cnbh3c.apps.googleusercontent.com'

// ============================================
// VARIABLES
// ============================================

const tipoAcceso = ref('usuario')
const correo = ref('')
const password = ref('')
const mostrarPassword = ref(false)
const cargando = ref(false)
const cargandoGoogle = ref(false)
const cargandoFacebook = ref(false)
const error = ref('')
const mensaje = ref('')

// ============================================
// REENVÍO DE VERIFICACIÓN
// ============================================

const mostrarReenvio = ref(false)
const correoReenvio = ref('')
const reenviando = ref(false)
const reenvioExitoso = ref(false)
const reenvioMensaje = ref('')

// Validación simple del correo de reenvío
const correoReenvioValido = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(correoReenvio.value.trim())
})

// ============================================
// VALIDACIÓN EN VIVO
// ============================================

const correoFeedback = ref({ valido: null, mensaje: '' })
const passwordFeedback = ref({ valido: null, mensaje: '' })

// ¿El formulario es válido para enviar?
const formularioValido = computed(() => {
  return correoFeedback.value.valido === true &&
         passwordFeedback.value.valido === true
})

// ============================================
// WATCHERS DE VALIDACIÓN EN VIVO
// ============================================

// Validar correo mientras el usuario escribe
watch(correo, (nuevoValor) => {
  if (!debeMostrarFeedback(nuevoValor)) {
    correoFeedback.value = { valido: null, mensaje: '' }
    return
  }
  correoFeedback.value = validarCorreo(nuevoValor)
})

// Validar contraseña mientras el usuario escribe
watch(password, (nuevoValor) => {
  if (!debeMostrarFeedback(nuevoValor)) {
    passwordFeedback.value = { valido: null, mensaje: '' }
    return
  }
  passwordFeedback.value = validarPasswordLogin(nuevoValor)
})

// ============================================
// MOUNT
// ============================================

onMounted(() => {
  correo.value = ''
  password.value = ''
  mostrarPassword.value = false
  correoFeedback.value = { valido: null, mensaje: '' }
  passwordFeedback.value = { valido: null, mensaje: '' }

  // ============================================
  // DETECTAR SESIÓN EXPIRADA (viene desde api.js)
  // ============================================

  if (
    route.query.sesion === 'expirada' ||
    route.query.sesion === 'SESION_EXPIRADA'
  ) {
    mensaje.value = 'Tu sesión ha expirado. Inicia sesión de nuevo.'
  }

  // ============================================
  // INICIALIZAR GOOGLE UNA SOLA VEZ
  // ============================================

  const inicializarGoogle = () => {
    if (!window.google) return false

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: manejarRespuestaGoogle,
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: false
    })

    console.log('✅ Google inicializado (una sola vez)')
    return true
  }

  // Intentar inmediatamente
  if (!inicializarGoogle()) {
    // Si no está cargado, esperar con intervalos
    let intentos = 0
    const interval = setInterval(() => {
      intentos++
      if (inicializarGoogle() || intentos > 50) {
        clearInterval(interval)
      }
    }, 100)
  }
})

// ============================================
// CAMBIAR TIPO
// ============================================

const cambiarTipo = (tipo) => {
  if (tipoAcceso.value === tipo) return

  tipoAcceso.value = tipo
  correo.value = ''
  password.value = ''
  error.value = ''
  mensaje.value = ''
  mostrarPassword.value = false
  correoFeedback.value = { valido: null, mensaje: '' }
  passwordFeedback.value = { valido: null, mensaje: '' }

  // Resetear bloque de reenvío
  mostrarReenvio.value = false
  reenvioExitoso.value = false
  reenvioMensaje.value = ''
}

// ============================================
// VALIDAR CORREO
// ============================================

const correoValido = (correoIngresado) => {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return expresion.test(correoIngresado)
}

// ============================================
// LOGIN TRADICIONAL
// ============================================

const login = async () => {
  error.value = ''
  mensaje.value = ''

  // Ocultar bloque de reenvío en cada intento nuevo
  mostrarReenvio.value = false
  reenvioExitoso.value = false
  reenvioMensaje.value = ''

  const correoLimpio = correo.value.trim()

  if (!correoLimpio || !password.value) {
    error.value = 'Ingresa tu correo y contraseña.'
    return
  }

  if (!correoValido(correoLimpio)) {
    error.value = 'Ingresa un correo electrónico válido.'
    return
  }

  cargando.value = true

  try {
    const sesion = await iniciarSesion(correoLimpio, password.value)
    const usuario = sesion.usuario

    if (!usuario) {
      throw new Error('No se pudo obtener la información del usuario.')
    }

    if (tipoAcceso.value === 'admin') {
      if (usuario.rol !== 'admin') {
        throw new Error('Esta cuenta no tiene permisos de administrador.')
      }
      router.replace('/admin')
      return
    }

    if (tipoAcceso.value === 'usuario') {
      if (usuario.rol !== 'cliente') {
        throw new Error('Esta cuenta corresponde al área administrativa.')
      }
      router.replace('/inicio')
    }
  } catch (err) {
    error.value = err.message || 'No fue posible iniciar sesión.'

    // ============================================
    // DETECTAR EMAIL NO VERIFICADO
    // ============================================
    // Si el backend devolvió el código EMAIL_NO_VERIFICADO,
    // mostramos el bloque de reenvío y pre-llenamos el correo.

    if (err.codigo === 'EMAIL_NO_VERIFICADO') {
      mostrarReenvio.value = true
      correoReenvio.value = correoLimpio
    }

    password.value = ''
  } finally {
    cargando.value = false
  }
}

// ============================================
// REENVIAR CORREO DE VERIFICACIÓN
// ============================================

const reenviar = async () => {
  if (!correoReenvioValido.value) return

  reenviando.value = true
  reenvioMensaje.value = ''

  try {
    const datos = await reenviarVerificacion(correoReenvio.value)

    reenvioExitoso.value = true
    reenvioMensaje.value = datos.mensaje ||
      'Si el correo está registrado y sin verificar, te enviamos un nuevo enlace. Revisa tu bandeja (y spam).'

  } catch (err) {
    // Mostrar el error en el bloque de error general
    error.value = err.message || 'No fue posible reenviar el correo.'
  } finally {
    reenviando.value = false
  }
}

// ============================================
// REGISTRO
// ============================================

const irARegistro = () => {
  router.push('/registro')
}

// ============================================
// OLVIDÉ MI CONTRASEÑA
// ============================================

const irAOlvidePassword = () => {
  router.push('/olvide-password')
}

// ============================================
// LOGIN SOCIAL
// ============================================

const loginSocial = (proveedor) => {
  error.value = ''
  mensaje.value = ''

  if (proveedor === 'Google') {
    iniciarLoginGoogle()
    return
  }

  if (proveedor === 'Facebook') {
    iniciarLoginFacebook()
    return
  }
}

// ============================================
// INICIAR GOOGLE (método alternativo sin FedCM)
// ============================================

const iniciarLoginGoogle = () => {
  error.value = ''

  if (!window.google) {
    error.value = 'La librería de Google aún se está cargando. Intenta en unos segundos.'
    return
  }

  cargandoGoogle.value = true

  try {
    // Crear contenedor oculto
    let contenedor = document.getElementById('google-btn-oculto')

    if (!contenedor) {
      contenedor = document.createElement('div')
      contenedor.id = 'google-btn-oculto'
      contenedor.style.position = 'fixed'
      contenedor.style.top = '0'
      contenedor.style.left = '0'
      contenedor.style.opacity = '0'
      contenedor.style.pointerEvents = 'none'
      contenedor.style.zIndex = '-1'
      document.body.appendChild(contenedor)
    }

    // Limpiar
    contenedor.innerHTML = ''

    // Renderizar el botón real de Google (usa iframe, NO FedCM)
    window.google.accounts.id.renderButton(
      contenedor,
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        locale: 'es',
        width: 300
      }
    )

    // Esperar a que se renderice
    setTimeout(() => {
      const iframe = contenedor.querySelector('iframe')
      const btn = contenedor.querySelector('div[role="button"]')

      if (btn) {
        // Hacer clic programáticamente
        btn.click()
        cargandoGoogle.value = false
      } else if (iframe) {
        // Si solo hay iframe, hacer clic sobre él
        iframe.click()
        cargandoGoogle.value = false
      } else {
        error.value = 'No se pudo abrir el popup de Google.'
        cargandoGoogle.value = false
      }
    }, 300)

  } catch (err) {
    console.error('Error Google:', err)
    error.value = 'No se pudo abrir el login de Google.'
    cargandoGoogle.value = false
  }
}

// ============================================
// MANEJAR RESPUESTA DE GOOGLE
// ============================================

const manejarRespuestaGoogle = async (response) => {
  console.log('🎉 Callback de Google ejecutado')

  error.value = ''
  mensaje.value = ''
  cargandoGoogle.value = true

  try {
    console.log('📤 Enviando credential al backend...')

    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential: response.credential })
    })

    console.log('📥 Respuesta del backend:', res.status)

    const datos = await res.json()
    console.log('📦 Datos:', datos)

    if (!res.ok || !datos.ok) {
      throw new Error(datos.mensaje || 'Error al iniciar sesión con Google.')
    }

    const usuario = datos.usuario

    if (!usuario) {
      throw new Error('No se obtuvo usuario del servidor.')
    }

    console.log('✅ Login exitoso. Rol:', usuario.rol)

    // ⚠️⚠️⚠️ LÍNEA CLAVE: GUARDAR USUARIO PARA EL ROUTER ⚠️⚠️⚠️
    localStorage.setItem('usuarioMegaMex', JSON.stringify(usuario))

    console.log('💾 Usuario guardado en localStorage')

    // Redirigir según rol
    if (usuario.rol === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/inicio')
    }
  } catch (err) {
    console.error('❌ Error login Google:', err)
    error.value = err.message || 'No se pudo iniciar sesión con Google.'
  } finally {
    cargandoGoogle.value = false
  }
}
// ============================================
// INICIAR LOGIN CON FACEBOOK
// ============================================

const iniciarLoginFacebook = () => {
  error.value = ''

  if (!window.FB) {
    error.value =
      'La librería de Facebook aún se está cargando. Intenta en unos segundos.'
    return
  }

  cargandoFacebook.value = true

  window.FB.login(
    (response) => {

      if (!response.authResponse) {
        cargandoFacebook.value = false
        return
      }

      manejarRespuestaFacebook(response.authResponse.accessToken)
    },
    {
      scope: 'public_profile,email',
      return_scopes: true
    }
  )
}

// ============================================
// MANEJAR RESPUESTA DE FACEBOOK
// ============================================

const manejarRespuestaFacebook = async (accessToken) => {
  console.log('🎉 Callback de Facebook ejecutado')

  error.value = ''
  mensaje.value = ''
  cargandoFacebook.value = true

  try {
    console.log('📤 Enviando accessToken al backend...')

    const res = await fetch('/api/auth/facebook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ accessToken })
    })

    console.log('📥 Respuesta del backend:', res.status)

    const datos = await res.json()
    console.log('📦 Datos:', datos)

    if (!res.ok || !datos.ok) {
      throw new Error(
        datos.mensaje || 'Error al iniciar sesión con Facebook.'
      )
    }

    const usuario = datos.usuario

    if (!usuario) {
      throw new Error('No se obtuvo usuario del servidor.')
    }

    console.log('✅ Login exitoso. Rol:', usuario.rol)

    // ⚠️ GUARDAR USUARIO PARA EL ROUTER
    localStorage.setItem('usuarioMegaMex', JSON.stringify(usuario))

    console.log('💾 Usuario guardado en localStorage')

    // Redirigir según rol
    if (usuario.rol === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/inicio')
    }

  } catch (err) {
    console.error('❌ Error login Facebook:', err)
    error.value = err.message || 'No se pudo iniciar sesión con Facebook.'
  } finally {
    cargandoFacebook.value = false
  }
}
</script>

<style scoped>

/* ============================================ */
/* RESET */
/* ============================================ */

* {
  box-sizing: border-box;
}

/* ============================================ */
/* PÁGINA PRINCIPAL */
/* ============================================ */

.pagina-login {
  position: fixed;
  inset: 0;
  z-index: 99999;
  width: 100%;
  min-height: 100dvh;
  padding: 25px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #050f28;
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
}

/* Fondo: imagen de la tienda Mega-Mex */
.pagina-login::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../assets/fondo-login-neon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.55) saturate(1.2);
  z-index: -2;
}

/* Capa oscura para contraste */
.pagina-login::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(10, 30, 80, 0.5), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(10, 30, 80, 0.6), transparent 50%),
    linear-gradient(180deg, rgba(5, 15, 40, 0.55) 0%, rgba(5, 15, 40, 0.75) 100%);
  z-index: -1;
}

/* Líneas neón superior e inferior */
.pagina-login .fondo-luz.luz-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  border-radius: 0;
  background: linear-gradient(90deg, transparent, #00d4ff, #0091ff, #00d4ff, transparent);
  box-shadow: 0 0 20px #00d4ff, 0 0 40px #0091ff;
  animation: pulsoNeonLinea 3s ease-in-out infinite;
}

.pagina-login .fondo-luz.luz-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  top: auto;
  border-radius: 0;
  background: linear-gradient(90deg, transparent, #00d4ff, #0091ff, #00d4ff, transparent);
  box-shadow: 0 0 20px #00d4ff, 0 0 40px #0091ff;
  animation: pulsoNeonLinea 3s ease-in-out infinite 1.5s;
}

/* Tercera luz: la ocultamos para no romper el layout */
.pagina-login .fondo-luz.luz-3 {
  display: none;
}

@keyframes pulsoNeonLinea {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* ============================================ */
/* PARTÍCULAS FLOTANTES */
/* ============================================ */

.particula {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 8px #00d4ff, 0 0 16px #0091ff;
  animation: subirParticula 12s linear infinite;
  z-index: 1;
}

.particula-1 { left: 5%; bottom: -20px; animation-delay: 0s; }
.particula-2 { left: 12%; bottom: -20px; animation-delay: 2s; }
.particula-3 { left: 22%; bottom: -20px; animation-delay: 4s; }
.particula-4 { left: 35%; bottom: -20px; animation-delay: 1s; }
.particula-5 { left: 45%; bottom: -20px; animation-delay: 6s; }
.particula-6 { left: 55%; bottom: -20px; animation-delay: 3s; }
.particula-7 { left: 63%; bottom: -20px; animation-delay: 8s; }
.particula-8 { left: 72%; bottom: -20px; animation-delay: 2.5s; }
.particula-9 { left: 80%; bottom: -20px; animation-delay: 5s; }
.particula-10 { left: 88%; bottom: -20px; animation-delay: 1.5s; }
.particula-11 { left: 94%; bottom: -20px; animation-delay: 7s; }
.particula-12 { left: 50%; bottom: -20px; animation-delay: 9s; }

@keyframes subirParticula {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
}

/* ============================================ */
/* CARD PRINCIPAL (EFECTO GLASSMORPHISM) */
/* ============================================ */

.login-card {
  position: relative;
  z-index: 5;
  width: min(480px, 92%);
  min-height: auto;
  display: block;
  padding: 45px 40px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 28px;

  background: rgba(5, 18, 45, 0.75);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);

  border: 1px solid rgba(0, 180, 255, 0.5);

  box-shadow:
    0 0 0 1px rgba(0, 180, 255, 0.15),
    0 0 60px rgba(0, 150, 255, 0.45),
    0 0 120px rgba(0, 100, 255, 0.3),
    inset 0 0 80px rgba(0, 150, 255, 0.08),
    0 35px 90px rgba(0, 0, 0, 0.5);

  animation: aparecerCard 0.9s cubic-bezier(0.2, 0.9, 0.3, 1);
}

@keyframes aparecerCard {
  from { opacity: 0; transform: translateY(40px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ============================================ */
/* PANEL IZQUIERDO: PRESENTACIÓN */
/* ============================================ */
.presentacion {
  position: relative;
  overflow: hidden;
  padding: 30px 25px;
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, rgba(0, 30, 75, 0.35), rgba(0, 60, 130, 0.25));
  border-right: 1px solid rgba(0, 180, 255, 0.15);
}

.contenido-presentacion {
  position: relative;
  z-index: 4;
  color: #ffffff;
}

/* Círculos decorativos (ahora son sutiles) */
.circulo {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 180, 255, 0.12), transparent 70%);
  pointer-events: none;
}

.circulo-a {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -160px;
}

.circulo-b {
  width: 230px;
  height: 230px;
  bottom: -100px;
  right: -80px;
}

/* Logo */
.logo-login {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: linear-gradient(135deg, #0080ff, #00c8ff);
  box-shadow:
    0 0 20px rgba(0, 180, 255, 0.6),
    0 0 40px rgba(0, 150, 255, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  font-size: 46px;
  animation: logoFlotar 3.5s ease-in-out infinite;
}

@keyframes logoFlotar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Título */
.presentacion h1 {
  margin: 28px 0 4px;
  font-size: clamp(38px, 4vw, 52px);
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow:
    0 0 15px rgba(0, 180, 255, 0.7),
    0 0 30px rgba(0, 150, 255, 0.4);
}

.presentacion h1 span {
  color: #00d4ff;
  text-shadow:
    0 0 15px rgba(0, 200, 255, 1),
    0 0 30px rgba(0, 180, 255, 0.8),
    0 0 50px rgba(0, 150, 255, 0.6);
}

/* Subtítulo */
.presentacion h2 {
  margin: 0;
  font-size: 32px;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 180, 255, 0.5);
}

.descripcion {
  max-width: 410px;
  margin-top: 22px;
  line-height: 1.8;
  color: rgba(200, 230, 255, 0.85);
  font-size: 14px;
}

/* Ventajas */
.ventajas {
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ventaja {
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  transform: translateX(-20px);
  animation: aparecerVentaja 0.6s ease forwards;
  animation-delay: var(--delay);
}

@keyframes aparecerVentaja {
  to { opacity: 1; transform: translateX(0); }
}

.ventaja p {
  margin: 0;
  font-size: 14px;
  color: rgba(220, 240, 255, 0.9);
}

.check {
  width: 34px;
  height: 34px;
  min-width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 150, 255, 0.3), rgba(0, 200, 255, 0.15));
  border: 1px solid rgba(0, 200, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.4);
  font-size: 15px;
  font-weight: bold;
  color: #00d4ff;
}

/* ============================================ */
/* PANEL DERECHO: FORMULARIO */
/* ============================================ */

.formulario {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
}
.encabezado {
  text-align: center;
}

.icono-usuario {
  width: 58px;                /* ← era 72px */
  height: 58px;               /* ← era 72px */
  margin: 0 auto 10px;        /* ← era 15px */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(0, 130, 255, 0.25), rgba(0, 200, 255, 0.15));
  border: 1px solid rgba(0, 180, 255, 0.4);
  box-shadow: 0 0 25px rgba(0, 150, 255, 0.35);
}

.icono-usuario.admin {
  background: linear-gradient(135deg, rgba(140, 100, 255, 0.25), rgba(180, 130, 255, 0.15));
  border-color: rgba(180, 130, 255, 0.5);
  box-shadow: 0 0 25px rgba(150, 100, 255, 0.4);
}

.icono-cambio {
  display: block;
  font-size: 26px;            /* ← era 32px */
  animation: iconoEntrada 0.4s ease;
}

@keyframes iconoEntrada {
  from { opacity: 0; transform: scale(0.5) rotate(-15deg); }
  to { opacity: 1; transform: scale(1) rotate(0); }
}

.encabezado h2 {
  margin: 0;
  color: #ffffff;
  font-size: 30px;
  text-shadow: 0 0 20px rgba(0, 180, 255, 0.5);
}

.encabezado p {
  margin: 7px 0 23px;
  color: rgba(180, 210, 240, 0.75);
  font-size: 13px;
}

/* ============================================ */
/* SELECTOR USUARIO / ADMIN */
/* ============================================ */

.selector {
  position: relative;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 15px;
  background: rgba(5, 20, 45, 0.6);
  border: 1px solid rgba(0, 150, 255, 0.2);
}

.selector-fondo {
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(50% - 7.5px);
  height: calc(100% - 10px);
  border-radius: 11px;
  background: linear-gradient(135deg, #0080ff, #00c8ff);
  box-shadow:
    0 0 20px rgba(0, 180, 255, 0.6),
    inset 0 0 15px rgba(255, 255, 255, 0.15);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.selector-fondo.mover {
  transform: translateX(calc(100% + 5px));
}

.selector button {
  position: relative;
  z-index: 2;
  height: 50px;
  border: none;
  background: transparent;
  color: rgba(180, 210, 240, 0.7);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: 0.3s ease;
}

.selector button span {
  margin-right: 7px;
}

.selector button.activo {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* ============================================ */
/* INFO DEL TIPO DE ACCESO */
/* ============================================ */

.tipo-info {
  margin: 22px 0 18px;
}

.tipo-info h3 {
  margin: 0 0 6px;
  color: #ffffff;
  font-size: 16px;
}

.tipo-info p {
  margin: 0;
  color: rgba(180, 210, 240, 0.7);
  font-size: 13px;
}

/* ============================================ */
/* TRANSICIONES DE CAMBIO */
/* ============================================ */

.cambio-enter-active,
.cambio-leave-active {
  transition: all 0.3s ease;
}

.cambio-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.cambio-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ============================================ */
/* CAMPOS DEL FORMULARIO */
/* ============================================ */

.campo {
  margin-bottom: 18px;
}

.campo label {
  display: block;
  margin-bottom: 8px;
  color: rgba(200, 225, 250, 0.9);
  font-size: 13px;
  font-weight: 700;
}

.input-contenedor {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 14px;
  background: rgba(5, 20, 45, 0.5);
  transition: all 0.3s ease;
}

.icono-input {
  position: absolute;
  left: 16px;
  z-index: 2;
  opacity: 0.75;
  filter: hue-rotate(180deg) brightness(1.3);
}

.input-contenedor input {
  width: 100%;
  height: 55px;
  padding: 0 50px;
  border: none;
  border-radius: 14px;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
}

.input-contenedor input::placeholder {
  color: rgba(150, 180, 220, 0.5);
}

.input-contenedor:hover {
  border-color: rgba(0, 200, 255, 0.6);
}

.input-contenedor:focus-within {
  border-color: #00d4ff;
  box-shadow:
    0 0 0 4px rgba(0, 180, 255, 0.15),
    0 0 25px rgba(0, 180, 255, 0.4);
  transform: translateY(-1px);
}

.mostrar-password {
  position: absolute;
  right: 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  filter: hue-rotate(180deg) brightness(1.2);
}

/* ============================================ */
/* BOTÓN LOGIN PRINCIPAL */
/* ============================================ */

.btn-login {
  position: relative;
  width: 100%;
  height: 56px;
  overflow: hidden;
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #7b2ff7, #00a3ff);
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow:
    0 0 25px rgba(120, 50, 255, 0.4),
    0 0 50px rgba(0, 150, 255, 0.3),
    0 10px 30px rgba(0, 100, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow:
    0 0 35px rgba(120, 50, 255, 0.6),
    0 0 70px rgba(0, 180, 255, 0.5),
    0 15px 40px rgba(0, 100, 255, 0.4);
}

.btn-login:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.brillo {
  position: absolute;
  top: 0;
  left: -120%;
  width: 70%;
  height: 100%;
  transform: skewX(-20deg);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.btn-login:hover .brillo {
  animation: brilloBoton 0.8s ease;
}

@keyframes brilloBoton {
  to { left: 150%; }
}

.flecha {
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.btn-login:hover .flecha {
  transform: translateX(5px);
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

/* ============================================ */
/* MENSAJES DE ERROR / INFO */
/* ============================================ */

.mensaje-error,
.mensaje-info {
  margin-bottom: 15px;
  padding: 12px 14px;
  border-radius: 11px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mensaje-error {
  border: 1px solid rgba(255, 100, 100, 0.5);
  background: rgba(255, 50, 50, 0.15);
  color: #ffb3b3;
  box-shadow: 0 0 15px rgba(255, 80, 80, 0.2);
}

.mensaje-info {
  border: 1px solid rgba(100, 200, 255, 0.5);
  background: rgba(50, 150, 255, 0.15);
  color: #b3e0ff;
  box-shadow: 0 0 15px rgba(100, 200, 255, 0.2);
}

.mensaje-enter-active,
.mensaje-leave-active {
  transition: all 0.3s ease;
}

.mensaje-enter-from,
.mensaje-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ============================================ */
/* BLOQUE DE REENVÍO DE VERIFICACIÓN */
/* ============================================ */

.reenvio-bloque {
  margin: 15px 0 5px;
  padding: 16px;
  border: 1px solid rgba(255, 210, 80, 0.4);
  border-radius: 14px;
  background: rgba(255, 200, 50, 0.08);
  box-shadow: 0 0 20px rgba(255, 200, 50, 0.15);
}

.reenvio-info {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 14px;
}

.reenvio-info span {
  font-size: 22px;
  line-height: 1;
  filter: hue-rotate(180deg) brightness(1.3);
}

.reenvio-info strong {
  display: block;
  color: #ffe066;
  font-size: 13px;
  margin-bottom: 2px;
  text-shadow: 0 0 10px rgba(255, 220, 80, 0.5);
}

.reenvio-info p {
  margin: 0;
  color: rgba(255, 220, 150, 0.8);
  font-size: 11.5px;
  line-height: 1.5;
}

.reenvio-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.campo-reenvio label {
  display: block;
  margin-bottom: 6px;
  color: #ffe066;
  font-size: 11.5px;
  font-weight: 700;
}

.campo-reenvio input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(255, 210, 80, 0.4);
  border-radius: 11px;
  outline: none;
  background: rgba(5, 20, 45, 0.6);
  color: #ffffff;
  font-size: 13px;
  transition: all 0.25s ease;
}

.campo-reenvio input::placeholder {
  color: rgba(255, 220, 150, 0.4);
}

.campo-reenvio input:focus {
  border-color: #ffd24d;
  box-shadow: 0 0 20px rgba(255, 210, 80, 0.4);
}

.campo-reenvio input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-reenviar {
  height: 44px;
  border: none;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #d4a017, #ffd24d);
  color: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  box-shadow:
    0 0 20px rgba(255, 210, 80, 0.4),
    0 5px 14px rgba(212, 160, 23, 0.3);
  transition: all 0.25s ease;
}

.btn-reenviar:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 0 30px rgba(255, 210, 80, 0.6),
    0 8px 18px rgba(212, 160, 23, 0.4);
}

.btn-reenviar:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.loader-oscuro {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

.reenvio-ok {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(100, 255, 150, 0.4);
  border-radius: 11px;
  background: rgba(50, 255, 100, 0.08);
  box-shadow: 0 0 15px rgba(100, 255, 150, 0.2);
}

.reenvio-ok span {
  font-size: 18px;
  line-height: 1;
}

.reenvio-ok p {
  margin: 0;
  color: #b3ffcc;
  font-size: 12px;
  line-height: 1.5;
}

/* ============================================ */
/* SEPARADOR "O CONTINUAR CON" */
/* ============================================ */

.separador {
  margin: 22px 0 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.separador span {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.4), transparent);
}

.separador p {
  margin: 0;
  color: rgba(150, 180, 220, 0.6);
  font-size: 11px;
  white-space: nowrap;
}

/* ============================================ */
/* BOTONES SOCIALES (GOOGLE / FACEBOOK) */
/* ============================================ */

.login-social {
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.social-btn {
  width: 58px;
  height: 58px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 180, 255, 0.35);
  border-radius: 18px;
  background: rgba(5, 20, 45, 0.5);
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.2);
  transition:
    width 0.38s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.social-btn:hover:not(:disabled),
.social-btn:focus,
.social-btn:focus-visible {
  width: 165px;
  transform: translateY(-4px);
  outline: none;
  box-shadow: 0 0 30px rgba(0, 180, 255, 0.5);
}

.social-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.social-icon {
  width: 30px;
  height: 30px;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.social-btn:hover .social-icon,
.social-btn:focus .social-icon {
  transform: scale(1.08);
}

.google-icon {
  background: transparent !important;
  color: inherit !important;
  -webkit-text-fill-color: initial !important;
}

.google-icon svg {
  width: 27px;
  height: 27px;
  display: block;
}

.google-btn:hover,
.google-btn:focus,
.google-btn:focus-visible {
  border-color: rgba(100, 180, 255, 0.8);
  background: rgba(10, 40, 80, 0.7);
}

.facebook-icon {
  border-radius: 50%;
  background: #1877f2;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 23px;
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 0 15px rgba(24, 119, 242, 0.6);
}

.facebook-btn:hover,
.facebook-btn:focus,
.facebook-btn:focus-visible {
  border-color: rgba(100, 180, 255, 0.8);
  background: rgba(10, 40, 80, 0.7);
}

.social-nombre {
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  transform: translateX(-8px);
  white-space: nowrap;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  transition: opacity 0.25s ease, max-width 0.35s ease, transform 0.35s ease;
}

.social-btn:hover .social-nombre,
.social-btn:focus .social-nombre,
.social-btn:focus-visible .social-nombre {
  opacity: 1;
  max-width: 100px;
  transform: translateX(0);
}

/* ============================================ */
/* LINK OLVIDÉ CONTRASEÑA */
/* ============================================ */

.olvide-link {
  margin-top: 15px;
  text-align: center;
}

.olvide-link button {
  border: none;
  background: transparent;
  color: #00d4ff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.olvide-link button:hover {
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 220, 255, 0.9);
  text-decoration: underline;
}

/* ============================================ */
/* CREAR CUENTA */
/* ============================================ */

.crear-cuenta {
  margin-top: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: rgba(180, 210, 240, 0.75);
  font-size: 12px;
}

.crear-cuenta button {
  position: relative;
  border: none;
  background: transparent;
  color: #00d4ff;
  cursor: pointer;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.crear-cuenta button::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 2px;
  background: #00d4ff;
  box-shadow: 0 0 10px #00d4ff;
  transition: width 0.3s ease;
}

.crear-cuenta button:hover {
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 220, 255, 1);
}

.crear-cuenta button:hover::after {
  width: 100%;
}

/* ============================================ */
/* PANEL DE SEGURIDAD ADMIN */
/* ============================================ */

.seguridad-admin {
  margin-top: 22px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px solid rgba(180, 130, 255, 0.35);
  border-radius: 13px;
  background: rgba(100, 50, 200, 0.1);
  box-shadow: 0 0 20px rgba(150, 100, 255, 0.2);
}

.escudo {
  font-size: 25px;
  filter: hue-rotate(-30deg) brightness(1.3);
}

.seguridad-admin strong {
  color: #d4b3ff;
  font-size: 12px;
  text-shadow: 0 0 10px rgba(180, 130, 255, 0.5);
}

.seguridad-admin p {
  margin: 4px 0 0;
  color: rgba(200, 180, 255, 0.7);
  font-size: 11px;
}

/* ============================================ */
/* VALIDACIÓN EN VIVO */
/* ============================================ */

.input-contenedor.input-valido {
  border-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.input-contenedor.input-invalido {
  border-color: #ff4466;
  box-shadow: 0 0 20px rgba(255, 68, 102, 0.3);
}

.input-contenedor.input-valido:focus-within {
  border-color: #00ff88;
  box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.15), 0 0 25px rgba(0, 255, 136, 0.4);
}

.input-contenedor.input-invalido:focus-within {
  border-color: #ff4466;
  box-shadow: 0 0 0 4px rgba(255, 68, 102, 0.15), 0 0 25px rgba(255, 68, 102, 0.4);
}

.feedback-icono {
  position: absolute;
  right: 46px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 800;
  color: white;
  animation: aparecerFeedback 0.25s ease;
}

.feedback-ok {
  background: #00ff88;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
  color: #003d1f;
}

.feedback-error {
  background: #ff4466;
  box-shadow: 0 0 15px rgba(255, 68, 102, 0.8);
}

.feedback-mensaje {
  margin: 6px 0 0;
  font-size: 11.5px;
  font-weight: 600;
  padding-left: 4px;
  animation: aparecerFeedback 0.25s ease;
}

.texto-ok {
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.texto-error {
  color: #ff6688;
  text-shadow: 0 0 10px rgba(255, 68, 102, 0.5);
}

@keyframes aparecerFeedback {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-enter-active,
.feedback-leave-active {
  transition: all 0.2s ease;
}

.feedback-enter-from,
.feedback-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ============================================ */
/* RESPONSIVE */
/* ============================================ */

@media (max-width: 900px) {
  .pagina-login {
    position: absolute;
    align-items: flex-start;
  }

  .login-card {
    width: min(480px, 92%);
    padding: 35px 28px;
  }

  .formulario {
    padding: 0;
  }
}

@media (max-width: 520px) {
  .pagina-login {
    padding: 12px;
  }

  .login-card {
    border-radius: 22px;
  }

  .presentacion {
    padding: 32px 24px;
    min-height: auto;
  }

 .logo-login {
  width: 72px;                /* ← era 90px */
  height: 72px;               /* ← era 90px */
    border-radius: 18px;
    font-size: 38px;            /* ← era 46px */
  }

  .presentacion h1 {
    font-size: 34px;
  }

  .presentacion h2 {
    font-size: 24px;
  }

  .formulario {
    padding: 32px 20px;
  }

  .encabezado h2 {
    font-size: 26px;
  }

  .selector button {
    font-size: 12px;
  }

  .login-social {
    gap: 14px;
  }

  .social-btn {
    width: 56px;
    height: 56px;
  }

  .social-btn:hover:not(:disabled),
  .social-btn:focus,
  .social-btn:focus-visible {
    width: 140px;
  }

  .crear-cuenta {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

</style>