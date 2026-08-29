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

            <input
              v-model="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              :disabled="cargando"
            />

          </div>


          <!-- APELLIDOS -->

          <div class="campo">

            <label>
              Apellidos
            </label>

            <input
              v-model="apellidos"
              type="text"
              placeholder="Ingresa tus apellidos"
              :disabled="cargando"
            />

          </div>


          <!-- CORREO -->

          <div class="campo">

            <label>
              Correo electrónico
            </label>

            <input
              v-model="correo"
              type="email"
              placeholder="correo@ejemplo.com"
              autocomplete="email"
              :disabled="cargando"
            />

          </div>


          <!-- CONTRASEÑA -->

          <div class="campo">

            <label>
              Contraseña
            </label>

            <div class="password-contenedor">

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

            </div>

          </div>


          <!-- CONFIRMAR -->

          <div class="campo">

            <label>
              Confirmar contraseña
            </label>

            <div class="password-contenedor">

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

            </div>

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
            ✅ {{ exito }}
          </div>


          <!-- BOTÓN -->

          <button
            type="submit"
            class="btn-crear"
            :disabled="cargando"
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  registrarUsuario
} from '../utils/auth'


const router = useRouter()


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


const correoValido = (correo) => {

  const expresion =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return expresion.test(correo)

}


const registrar = async () => {

  error.value = ''
  exito.value = ''


  if (
    !nombre.value.trim() ||
    !apellidos.value.trim() ||
    !correo.value.trim() ||
    !password.value ||
    !confirmarPassword.value
  ) {

    error.value =
      'Completa todos los campos.'

    return

  }


  if (
    !correoValido(correo.value.trim())
  ) {

    error.value =
      'Ingresa un correo electrónico válido.'

    return

  }


  if (
    password.value.length < 6
  ) {

    error.value =
      'La contraseña debe tener al menos 6 caracteres.'

    return

  }


  if (
    password.value !== confirmarPassword.value
  ) {

    error.value =
      'Las contraseñas no coinciden.'

    return

  }


  cargando.value = true


  try {

    await registrarUsuario({

      nombre:
        `${nombre.value.trim()} ${apellidos.value.trim()}`,

      correo:
        correo.value.trim(),

      password:
        password.value

    })


    exito.value =
      'Cuenta creada correctamente.'


    setTimeout(() => {

      router.replace('/login')

    }, 1200)

  }

  catch (err) {

    error.value =
      err.message ||
      'No fue posible crear la cuenta.'

  }

  finally {

    cargando.value = false

  }

}


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

  background:
    linear-gradient(
      135deg,
      #004b92,
      #006bc5,
      #0da0e8
    );

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


.registro-card {

  width: 100%;

  max-width: 1050px;

  display: grid;

  grid-template-columns:
    0.9fr 1.1fr;

  overflow: hidden;

  border-radius: 32px;

  background: white;

  box-shadow:
    0 30px 80px
    rgba(0, 0, 0, 0.3);

}


/* IZQUIERDA */

.presentacion {

  padding: 60px 50px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  color: white;

  background:
    linear-gradient(
      145deg,
      #004989,
      #006bc5,
      #098edd
    );

}


.logo {

  width: 75px;

  height: 75px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 22px;

  background:
    rgba(255, 255, 255, 0.15);

  font-size: 38px;

}


.presentacion h1 {

  margin:
    25px 0 5px;

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

  background:
    rgba(255, 255, 255, 0.18);

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

  margin:
    0 auto 12px;

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


.campo input {

  width: 100%;

  height: 50px;

  padding:
    0 15px;

  border:
    1px solid #d7dde4;

  border-radius: 11px;

  outline: none;

  font-size: 14px;

}


.campo input:focus {

  border-color: #006bc5;

  box-shadow:
    0 0 0 4px
    rgba(0, 107, 197, 0.09);

}


/* PASSWORD */

.password-contenedor {

  position: relative;

}


.password-contenedor input {

  padding-right: 48px;

}


.password-contenedor button {

  position: absolute;

  top: 50%;

  right: 12px;

  transform:
    translateY(-50%);

  border: none;

  background: transparent;

  cursor: pointer;

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

}


/* BOTÓN */

.btn-crear {

  width: 100%;

  height: 51px;

  border: none;

  border-radius: 12px;

  background:
    linear-gradient(
      90deg,
      #006bc5,
      #0b96e1
    );

  color: white;

  cursor: pointer;

  font-weight: bold;

  font-size: 14px;

}


.btn-crear:hover {

  box-shadow:
    0 9px 22px
    rgba(0, 107, 197, 0.28);

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

@media
(max-width: 850px) {

  .pagina-registro {

    position: absolute;

    align-items: flex-start;

  }


  .registro-card {

    grid-template-columns: 1fr;

  }


  .presentacion {

    padding:
      40px 35px;

  }


  .formulario {

    padding:
      40px 35px;

  }

}


@media
(max-width: 500px) {

  .pagina-registro {

    padding: 12px;

  }


  .registro-card {

    border-radius: 22px;

  }


  .presentacion {

    padding:
      30px 22px;

  }


  .presentacion h1 {

    font-size: 35px;

  }


  .formulario {

    padding:
      35px 20px;

  }

}

</style>