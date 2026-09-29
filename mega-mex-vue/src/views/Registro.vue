<template>
  <main class="pagina-registro">

    <section class="registro-card">

      <!-- LADO IZQUIERDO -->

      <div class="presentacion">

        <div class="logo">
          🛒
        </div>

        <h1>MEGA-MEX</h1>

        <h2>Crea tu cuenta</h2>

        <p>
          Regístrate para acceder a productos,
          promociones, flyers y novedades.
        </p>

        <div class="ventajas">

          <div>
            <span>✓</span>
            Registro rápido
          </div>

          <div>
            <span>✓</span>
            Acceso a promociones
          </div>

          <div>
            <span>✓</span>
            Consulta las novedades de Mega-Mex
          </div>

        </div>

      </div>


      <!-- FORMULARIO -->

      <div class="formulario">

        <div class="encabezado">

          <div class="icono">
            👤
          </div>

          <h2>Crear cuenta</h2>

          <p>
            Completa tus datos
          </p>

        </div>


        <form @submit.prevent="registrar">

          <!-- NOMBRE -->

          <div class="campo">

            <label>
              Nombre
            </label>

            <div
              class="input-contenedor"
              :class="{
                'input-valido': nombreFeedback.valido === true,
                'input-invalido': nombreFeedback.valido === false
              }"
            >

              <input
                v-model="nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                :disabled="cargando"
              />

              <Transition name="feedback">
                <span
                  v-if="nombreFeedback.valido === true"
                  class="feedback-icono feedback-ok"
                >✓</span>
                <span
                  v-else-if="nombreFeedback.valido === false"
                  class="feedback-icono feedback-error"
                >!</span>
              </Transition>

            </div>

            <Transition name="feedback">
              <p
                v-if="nombreFeedback.valido !== null"
                class="feedback-mensaje"
                :class="nombreFeedback.valido ? 'texto-ok' : 'texto-error'"
              >
                {{ nombreFeedback.mensaje }}
              </p>
            </Transition>

          </div>


          <!-- APELLIDOS -->

          <div class="campo">

            <label>
              Apellidos
            </label>

            <div
              class="input-contenedor"
              :class="{
                'input-valido': apellidosFeedback.valido === true,
                'input-invalido': apellidosFeedback.valido === false
              }"
            >

              <input
                v-model="apellidos"
                type="text"
                placeholder="Ingresa tus apellidos"
                :disabled="cargando"
              />

              <Transition name="feedback">
                <span
                  v-if="apellidosFeedback.valido === true"
                  class="feedback-icono feedback-ok"
                >✓</span>
                <span
                  v-else-if="apellidosFeedback.valido === false"
                  class="feedback-icono feedback-error"
                >!</span>
              </Transition>

            </div>

            <Transition name="feedback">
              <p
                v-if="apellidosFeedback.valido !== null"
                class="feedback-mensaje"
                :class="apellidosFeedback.valido ? 'texto-ok' : 'texto-error'"
              >
                {{ apellidosFeedback.mensaje }}
              </p>
            </Transition>

          </div>


          <!-- CORREO -->

          <div class="campo">

            <label>
              Correo electrónico
            </label>

            <div
              class="input-contenedor"
              :class="{
                'input-valido': correoFeedback.valido === true,
                'input-invalido': correoFeedback.valido === false
              }"
            >

              <input
                v-model="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                autocomplete="email"
                :disabled="cargando"
              />

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


          <!-- CONTRASEÑA -->

          <div class="campo">

            <label>
              Contraseña
            </label>

            <div
              class="input-contenedor password-contenedor"
              :class="{
                'input-valido': passwordFeedback.valido === true,
                'input-invalido': passwordFeedback.valido === false
              }"
            >

              <input
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'"
                placeholder="Crea una contraseña"
                autocomplete="new-password"
                :disabled="cargando"
              />

              <button
                type="button"
                @click="mostrarPassword = !mostrarPassword"
              >
                {{ mostrarPassword ? '🙈' : '👁️' }}
              </button>

              <Transition name="feedback">
                <span
                  v-if="passwordFeedback.valido === true"
                  class="feedback-icono feedback-ok feedback-icono-password"
                >✓</span>
                <span
                  v-else-if="passwordFeedback.valido === false"
                  class="feedback-icono feedback-error feedback-icono-password"
                >!</span>
              </Transition>

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


          <!-- CONFIRMAR -->

          <div class="campo">

            <label>
              Confirmar contraseña
            </label>

            <div
              class="input-contenedor password-contenedor"
              :class="{
                'input-valido': confirmarFeedback.valido === true,
                'input-invalido': confirmarFeedback.valido === false
              }"
            >

              <input
                v-model="confirmarPassword"
                :type="mostrarConfirmacion ? 'text' : 'password'"
                placeholder="Repite tu contraseña"
                autocomplete="new-password"
                :disabled="cargando"
              />

              <button
                type="button"
                @click="mostrarConfirmacion = !mostrarConfirmacion"
              >
                {{ mostrarConfirmacion ? '🙈' : '👁️' }}
              </button>

              <Transition name="feedback">
                <span
                  v-if="confirmarFeedback.valido === true"
                  class="feedback-icono feedback-ok feedback-icono-password"
                >✓</span>
                <span
                  v-else-if="confirmarFeedback.valido === false"
                  class="feedback-icono feedback-error feedback-icono-password"
                >!</span>
              </Transition>

            </div>

            <Transition name="feedback">
              <p
                v-if="confirmarFeedback.valido !== null"
                class="feedback-mensaje"
                :class="confirmarFeedback.valido ? 'texto-ok' : 'texto-error'"
              >
                {{ confirmarFeedback.mensaje }}
              </p>
            </Transition>

          </div>


          <!-- ERROR -->

          <div
            v-if="error"
            class="mensaje-error"
          >
            ⚠️ {{ error }}
          </div>


          <!-- ÉXITO -->

          <div
            v-if="exito"
            class="mensaje-exito"
          >
            {{ exito }}
          </div>


          <!-- BOTÓN -->

          <button
            type="submit"
            class="btn-crear"
            :disabled="cargando || !formularioValido"
          >

            <span v-if="cargando">
              Creando cuenta...
            </span>

            <span v-else>
              Crear cuenta
            </span>

          </button>

        </form>


        <!-- REGRESAR -->

        <div class="volver">

          <span>
            ¿Ya tienes una cuenta?
          </span>

          <button
            type="button"
            @click="irLogin"
          >
            Iniciar sesión
          </button>

        </div>

      </div>

    </section>

  </main>
</template>


<script setup>

import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import {
  registrarUsuario
} from '../utils/auth'

import {
  validarCorreo,
  validarPassword,
  validarNombre,
  validarConfirmacion,
  debeMostrarFeedback
} from '../utils/validaciones'


const router = useRouter()


// ============================================
// CAMPOS DEL FORMULARIO
// ============================================

const nombre = ref('')
const apellidos = ref('')
const correo = ref('')
const password = ref('')
const confirmarPassword = ref('')

const error = ref('')
const exito = ref('')

const cargando = ref(false)

const mostrarPassword = ref(false)
const mostrarConfirmacion = ref(false)


// ============================================
// VALIDACIÓN EN VIVO — ESTADO
// ============================================

const nombreFeedback = ref({ valido: null, mensaje: '' })
const apellidosFeedback = ref({ valido: null, mensaje: '' })
const correoFeedback = ref({ valido: null, mensaje: '' })
const passwordFeedback = ref({ valido: null, mensaje: '' })
const confirmarFeedback = ref({ valido: null, mensaje: '' })


// ============================================
// COMPUTED — ¿FORMULARIO VÁLIDO?
// ============================================

const formularioValido = computed(() => {
  return nombreFeedback.value.valido === true &&
         apellidosFeedback.value.valido === true &&
         correoFeedback.value.valido === true &&
         passwordFeedback.value.valido === true &&
         confirmarFeedback.value.valido === true
})


// ============================================
// WATCHERS — VALIDAR MIENTRAS ESCRIBE
// ============================================

watch(nombre, (valor) => {
  if (!debeMostrarFeedback(valor)) {
    nombreFeedback.value = { valido: null, mensaje: '' }
    return
  }
  nombreFeedback.value = validarNombre(valor)
})

watch(apellidos, (valor) => {
  if (!debeMostrarFeedback(valor)) {
    apellidosFeedback.value = { valido: null, mensaje: '' }
    return
  }
  apellidosFeedback.value = validarNombre(valor)
})

watch(correo, (valor) => {
  if (!debeMostrarFeedback(valor)) {
    correoFeedback.value = { valido: null, mensaje: '' }
    return
  }
  correoFeedback.value = validarCorreo(valor)
})

watch(password, (valor) => {
  if (!debeMostrarFeedback(valor)) {
    passwordFeedback.value = { valido: null, mensaje: '' }
  } else {
    passwordFeedback.value = validarPassword(valor)
  }

  // Revalidar confirmación si ya hay algo escrito
  if (debeMostrarFeedback(confirmarPassword.value)) {
    confirmarFeedback.value = validarConfirmacion(valor, confirmarPassword.value)
  }
})

watch(confirmarPassword, (valor) => {
  if (!debeMostrarFeedback(valor)) {
    confirmarFeedback.value = { valido: null, mensaje: '' }
    return
  }
  confirmarFeedback.value = validarConfirmacion(password.value, valor)
})


// ============================================
// VALIDAR CORREO (helper local)
// ============================================

const correoValido = (correoIngresado) => {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return expresion.test(correoIngresado)
}


// ============================================
// REGISTRAR
// ============================================
// NOTA: El backend ya no loguea automáticamente.
// Envía un correo de verificación. Mostramos mensaje
// de "revisa tu correo" y NO redirigimos al login.

const registrar = async () => {

  error.value = ''
  exito.value = ''

  // Validación final (por si acaso)
  if (
    !nombre.value.trim() ||
    !apellidos.value.trim() ||
    !correo.value.trim() ||
    !password.value ||
    !confirmarPassword.value
  ) {
    error.value = 'Completa todos los campos.'
    return
  }

  if (!correoValido(correo.value.trim())) {
    error.value = 'Ingresa un correo electrónico válido.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  if (password.value !== confirmarPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  cargando.value = true

  try {

    await registrarUsuario({
      nombre: `${nombre.value.trim()} ${apellidos.value.trim()}`,
      correo: correo.value.trim(),
      password: password.value
    })

    // NO redirigimos: mostramos mensaje de "revisa tu correo"
    exito.value =
      '✅ Cuenta creada. Revisa tu correo electrónico y haz clic en el enlace para verificar tu cuenta antes de iniciar sesión.'

    // Limpiar formulario
    nombre.value = ''
    apellidos.value = ''
    correo.value = ''
    password.value = ''
    confirmarPassword.value = ''

    // Resetear feedback
    nombreFeedback.value = { valido: null, mensaje: '' }
    apellidosFeedback.value = { valido: null, mensaje: '' }
    correoFeedback.value = { valido: null, mensaje: '' }
    passwordFeedback.value = { valido: null, mensaje: '' }
    confirmarFeedback.value = { valido: null, mensaje: '' }

  } catch (err) {

    error.value = err.message || 'No fue posible crear la cuenta.'

  } finally {

    cargando.value = false

  }

}


// ============================================
// IR AL LOGIN
// ============================================

const irLogin = () => {
  router.push('/login')
}

</script>


<style scoped>

* {
  box-sizing: border-box;
}

.pagina-registro {
  position: fixed;
  inset: 0;
  z-index: 99999;
  min-height: 100vh;
  padding: 25px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #004b92, #006bc5, #0da0e8);
  font-family: Arial, Helvetica, sans-serif;
}


.registro-card {
  width: 100%;
  max-width: 1050px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  overflow: hidden;
  border-radius: 32px;
  background: white;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}


/* IZQUIERDA */

.presentacion {
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  background: linear-gradient(145deg, #004989, #006bc5, #098edd);
}

.logo {
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.15);
  font-size: 38px;
}

.presentacion h1 {
  margin: 25px 0 5px;
  font-size: 44px;
}

.presentacion h2 {
  margin: 0;
  font-size: 28px;
}

.presentacion p {
  line-height: 1.7;
  opacity: 0.9;
}

.ventajas {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ventajas div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ventajas span {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}


/* FORMULARIO */

.formulario {
  padding: 45px 60px;
}

.encabezado {
  margin-bottom: 25px;
  text-align: center;
}

.icono {
  width: 65px;
  height: 65px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #eaf5ff;
  font-size: 30px;
}

.encabezado h2 {
  margin: 0;
  color: #1f2937;
}

.encabezado p {
  margin-top: 7px;
  color: #89919c;
}


/* CAMPOS */

.campo {
  margin-bottom: 16px;
}

.campo label {
  display: block;
  margin-bottom: 7px;
  color: #374151;
  font-size: 13px;
  font-weight: bold;
}

.input-contenedor {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d7dde4;
  border-radius: 11px;
  background: white;
  transition: all 0.25s ease;
}

.input-contenedor input {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: none;
  border-radius: 11px;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #273447;
  transition: all 0.25s ease;
}

.input-contenedor:hover {
  border-color: #a8cce7;
}

.input-contenedor:focus-within {
  border-color: #006bc5;
  box-shadow: 0 0 0 4px rgba(0, 107, 197, 0.09);
}

/* Validación: borde y fondo */
.input-contenedor.input-valido {
  border-color: #22c55e;
  background: linear-gradient(135deg, #f0fdf4, #ffffff);
}

.input-contenedor.input-invalido {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2, #ffffff);
}

.input-contenedor.input-valido:focus-within {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
}

.input-contenedor.input-invalido:focus-within {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}


/* PASSWORD */

.password-contenedor input {
  padding-right: 88px;
}

.password-contenedor button {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
}


/* ICONO DE VALIDACIÓN */

.feedback-icono {
  position: absolute;
  right: 14px;
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

/* En password hay botón, movemos el icono */
.feedback-icono-password {
  right: 46px;
}

.feedback-ok {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
}

.feedback-error {
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18);
}

.feedback-mensaje {
  margin: 6px 0 0;
  font-size: 11.5px;
  font-weight: 600;
  padding-left: 4px;
  animation: aparecerFeedback 0.25s ease;
}

.texto-ok {
  color: #16a34a;
}

.texto-error {
  color: #dc2626;
}

@keyframes aparecerFeedback {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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


/* MENSAJES */

.mensaje-error,
.mensaje-exito {
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 10px;
  font-size: 12px;
}

.mensaje-error {
  background: #fff0f0;
  color: #c62828;
}

.mensaje-exito {
  background: #eaf8ef;
  color: #18794e;
  line-height: 1.6;
}


/* BOTÓN */

.btn-crear {
  width: 100%;
  height: 51px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #006bc5, #0b96e1);
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.25s ease;
}

.btn-crear:hover:not(:disabled) {
  box-shadow: 0 9px 22px rgba(0, 107, 197, 0.28);
  transform: translateY(-1px);
}

.btn-crear:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


/* VOLVER */

.volver {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 6px;
  color: #7b8490;
  font-size: 12px;
}

.volver button {
  border: none;
  background: transparent;
  color: #006bc5;
  cursor: pointer;
  font-weight: bold;
}


/* RESPONSIVE */

@media (max-width: 850px) {

  .pagina-registro {
    position: absolute;
    align-items: flex-start;
  }

  .registro-card {
    grid-template-columns: 1fr;
  }

  .presentacion {
    padding: 40px 35px;
  }

  .formulario {
    padding: 40px 35px;
  }

}


@media (max-width: 500px) {

  .pagina-registro {
    padding: 12px;
  }

  .registro-card {
    border-radius: 22px;
  }

  .presentacion {
    padding: 30px 22px;
  }

  .presentacion h1 {
    font-size: 35px;
  }

  .formulario {
    padding: 35px 20px;
  }

}

</style>