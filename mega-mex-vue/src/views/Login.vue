<template>
  <main class="pagina-login">

    <!-- ================================= -->
    <!-- FONDO ANIMADO -->
    <!-- ================================= -->

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


    <!-- ================================= -->
    <!-- TARJETA -->
    <!-- ================================= -->

    <section class="login-card">

      <!-- ================================= -->
      <!-- PANEL IZQUIERDO -->
      <!-- ================================= -->

      <aside class="presentacion">

        <div class="circulo-decorativo circulo-a"></div>
        <div class="circulo-decorativo circulo-b"></div>

        <div class="contenido-presentacion">

          <div class="logo">
            🛒
          </div>

          <h1>
            MEGA-<span>MEX</span>
          </h1>

          <h2>
            ¡Bienvenido!
          </h2>

          <p class="descripcion">
            Accede al sitio para consultar productos,
            promociones, flyers y todas las novedades
            que Mega-Mex tiene para ti.
          </p>


          <div class="ventajas">

            <div
              class="ventaja"
              style="--delay: 0.2s"
            >
              <span class="check">
                ✓
              </span>

              <p>
                Consulta nuestros productos
              </p>
            </div>


            <div
              class="ventaja"
              style="--delay: 0.4s"
            >
              <span class="check">
                ✓
              </span>

              <p>
                Descubre promociones
              </p>
            </div>


            <div
              class="ventaja"
              style="--delay: 0.6s"
            >
              <span class="check">
                ✓
              </span>

              <p>
                Conoce las novedades de Mega-Mex
              </p>
            </div>

          </div>

        </div>

      </aside>


      <!-- ================================= -->
      <!-- PANEL DERECHO -->
      <!-- ================================= -->

      <section class="formulario">

        <!-- ENCABEZADO -->

        <div class="encabezado">

          <div
            class="icono-usuario"
            :class="{
              admin: tipoAcceso === 'admin'
            }"
          >
            <span
              :key="tipoAcceso"
              class="icono-cambio"
            >
              {{
                tipoAcceso === 'usuario'
                  ? '👤'
                  : '🔐'
              }}
            </span>
          </div>


          <h2>
            Iniciar sesión
          </h2>

          <p>
            Selecciona tu tipo de acceso
          </p>

        </div>


        <!-- ================================= -->
        <!-- SELECTOR -->
        <!-- ================================= -->

        <div class="selector">

          <div
            class="selector-fondo"
            :class="{
              mover: tipoAcceso === 'admin'
            }"
          ></div>


          <button
            type="button"
            :class="{
              activo:
                tipoAcceso === 'usuario'
            }"
            @click="cambiarTipo('usuario')"
          >
            <span>👤</span>

            Usuario
          </button>


          <button
            type="button"
            :class="{
              activo:
                tipoAcceso === 'admin'
            }"
            @click="cambiarTipo('admin')"
          >
            <span>🔐</span>

            Administrador
          </button>

        </div>


        <!-- ================================= -->
        <!-- CONTENIDO ANIMADO -->
        <!-- ================================= -->

        <Transition
          name="cambio"
          mode="out-in"
        >

          <div
            :key="tipoAcceso"
            class="contenido-login"
          >

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


            <!-- ================================= -->
            <!-- FORMULARIO -->
            <!-- ================================= -->

            <form @submit.prevent="login">

              <!-- CORREO -->

              <div class="campo">

                <label for="correo">
                  Correo electrónico
                </label>


                <div class="input-contenedor">

                  <span class="icono-input">
                    ✉️
                  </span>


                  <input
                    id="correo"
                    v-model="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    autocomplete="username"
                    :disabled="cargando"
                  />

                </div>

              </div>


              <!-- CONTRASEÑA -->

              <div class="campo">

                <label for="password">
                  Contraseña
                </label>


                <div class="input-contenedor">

                  <span class="icono-input">
                    🔒
                  </span>


                  <input
                    id="password"
                    v-model="password"
                    :type="
                      mostrarPassword
                        ? 'text'
                        : 'password'
                    "
                    placeholder="Ingresa tu contraseña"
                    autocomplete="current-password"
                    :disabled="cargando"
                  />


                  <button
                    type="button"
                    class="mostrar-password"
                    :disabled="cargando"
                    @click="
                      mostrarPassword =
                        !mostrarPassword
                    "
                  >
                    {{
                      mostrarPassword
                        ? '🙈'
                        : '👁️'
                    }}
                  </button>

                </div>

              </div>


              <!-- ================================= -->
              <!-- ERROR -->
              <!-- ================================= -->

              <Transition name="mensaje">

                <div
                  v-if="error"
                  class="mensaje-error"
                >
                  <span>
                    ⚠️
                  </span>

                  {{ error }}
                </div>

              </Transition>


              <!-- ================================= -->
              <!-- MENSAJE -->
              <!-- ================================= -->

              <Transition name="mensaje">

                <div
                  v-if="mensaje"
                  class="mensaje-info"
                >
                  <span>
                    ℹ️
                  </span>

                  {{ mensaje }}
                </div>

              </Transition>


              <!-- ================================= -->
              <!-- BOTÓN LOGIN -->
              <!-- ================================= -->

              <button
                type="submit"
                class="btn-login"
                :disabled="cargando"
              >

                <span class="brillo"></span>


                <span
                  v-if="cargando"
                  class="loader"
                ></span>


                <span v-if="cargando">
                  Verificando acceso...
                </span>


                <span
                  v-else-if="
                    tipoAcceso === 'admin'
                  "
                >
                  Iniciar como administrador
                  <span class="flecha">→</span>
                </span>


                <span v-else>
                  Iniciar sesión
                  <span class="flecha">→</span>
                </span>

              </button>

            </form>


            <!-- ================================= -->
            <!-- OPCIONES USUARIO -->
            <!-- ================================= -->

            <template
              v-if="
                tipoAcceso === 'usuario'
              "
            >

              <div class="separador">

                <span></span>

                <p>
                  o continuar con
                </p>

                <span></span>

              </div>


              <div class="login-social">

                <button
                  type="button"
                  class="social google"
                  @click="
                    loginSocial('Google')
                  "
                >
                  <span class="google-icon">
                    G
                  </span>

                  Google
                </button>


                <button
                  type="button"
                  class="social facebook"
                  @click="
                    loginSocial('Facebook')
                  "
                >
                  <span class="facebook-icon">
                    f
                  </span>

                  Facebook
                </button>

              </div>


              <div class="crear-cuenta">

                <span>
                  ¿No tienes una cuenta?
                </span>

                <button
                  type="button"
                  @click="irARegistro"
                >
                  Crear una cuenta
                </button>

              </div>

            </template>


            <!-- ================================= -->
            <!-- ADMIN -->
            <!-- ================================= -->

            <div
              v-else
              class="seguridad-admin"
            >

              <span class="escudo">
                🛡️
              </span>


              <div>

                <strong>
                  Área protegida
                </strong>

                <p>
                  Solo el personal autorizado
                  puede acceder al panel.
                </p>

              </div>

            </div>

          </div>

        </Transition>

      </section>

    </section>

  </main>
</template>


<script setup>

import {
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  iniciarSesion
} from '../utils/auth'


const router =
  useRouter()


// ==========================================
// VARIABLES
// ==========================================

const tipoAcceso =
  ref('usuario')

const correo =
  ref('')

const password =
  ref('')

const mostrarPassword =
  ref(false)

const cargando =
  ref(false)

const error =
  ref('')

const mensaje =
  ref('')


// ==========================================
// CAMBIAR TIPO DE ACCESO
// ==========================================

const cambiarTipo = (tipo) => {

  if (
    tipoAcceso.value === tipo
  ) {
    return
  }


  tipoAcceso.value =
    tipo


  correo.value =
    ''

  password.value =
    ''

  error.value =
    ''

  mensaje.value =
    ''

  mostrarPassword.value =
    false

}


// ==========================================
// VALIDACIÓN DE CORREO
// ==========================================

const correoValido =
  (correo) => {

    const expresion =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    return expresion.test(
      correo
    )

  }


// ==========================================
// LOGIN
// ==========================================

const login = async () => {

  error.value =
    ''

  mensaje.value =
    ''


  const correoLimpio =
    correo.value
      .trim()


  // CAMPOS VACÍOS

  if (
    !correoLimpio ||
    !password.value
  ) {

    error.value =
      'Ingresa tu correo y contraseña.'

    return

  }


  // CORREO

  if (
    !correoValido(
      correoLimpio
    )
  ) {

    error.value =
      'Ingresa un correo electrónico válido.'

    return

  }


  cargando.value =
    true


  try {

    const sesion =
      await iniciarSesion(
        correoLimpio,
        password.value
      )


    const usuario =
      sesion.usuario


    if (!usuario) {

      throw new Error(
        'No se pudo obtener la información del usuario.'
      )

    }


    // ======================================
    // ADMINISTRADOR
    // ======================================

    if (
      tipoAcceso.value ===
      'admin'
    ) {

      if (
        usuario.rol !==
        'admin'
      ) {

        throw new Error(
          'Esta cuenta no tiene permisos de administrador.'
        )

      }


      router.replace(
        '/admin'
      )

      return

    }


    // ======================================
    // USUARIO
    // ======================================

    if (
      tipoAcceso.value ===
      'usuario'
    ) {

      if (
        usuario.rol !==
        'cliente'
      ) {

        throw new Error(
          'Esta cuenta corresponde al área administrativa.'
        )

      }


      router.replace(
        '/inicio'
      )

    }

  }

  catch (err) {

    error.value =
      err.message ||
      'No fue posible iniciar sesión.'


    password.value =
      ''

  }

  finally {

    cargando.value =
      false

  }

}


// ==========================================
// REGISTRO
// ==========================================

const irARegistro = () => {

  router.push(
    '/registro'
  )

}


// ==========================================
// GOOGLE / FACEBOOK
// ==========================================

const loginSocial =
  (proveedor) => {

    error.value =
      ''

    mensaje.value =
      `El acceso con ${proveedor} se conectará al implementar el backend.`

  }

</script>


<style scoped>

/* ==========================================
   CONFIGURACIÓN
========================================== */

* {
  box-sizing: border-box;
}


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

  background:
    linear-gradient(
      -45deg,
      #003d78,
      #0059ad,
      #006bc5,
      #0b91db,
      #00a7e9
    );

  background-size:
    400% 400%;

  animation:
    fondoAnimado
    13s ease
    infinite;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


@keyframes fondoAnimado {

  0% {
    background-position:
      0% 50%;
  }

  50% {
    background-position:
      100% 50%;
  }

  100% {
    background-position:
      0% 50%;
  }

}


/* ==========================================
   LUCES FLOTANTES
========================================== */

.fondo-luz {

  position: absolute;

  border-radius: 50%;

  filter:
    blur(3px);

  background:
    rgba(255, 255, 255, 0.09);

  pointer-events: none;

}


.luz-1 {

  width: 430px;

  height: 430px;

  top: -180px;

  left: -100px;

  animation:
    flotar1
    9s ease-in-out
    infinite;

}


.luz-2 {

  width: 330px;

  height: 330px;

  right: -100px;

  bottom: -100px;

  animation:
    flotar2
    11s ease-in-out
    infinite;

}


.luz-3 {

  width: 190px;

  height: 190px;

  top: 20%;

  right: 6%;

  opacity: 0.4;

  animation:
    flotar1
    13s ease-in-out
    infinite reverse;

}


@keyframes flotar1 {

  0%,
  100% {

    transform:
      translate(0, 0);

  }

  50% {

    transform:
      translate(
        40px,
        45px
      );

  }

}


@keyframes flotar2 {

  0%,
  100% {

    transform:
      translate(0, 0)
      scale(1);

  }

  50% {

    transform:
      translate(
        -35px,
        -45px
      )
      scale(1.12);

  }

}


/* ==========================================
   PARTÍCULAS
========================================== */

.particula {

  position: absolute;

  width: 7px;

  height: 7px;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.35);

  animation:
    subir
    9s linear
    infinite;

}


.particula-1 {
  left: 5%;
  bottom: -20px;
  animation-delay: 0s;
}

.particula-2 {
  left: 12%;
  bottom: -20px;
  animation-delay: 2s;
}

.particula-3 {
  left: 22%;
  bottom: -20px;
  animation-delay: 4s;
}

.particula-4 {
  left: 35%;
  bottom: -20px;
  animation-delay: 1s;
}

.particula-5 {
  left: 45%;
  bottom: -20px;
  animation-delay: 6s;
}

.particula-6 {
  left: 55%;
  bottom: -20px;
  animation-delay: 3s;
}

.particula-7 {
  left: 63%;
  bottom: -20px;
  animation-delay: 8s;
}

.particula-8 {
  left: 72%;
  bottom: -20px;
  animation-delay: 2.5s;
}

.particula-9 {
  left: 80%;
  bottom: -20px;
  animation-delay: 5s;
}

.particula-10 {
  left: 88%;
  bottom: -20px;
  animation-delay: 1.5s;
}

.particula-11 {
  left: 94%;
  bottom: -20px;
  animation-delay: 7s;
}

.particula-12 {
  left: 50%;
  bottom: -20px;
  animation-delay: 9s;
}


@keyframes subir {

  0% {

    transform:
      translateY(0)
      scale(0.4);

    opacity: 0;

  }

  20% {

    opacity: 0.8;

  }

  100% {

    transform:
      translateY(
        -110vh
      )
      scale(1.3);

    opacity: 0;

  }

}


/* ==========================================
   TARJETA
========================================== */

.login-card {

  position: relative;

  z-index: 5;

  width:
    min(
      1150px,
      100%
    );

  min-height: 670px;

  display: grid;

  grid-template-columns:
    0.9fr 1.1fr;

  overflow: hidden;

  border:
    1px solid
    rgba(255, 255, 255, 0.3);

  border-radius: 32px;

  background: white;

  box-shadow:
    0 35px 90px
    rgba(0, 30, 70, 0.38);

  animation:
    aparecerCard
    0.8s
    cubic-bezier(
      0.2,
      0.8,
      0.2,
      1
    );

}


@keyframes aparecerCard {

  from {

    opacity: 0;

    transform:
      translateY(35px)
      scale(0.96);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}


/* ==========================================
   PANEL IZQUIERDO
========================================== */

.presentacion {

  position: relative;

  overflow: hidden;

  padding:
    65px 55px;

  display: flex;

  align-items: center;

  color: white;

  background:
    linear-gradient(
      145deg,
      #00498e,
      #006bc5,
      #008de0
    );

}


.contenido-presentacion {

  position: relative;

  z-index: 4;

}


.circulo-decorativo {

  position: absolute;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.06);

}


.circulo-a {

  width: 400px;

  height: 400px;

  top: -200px;

  left: -160px;

  animation:
    pulsoCirculo
    7s ease-in-out
    infinite;

}


.circulo-b {

  width: 230px;

  height: 230px;

  bottom: -100px;

  right: -80px;

  animation:
    pulsoCirculo
    8s ease-in-out
    infinite reverse;

}


@keyframes pulsoCirculo {

  50% {

    transform:
      scale(1.18);

  }

}


/* LOGO */

.logo {

  width: 82px;

  height: 82px;

  display: flex;

  align-items: center;

  justify-content: center;

  border:
    1px solid
    rgba(255, 255, 255, 0.2);

  border-radius: 25px;

  background:
    rgba(255, 255, 255, 0.13);

  backdrop-filter:
    blur(10px);

  font-size: 42px;

  box-shadow:
    0 10px 25px
    rgba(0, 0, 0, 0.1);

  animation:
    logoFlotar
    3.5s ease-in-out
    infinite;

}


@keyframes logoFlotar {

  0%,
  100% {

    transform:
      translateY(0)
      rotate(-2deg);

  }

  50% {

    transform:
      translateY(-10px)
      rotate(2deg);

  }

}


.presentacion h1 {

  margin:
    28px 0 4px;

  font-size:
    clamp(
      38px,
      4vw,
      50px
    );

  letter-spacing:
    1px;

}


.presentacion h1 span {

  color:
    #e7f7ff;

}


.presentacion h2 {

  margin: 0;

  font-size: 30px;

}


.descripcion {

  max-width: 410px;

  margin-top: 25px;

  line-height: 1.8;

  color:
    rgba(255, 255, 255, 0.88);

}


/* VENTAJAS */

.ventajas {

  margin-top: 37px;

  display: flex;

  flex-direction: column;

  gap: 16px;

}


.ventaja {

  display: flex;

  align-items: center;

  gap: 13px;

  opacity: 0;

  transform:
    translateX(-20px);

  animation:
    aparecerVentaja
    0.6s ease
    forwards;

  animation-delay:
    var(--delay);

}


@keyframes aparecerVentaja {

  to {

    opacity: 1;

    transform:
      translateX(0);

  }

}


.ventaja p {

  margin: 0;

  font-size: 14px;

}


.check {

  width: 32px;

  height: 32px;

  min-width: 32px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.15);

  transition:
    0.3s ease;

}


.ventaja:hover .check {

  transform:
    scale(1.15)
    rotate(8deg);

  background:
    rgba(255, 255, 255, 0.28);

}


/* ==========================================
   FORMULARIO
========================================== */

.formulario {

  padding:
    42px 60px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  background:
    linear-gradient(
      180deg,
      #ffffff,
      #fbfdff
    );

}


/* ENCABEZADO */

.encabezado {

  text-align: center;

}


.icono-usuario {

  width: 70px;

  height: 70px;

  margin:
    0 auto 15px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      #e4f3ff,
      #f0f8ff
    );

  box-shadow:
    0 9px 20px
    rgba(0, 107, 197, 0.10);

  transition:
    0.4s ease;

}


.icono-usuario.admin {

  background:
    linear-gradient(
      135deg,
      #eae7ff,
      #f7f5ff
    );

}


.icono-cambio {

  display: block;

  font-size: 31px;

  animation:
    iconoEntrada
    0.45s ease;

}


@keyframes iconoEntrada {

  0% {

    opacity: 0;

    transform:
      scale(0.5)
      rotate(-15deg);

  }

  100% {

    opacity: 1;

    transform:
      scale(1)
      rotate(0);

  }

}


.encabezado h2 {

  margin: 0;

  color: #172033;

  font-size: 31px;

}


.encabezado p {

  margin:
    7px 0 23px;

  color: #7c8798;

}


/* ==========================================
   SELECTOR
========================================== */

.selector {

  position: relative;

  padding: 5px;

  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  border-radius: 15px;

  background: #edf2f8;

}


.selector-fondo {

  position: absolute;

  top: 5px;

  left: 5px;

  width:
    calc(
      50% - 7.5px
    );

  height:
    calc(
      100% - 10px
    );

  border-radius: 11px;

  background: white;

  box-shadow:
    0 6px 16px
    rgba(0, 36, 80, 0.1);

  transition:
    transform
    0.45s
    cubic-bezier(
      0.34,
      1.56,
      0.64,
      1
    );

}


.selector-fondo.mover {

  transform:
    translateX(
      calc(
        100% + 5px
      )
    );

}


.selector button {

  position: relative;

  z-index: 2;

  height: 52px;

  border: none;

  background: transparent;

  color: #68758a;

  cursor: pointer;

  font-size: 14px;

  font-weight: 700;

  transition:
    0.3s ease;

}


.selector button span {

  margin-right: 7px;

}


.selector button.activo {

  color: #006bc5;

}


/* ==========================================
   CONTENIDO
========================================== */

.contenido-login {

  width: 100%;

}


.tipo-info {

  margin:
    24px 0 20px;

}


.tipo-info h3 {

  margin:
    0 0 6px;

  color: #202b3c;

  font-size: 17px;

}


.tipo-info p {

  margin: 0;

  color: #8993a2;

  font-size: 13px;

}


/* TRANSICIÓN USUARIO ADMIN */

.cambio-enter-active,
.cambio-leave-active {

  transition:
    all
    0.3s ease;

}


.cambio-enter-from {

  opacity: 0;

  transform:
    translateX(20px);

}


.cambio-leave-to {

  opacity: 0;

  transform:
    translateX(-20px);

}


/* ==========================================
   CAMPOS
========================================== */

.campo {

  margin-bottom: 19px;

}


.campo label {

  display: block;

  margin-bottom: 8px;

  color: #303b4c;

  font-size: 13px;

  font-weight: 700;

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

  opacity: 0.7;

  transition:
    0.3s ease;

}


.input-contenedor input {

  width: 100%;

  height: 55px;

  padding:
    0 50px;

  border:
    1px solid #d5dde7;

  border-radius: 14px;

  outline: none;

  background: white;

  color: #273447;

  font-size: 14px;

  transition:
    all 0.3s ease;

}


.input-contenedor input:hover {

  border-color:
    #a8cce7;

}


.input-contenedor input:focus {

  border-color:
    #006bc5;

  box-shadow:
    0 0 0 4px
    rgba(0, 107, 197, 0.10);

  transform:
    translateY(-1px);

}


.input-contenedor:focus-within
.icono-input {

  transform:
    scale(1.12);

  opacity: 1;

}


.mostrar-password {

  position: absolute;

  right: 14px;

  border: none;

  background: transparent;

  cursor: pointer;

  transition:
    0.2s ease;

}


.mostrar-password:hover {

  transform:
    scale(1.15);

}


/* ==========================================
   BOTÓN LOGIN
========================================== */

.btn-login {

  position: relative;

  width: 100%;

  height: 55px;

  overflow: hidden;

  border: none;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  background:
    linear-gradient(
      90deg,
      #006bc5,
      #0796df
    );

  color: white;

  cursor: pointer;

  font-size: 14px;

  font-weight: 700;

  box-shadow:
    0 10px 24px
    rgba(0, 107, 197, 0.26);

  transition:
    all 0.3s ease;

}


.btn-login:hover:not(:disabled) {

  transform:
    translateY(-3px);

  box-shadow:
    0 15px 30px
    rgba(0, 107, 197, 0.35);

}


.btn-login:active:not(:disabled) {

  transform:
    translateY(0)
    scale(0.98);

}


.brillo {

  position: absolute;

  top: 0;

  left: -120%;

  width: 70%;

  height: 100%;

  transform:
    skewX(-20deg);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.35),
      transparent
    );

}


.btn-login:hover .brillo {

  animation:
    brilloBoton
    0.8s ease;

}


@keyframes brilloBoton {

  to {

    left: 150%;

  }

}


.flecha {

  display: inline-block;

  margin-left: 5px;

  transition:
    transform 0.3s ease;

}


.btn-login:hover .flecha {

  transform:
    translateX(5px);

}


/* LOADER */

.loader {

  width: 18px;

  height: 18px;

  border:
    2px solid
    rgba(255,255,255,0.4);

  border-top-color:
    white;

  border-radius: 50%;

  animation:
    girar
    0.7s linear
    infinite;

}


@keyframes girar {

  to {

    transform:
      rotate(360deg);

  }

}


/* ==========================================
   MENSAJES
========================================== */

.mensaje-error,
.mensaje-info {

  margin-bottom: 15px;

  padding: 12px 14px;

  border-radius: 11px;

  font-size: 12px;

}


.mensaje-error {

  border:
    1px solid #ffcaca;

  background: #fff0f0;

  color: #c62828;

}


.mensaje-info {

  border:
    1px solid #b8defa;

  background: #eef8ff;

  color: #1769aa;

}


.mensaje-enter-active,
.mensaje-leave-active {

  transition:
    all 0.3s ease;

}


.mensaje-enter-from,
.mensaje-leave-to {

  opacity: 0;

  transform:
    translateY(-8px);

}


/* ==========================================
   SEPARADOR
========================================== */

.separador {

  margin:
    23px 0 16px;

  display: flex;

  align-items: center;

  gap: 12px;

}


.separador span {

  flex: 1;

  height: 1px;

  background: #dfe5ec;

}


.separador p {

  margin: 0;

  color: #959eaa;

  font-size: 11px;

}


/* ==========================================
   SOCIAL
========================================== */

.login-social {

  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 12px;

}


.social {

  height: 48px;

  border:
    1px solid #d9e0e8;

  border-radius: 12px;

  background: white;

  cursor: pointer;

  font-weight: 700;

  transition:
    all 0.3s ease;

}


.social:hover {

  transform:
    translateY(-3px);

  border-color:
    #b8c9d8;

  box-shadow:
    0 8px 20px
    rgba(0, 30, 60, 0.09);

}


.google-icon {

  margin-right: 8px;

  color: #4285f4;

  font-size: 18px;

}


.facebook-icon {

  margin-right: 8px;

  color: #1877f2;

  font-size: 21px;

}


/* ==========================================
   CREAR CUENTA
========================================== */

.crear-cuenta {

  margin-top: 21px;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 7px;

  color: #7e8997;

  font-size: 12px;

}


.crear-cuenta button {

  position: relative;

  border: none;

  background: transparent;

  color: #006bc5;

  cursor: pointer;

  font-weight: 700;

}


.crear-cuenta button::after {

  content: '';

  position: absolute;

  left: 0;

  bottom: -3px;

  width: 0;

  height: 2px;

  background: #006bc5;

  transition:
    width 0.3s ease;

}


.crear-cuenta button:hover::after {

  width: 100%;

}


/* ==========================================
   ADMIN
========================================== */

.seguridad-admin {

  margin-top: 22px;

  padding: 16px;

  display: flex;

  align-items: center;

  gap: 13px;

  border:
    1px solid #e2e7ed;

  border-radius: 13px;

  background:
    linear-gradient(
      135deg,
      #f7f9fc,
      #f1f5f9
    );

}


.escudo {

  font-size: 25px;

}


.seguridad-admin strong {

  color: #354052;

  font-size: 12px;

}


.seguridad-admin p {

  margin:
    4px 0 0;

  color: #8a94a2;

  font-size: 11px;

}


/* ==========================================
   TABLET
========================================== */

@media
(max-width: 900px) {

  .pagina-login {

    position: absolute;

    align-items: flex-start;

  }


  .login-card {

    grid-template-columns:
      1fr;

  }


  .presentacion {

    min-height: 420px;

    padding:
      45px 40px;

  }


  .formulario {

    padding:
      45px 40px;

  }

}


/* ==========================================
   CELULAR
========================================== */

@media
(max-width: 520px) {

  .pagina-login {

    padding: 12px;

  }


  .login-card {

    border-radius: 23px;

  }


  .presentacion {

    min-height: auto;

    padding:
      35px 25px;

  }


  .logo {

    width: 65px;

    height: 65px;

    font-size: 32px;

  }


  .presentacion h1 {

    font-size: 35px;

  }


  .presentacion h2 {

    font-size: 24px;

  }


  .formulario {

    padding:
      35px 20px;

  }


  .encabezado h2 {

    font-size: 27px;

  }


  .selector button {

    font-size: 12px;

  }


  .login-social {

    grid-template-columns:
      1fr;

  }


  .crear-cuenta {

    flex-direction: column;

  }

}


/* ==========================================
   REDUCIR ANIMACIONES SI EL DISPOSITIVO
   LO SOLICITA
========================================== */

@media
(prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {

    animation-duration:
      0.01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.01ms !important;

  }

}

</style>