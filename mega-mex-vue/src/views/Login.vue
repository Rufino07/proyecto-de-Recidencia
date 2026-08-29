<template>
  <main class="pagina-login">

    <!-- DECORACIÓN -->
    <div class="circulo circulo-1"></div>
    <div class="circulo circulo-2"></div>

    <div class="login-contenedor">

      <!-- ================================= -->
      <!-- LADO IZQUIERDO -->
      <!-- ================================= -->

      <section class="bienvenida">

        <div class="logo-icono">
          🛒
        </div>

        <h1>MEGA-MEX</h1>

        <h2>¡Bienvenido!</h2>

        <p>
          Inicia sesión para acceder al sitio de Mega-Mex.
        </p>

        <div class="beneficios">

          <div>
            <span>✓</span>
            Consulta nuestros productos
          </div>

          <div>
            <span>✓</span>
            Conoce promociones y flyers
          </div>

          <div>
            <span>✓</span>
            Acceso de acuerdo con tu tipo de usuario
          </div>

        </div>

      </section>


      <!-- ================================= -->
      <!-- LADO DERECHO -->
      <!-- ================================= -->

      <section class="login-formulario">

        <div class="encabezado-formulario">

          <div class="usuario-icono">
            👤
          </div>

          <h2>Iniciar sesión</h2>

          <p>
            Ingresa tu correo y contraseña
          </p>

        </div>


        <form @submit.prevent="login">

          <!-- CORREO -->

          <div class="campo">

            <label>
              Correo electrónico
            </label>

            <div class="input-contenedor">

              <span class="icono-input">
                ✉️
              </span>

              <input
                v-model="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                autocomplete="username"
                required
              />

            </div>

          </div>


          <!-- CONTRASEÑA -->

          <div class="campo">

            <label>
              Contraseña
            </label>

            <div class="input-contenedor">

              <span class="icono-input">
                🔒
              </span>

              <input
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
                autocomplete="current-password"
                required
              />

              <button
                type="button"
                class="mostrar-password"
                @click="mostrarPassword = !mostrarPassword"
              >
                {{ mostrarPassword ? '🙈' : '👁️' }}
              </button>

            </div>

          </div>


          <!-- ERROR -->

          <transition name="mensaje">

            <div
              v-if="error"
              class="mensaje-error"
            >
              ⚠️ {{ error }}
            </div>

          </transition>


          <!-- BOTÓN -->

          <button
            type="submit"
            class="btn-login"
            :disabled="cargando"
          >

            <span v-if="!cargando">
              Iniciar sesión
            </span>

            <span v-else>
              Verificando...
            </span>

          </button>

        </form>


        <!-- SEGURIDAD VISUAL -->

        <div class="seguridad">

          <span>🔒</span>

          <p>
            Acceso exclusivo para usuarios autorizados.
          </p>

        </div>

      </section>

    </div>

  </main>
</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { iniciarSesion } from '../utils/auth'


const router = useRouter()

const correo = ref('')
const password = ref('')
const error = ref('')
const cargando = ref(false)
const mostrarPassword = ref(false)


// =====================================
// INICIAR SESIÓN
// =====================================

const login = () => {

  error.value = ''


  if (
    !correo.value.trim() ||
    !password.value.trim()
  ) {

    error.value =
      'Ingresa tu correo y contraseña.'

    return

  }


  cargando.value = true


  setTimeout(() => {

    const usuario = iniciarSesion(
      correo.value.trim(),
      password.value
    )


    cargando.value = false


    if (!usuario) {

      error.value =
        'Correo o contraseña incorrectos.'

      password.value = ''

      return

    }


    // ADMINISTRADOR
    if (usuario.rol === 'admin') {

      router.replace('/admin')

      return

    }


    // CLIENTE
    if (usuario.rol === 'cliente') {

      router.replace('/inicio')

      return

    }


    error.value =
      'No tienes permisos para ingresar.'

  }, 500)

}

</script>


<style scoped>

* {
  box-sizing: border-box;
}


/* ================================= */
/* PÁGINA */
/* ================================= */

.pagina-login {

  position: fixed;

  inset: 0;

  z-index: 99999;

  min-height: 100vh;

  width: 100%;

  padding: 30px 20px;

  overflow-y: auto;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    linear-gradient(
      135deg,
      #004f9d 0%,
      #006bc5 48%,
      #18a5e5 100%
    );

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* ================================= */
/* DECORACIÓN */
/* ================================= */

.circulo {

  position: absolute;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.08);
}


.circulo-1 {

  width: 500px;

  height: 500px;

  top: -220px;

  left: -180px;
}


.circulo-2 {

  width: 450px;

  height: 450px;

  bottom: -220px;

  right: -150px;
}


/* ================================= */
/* CONTENEDOR */
/* ================================= */

.login-contenedor {

  position: relative;

  z-index: 2;

  width: 100%;

  max-width: 1050px;

  min-height: 600px;

  display: grid;

  grid-template-columns:
    1fr 1fr;

  overflow: hidden;

  border-radius: 35px;

  background: white;

  box-shadow:
    0 30px 80px
    rgba(0, 0, 0, 0.28);
}


/* ================================= */
/* IZQUIERDA */
/* ================================= */

.bienvenida {

  padding: 70px 55px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  color: white;

  background:
    linear-gradient(
      150deg,
      #004c96,
      #006bc5,
      #0d91dc
    );
}


.logo-icono {

  width: 80px;

  height: 80px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 24px;

  background:
    rgba(255, 255, 255, 0.16);

  font-size: 42px;
}


.bienvenida h1 {

  margin:
    25px 0 5px;

  font-size: 47px;
}


.bienvenida h2 {

  margin: 0;

  font-size: 30px;
}


.bienvenida > p {

  margin-top: 25px;

  line-height: 1.7;

  opacity: 0.9;
}


/* ================================= */
/* BENEFICIOS */
/* ================================= */

.beneficios {

  margin-top: 35px;

  display: flex;

  flex-direction: column;

  gap: 18px;
}


.beneficios div {

  display: flex;

  align-items: center;

  gap: 13px;

  font-size: 14px;
}


.beneficios span {

  width: 30px;

  height: 30px;

  min-width: 30px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.18);
}


/* ================================= */
/* FORMULARIO */
/* ================================= */

.login-formulario {

  padding: 60px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  background: white;
}


.encabezado-formulario {

  margin-bottom: 40px;

  text-align: center;
}


.usuario-icono {

  width: 72px;

  height: 72px;

  margin:
    0 auto 18px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 22px;

  background: #eaf5ff;

  font-size: 35px;
}


.encabezado-formulario h2 {

  margin: 0;

  color: #1d2735;

  font-size: 31px;
}


.encabezado-formulario p {

  margin:
    9px 0 0;

  color: #7a8390;
}


/* ================================= */
/* CAMPOS */
/* ================================= */

.campo {

  margin-bottom: 24px;
}


.campo label {

  display: block;

  margin-bottom: 9px;

  color: #374151;

  font-size: 14px;

  font-weight: bold;
}


.input-contenedor {

  position: relative;

  display: flex;

  align-items: center;
}


.icono-input {

  position: absolute;

  left: 16px;

  z-index: 2;
}


.input-contenedor input {

  width: 100%;

  height: 55px;

  padding:
    0 50px;

  border:
    1px solid #d7dde5;

  border-radius: 14px;

  outline: none;

  background: white;

  color: #263238;

  font-size: 15px;

  transition: 0.25s;
}


.input-contenedor input:focus {

  border-color: #006bc5;

  box-shadow:
    0 0 0 4px
    rgba(0, 107, 197, 0.10);
}


/* ================================= */
/* VER CONTRASEÑA */
/* ================================= */

.mostrar-password {

  position: absolute;

  right: 12px;

  border: none;

  background: transparent;

  cursor: pointer;

  font-size: 18px;
}


/* ================================= */
/* ERROR */
/* ================================= */

.mensaje-error {

  margin-bottom: 18px;

  padding: 13px 15px;

  border:
    1px solid #ffc4c4;

  border-radius: 11px;

  background: #ffeded;

  color: #c62828;

  font-size: 13px;
}


/* ================================= */
/* LOGIN */
/* ================================= */

.btn-login {

  width: 100%;

  padding: 16px;

  border: none;

  border-radius: 14px;

  background:
    linear-gradient(
      90deg,
      #006bc5,
      #0793e3
    );

  color: white;

  cursor: pointer;

  font-size: 16px;

  font-weight: bold;

  box-shadow:
    0 9px 23px
    rgba(0, 107, 197, 0.27);

  transition: 0.3s;
}


.btn-login:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 13px 28px
    rgba(0, 107, 197, 0.33);
}


.btn-login:disabled {

  cursor: not-allowed;

  opacity: 0.7;
}


/* ================================= */
/* MENSAJE DE SEGURIDAD */
/* ================================= */

.seguridad {

  margin-top: 30px;

  padding-top: 23px;

  border-top:
    1px solid #e7eaee;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 8px;

  color: #8a929d;

  font-size: 12px;
}


.seguridad p {

  margin: 0;
}


/* ================================= */
/* ANIMACIÓN */
/* ================================= */

.mensaje-enter-active,
.mensaje-leave-active {

  transition:
    opacity 0.3s ease;
}


.mensaje-enter-from,
.mensaje-leave-to {

  opacity: 0;
}


/* ================================= */
/* TABLET */
/* ================================= */

@media
(max-width: 850px) {

  .pagina-login {

    position: absolute;

    align-items: flex-start;
  }


  .login-contenedor {

    grid-template-columns:
      1fr;
  }


  .bienvenida {

    padding:
      45px 35px;
  }


  .login-formulario {

    padding:
      45px 35px;
  }
}


/* ================================= */
/* CELULAR */
/* ================================= */

@media
(max-width: 500px) {

  .pagina-login {

    padding: 15px;
  }


  .login-contenedor {

    border-radius: 22px;
  }


  .bienvenida {

    padding:
      35px 25px;
  }


  .bienvenida h1 {

    font-size: 37px;
  }


  .login-formulario {

    padding:
      40px 22px;
  }


  .encabezado-formulario h2 {

    font-size: 27px;
  }

}

</style>