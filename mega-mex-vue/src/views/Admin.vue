<template>
  <div class="admin-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div class="logo-area">
        <div class="logo-icono">
          🛒
        </div>

        <div>
          <h2>Mega-Mex</h2>
          <p>Administración</p>
        </div>
      </div>


      <!-- MENÚ -->
      <nav class="menu">

        <RouterLink
          to="/admin"
          class="menu-item activo"
        >
          <span>🏠</span>
          Inicio
        </RouterLink>


        <button
          class="menu-item"
          @click="mostrarAviso('Flyers')"
        >
          <span>🎨</span>
          Flyers
        </button>


        <button
          class="menu-item"
          @click="mostrarAviso('Promociones')"
        >
          <span>⭐</span>
          Promociones
        </button>


        <button
          class="menu-item"
          @click="mostrarAviso('Productos')"
        >
          <span>🛒</span>
          Productos
        </button>


        <button
          class="menu-item"
          @click="mostrarAviso('Sucursales')"
        >
          <span>🏪</span>
          Sucursales
        </button>


        <button
          class="menu-item"
          @click="mostrarAviso('Redes sociales')"
        >
          <span>📱</span>
          Redes
        </button>

      </nav>


      <!-- CERRAR SESIÓN -->
      <button
        class="btn-cerrar"
        @click="salir"
      >
        <span>🚪</span>
        Cerrar sesión
      </button>

    </aside>


    <!-- CONTENIDO -->
    <main class="contenido">

      <!-- HEADER -->
      <header class="header">

        <div>
          <p class="subtitulo">
            Panel de administración
          </p>

          <h1>
            Bienvenido, {{ usuario?.nombre }}
          </h1>
        </div>


        <div class="perfil">

          <div class="avatar">
            👨‍💼
          </div>

          <div class="datos-perfil">
            <strong>
              Administrador
            </strong>

            <span>
              {{ usuario?.correo }}
            </span>
          </div>

        </div>

      </header>


      <!-- BIENVENIDA -->
      <section class="bienvenida">

        <div class="bienvenida-texto">

          <span class="etiqueta">
            PANEL ADMINISTRATIVO
          </span>

          <h2>
            Administración Mega-Mex
          </h2>

          <p>
            Desde este panel podrás administrar el contenido
            que se mostrará a los usuarios del sitio.
          </p>

        </div>


        <div class="bienvenida-icono">
          ⚙️
        </div>

      </section>


      <!-- TARJETAS -->
      <section class="tarjetas">

        <!-- FLYERS -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Flyers')"
        >

          <div class="tarjeta-icono azul">
            🎨
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Marketing
            </span>

            <h3>
              Flyers
            </h3>

            <p>
              Agrega, edita o elimina flyers
              publicitarios de productos.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>


        <!-- PROMOCIONES -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Promociones')"
        >

          <div class="tarjeta-icono amarillo">
            ⭐
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Marketing
            </span>

            <h3>
              Promociones
            </h3>

            <p>
              Administra las promociones
              que se mostrarán en el sitio.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>


        <!-- PRODUCTOS -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Productos')"
        >

          <div class="tarjeta-icono verde">
            🛒
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Catálogo
            </span>

            <h3>
              Productos
            </h3>

            <p>
              Administra los productos
              mostrados a los clientes.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>


        <!-- SUCURSALES -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Sucursales')"
        >

          <div class="tarjeta-icono morado">
            🏪
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Empresa
            </span>

            <h3>
              Sucursales
            </h3>

            <p>
              Administra la información
              de las sucursales Mega-Mex.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>


        <!-- REDES -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Redes sociales')"
        >

          <div class="tarjeta-icono rosa">
            📱
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Comunicación
            </span>

            <h3>
              Redes sociales
            </h3>

            <p>
              Administra los enlaces
              de las redes sociales.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>


        <!-- CONTACTO -->
        <article
          class="tarjeta"
          @click="mostrarAviso('Contacto')"
        >

          <div class="tarjeta-icono naranja">
            📞
          </div>

          <div class="tarjeta-info">

            <span class="estado">
              Información
            </span>

            <h3>
              Contacto
            </h3>

            <p>
              Administra teléfonos,
              correo y datos de contacto.
            </p>

          </div>

          <div class="flecha">
            →
          </div>

        </article>

      </section>


      <!-- AVISO -->
      <transition name="mensaje">

        <div
          v-if="mensaje"
          class="mensaje"
        >
          <span>ℹ️</span>

          <div>
            <strong>
              {{ mensaje }}
            </strong>

            <p>
              Esta sección la construiremos posteriormente.
            </p>
          </div>

          <button
            @click="mensaje = ''"
          >
            ✕
          </button>
        </div>

      </transition>

    </main>

  </div>
</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  obtenerUsuario,
  cerrarSesion
} from '../utils/auth'


const router = useRouter()

const usuario = obtenerUsuario()

const mensaje = ref('')


/* ============================== */
/* MOSTRAR AVISO */
/* ============================== */

const mostrarAviso = (seccion) => {

  mensaje.value =
    `Administración de ${seccion}`


  setTimeout(() => {

    mensaje.value = ''

  }, 3500)

}


/* ============================== */
/* CERRAR SESIÓN */
/* ============================== */

const salir = () => {

  cerrarSesion()

  router.push('/login')

}

</script>


<style scoped>

* {
  box-sizing: border-box;
}


/* ============================== */
/* LAYOUT */
/* ============================== */

.admin-layout {

  min-height: 100vh;

  display: flex;

  background:
    #f4f7fb;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


/* ============================== */
/* SIDEBAR */
/* ============================== */

.sidebar {

  width: 270px;

  min-height: 100vh;

  position: fixed;

  top: 0;

  left: 0;

  padding:
    28px 20px;

  display: flex;

  flex-direction: column;

  color: white;

  background:
    linear-gradient(
      180deg,
      #003f7d 0%,
      #005dad 45%,
      #006bc5 100%
    );

  box-shadow:
    5px 0 25px
    rgba(0, 0, 0, 0.12);

}


/* ============================== */
/* LOGO */
/* ============================== */

.logo-area {

  display: flex;

  align-items: center;

  gap: 13px;

  padding:
    5px 8px 25px;

  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.15);

}


.logo-icono {

  width: 52px;

  height: 52px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 16px;

  background:
    rgba(255, 255, 255, 0.15);

  font-size: 27px;

}


.logo-area h2 {

  margin: 0;

  font-size: 22px;

}


.logo-area p {

  margin:
    4px 0 0;

  font-size: 12px;

  opacity: 0.75;

}


/* ============================== */
/* MENÚ */
/* ============================== */

.menu {

  margin-top: 30px;

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.menu-item {

  width: 100%;

  padding:
    13px 15px;

  border: none;

  border-radius: 12px;

  display: flex;

  align-items: center;

  gap: 13px;

  background:
    transparent;

  color:
    rgba(255, 255, 255, 0.88);

  text-decoration: none;

  text-align: left;

  cursor: pointer;

  font-size: 14px;

  transition:
    0.25s;

}


.menu-item span {

  font-size: 20px;

}


.menu-item:hover {

  background:
    rgba(255, 255, 255, 0.13);

  color: white;

  transform:
    translateX(4px);

}


.menu-item.activo {

  background:
    rgba(255, 255, 255, 0.18);

  color: white;

  font-weight: bold;

}


/* ============================== */
/* CERRAR SESIÓN */
/* ============================== */

.btn-cerrar {

  margin-top: auto;

  padding:
    14px;

  border:
    1px solid
    rgba(255, 255, 255, 0.20);

  border-radius:
    12px;

  background:
    rgba(255, 255, 255, 0.10);

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition:
    0.3s;

}


.btn-cerrar:hover {

  background:
    #ffffff;

  color:
    #006bc5;

}


/* ============================== */
/* CONTENIDO */
/* ============================== */

.contenido {

  width:
    calc(100% - 270px);

  margin-left:
    270px;

  padding:
    35px;

}


/* ============================== */
/* HEADER */
/* ============================== */

.header {

  padding:
    23px 28px;

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  background:
    white;

  border-radius:
    20px;

  box-shadow:
    0 6px 25px
    rgba(0, 0, 0, 0.06);

}


.subtitulo {

  margin: 0;

  color:
    #89919d;

  font-size: 13px;

}


.header h1 {

  margin:
    5px 0 0;

  color:
    #1f2937;

  font-size:
    27px;

}


/* ============================== */
/* PERFIL */
/* ============================== */

.perfil {

  display: flex;

  align-items: center;

  gap: 12px;

}


.avatar {

  width: 50px;

  height: 50px;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    #eaf5ff;

  border-radius:
    15px;

  font-size: 26px;

}


.datos-perfil {

  display: flex;

  flex-direction: column;

}


.datos-perfil strong {

  color:
    #29313d;

  font-size: 13px;

}


.datos-perfil span {

  margin-top:
    4px;

  color:
    #8a929c;

  font-size:
    11px;

}


/* ============================== */
/* BIENVENIDA */
/* ============================== */

.bienvenida {

  margin-top:
    30px;

  padding:
    35px 40px;

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  overflow:
    hidden;

  border-radius:
    25px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #0058a7,
      #006bc5,
      #18a3e5
    );

  box-shadow:
    0 15px 35px
    rgba(0, 107, 197, 0.20);

}


.bienvenida-texto {

  max-width:
    600px;

}


.etiqueta {

  padding:
    7px 14px;

  border-radius:
    25px;

  background:
    rgba(255, 255, 255, 0.15);

  font-size:
    11px;

  font-weight:
    bold;

  letter-spacing:
    1px;

}


.bienvenida h2 {

  margin:
    18px 0 10px;

  font-size:
    31px;

}


.bienvenida p {

  margin: 0;

  line-height:
    1.6;

  opacity:
    0.88;

}


.bienvenida-icono {

  font-size:
    90px;

  opacity:
    0.8;

  animation:
    girar 8s
    linear
    infinite;

}


@keyframes girar {

  from {
    transform:
      rotate(0deg);
  }

  to {
    transform:
      rotate(360deg);
  }

}


/* ============================== */
/* TARJETAS */
/* ============================== */

.tarjetas {

  margin-top:
    30px;

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    22px;

}


.tarjeta {

  position: relative;

  padding:
    27px;

  border-radius:
    20px;

  background:
    white;

  cursor:
    pointer;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.06);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

}


.tarjeta:hover {

  transform:
    translateY(-7px);

  box-shadow:
    0 17px 35px
    rgba(0, 0, 0, 0.11);

}


/* ============================== */
/* ICONOS */
/* ============================== */

.tarjeta-icono {

  width: 62px;

  height: 62px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius:
    18px;

  font-size:
    31px;

}


.azul {
  background: #eaf5ff;
}


.amarillo {
  background: #fff8df;
}


.verde {
  background: #e9f9f0;
}


.morado {
  background: #f2eaff;
}


.rosa {
  background: #ffeaf1;
}


.naranja {
  background: #fff0df;
}


/* ============================== */
/* INFO TARJETA */
/* ============================== */

.tarjeta-info {

  margin-top:
    20px;

}


.estado {

  color:
    #006bc5;

  font-size:
    10px;

  font-weight:
    bold;

  text-transform:
    uppercase;

}


.tarjeta h3 {

  margin:
    8px 0;

  color:
    #202938;

  font-size:
    19px;

}


.tarjeta p {

  margin: 0;

  color:
    #777f8a;

  line-height:
    1.5;

  font-size:
    13px;

}


.flecha {

  position:
    absolute;

  right:
    22px;

  bottom:
    22px;

  color:
    #006bc5;

  font-size:
    23px;

  transition:
    0.3s;

}


.tarjeta:hover .flecha {

  transform:
    translateX(5px);

}


/* ============================== */
/* MENSAJE */
/* ============================== */

.mensaje {

  position:
    fixed;

  z-index:
    9999;

  right:
    30px;

  bottom:
    30px;

  width:
    360px;

  padding:
    18px;

  display:
    flex;

  align-items:
    flex-start;

  gap:
    12px;

  border-radius:
    16px;

  background:
    white;

  box-shadow:
    0 15px 40px
    rgba(0, 0, 0, 0.20);

}


.mensaje > span {

  font-size:
    25px;

}


.mensaje strong {

  color:
    #202938;

}


.mensaje p {

  margin:
    5px 0 0;

  color:
    #777;

  font-size:
    12px;

}


.mensaje button {

  margin-left:
    auto;

  border:
    none;

  background:
    transparent;

  color:
    #777;

  cursor:
    pointer;

}


/* ============================== */
/* ANIMACIÓN */
/* ============================== */

.mensaje-enter-active,
.mensaje-leave-active {

  transition:
    0.3s;

}


.mensaje-enter-from {

  opacity:
    0;

  transform:
    translateY(20px);

}


.mensaje-leave-to {

  opacity:
    0;

  transform:
    translateY(20px);

}


/* ============================== */
/* TABLET */
/* ============================== */

@media
(max-width: 1000px) {

  .tarjetas {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


/* ============================== */
/* RESPONSIVE */
/* ============================== */

@media
(max-width: 750px) {

  .admin-layout {

    flex-direction:
      column;

  }


  .sidebar {

    width:
      100%;

    min-height:
      auto;

    position:
      relative;

  }


  .menu {

    display:
      grid;

    grid-template-columns:
      repeat(2, 1fr);

  }


  .btn-cerrar {

    margin-top:
      25px;

  }


  .contenido {

    width:
      100%;

    margin-left:
      0;

    padding:
      20px;

  }


  .header {

    flex-direction:
      column;

    align-items:
      flex-start;

    gap:
      20px;

  }


  .bienvenida {

    padding:
      30px 25px;

  }


  .bienvenida-icono {

    display:
      none;

  }


  .tarjetas {

    grid-template-columns:
      1fr;

  }


  .mensaje {

    width:
      auto;

    left:
      15px;

    right:
      15px;

    bottom:
      15px;

  }

}

</style>