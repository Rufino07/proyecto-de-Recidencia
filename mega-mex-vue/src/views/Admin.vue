<template>
  <div class="admin-layout">

    <!-- ===================================== -->
    <!-- SIDEBAR / BARRA SUPERIOR EN CELULAR -->
    <!-- ===================================== -->

    <aside class="admin-sidebar">

      <!-- ENCABEZADO -->
      <div class="admin-logo-area">

        <div class="admin-logo-icono">
          🛒
        </div>

        <div class="admin-logo-texto">
          <h2>Mega-Mex</h2>
          <p>Administración</p>
        </div>


        <!-- ACCIONES SOLO EN CELULAR -->
        <div class="admin-mobile-actions">

          <!-- CERRAR SESIÓN -->
          <button
            type="button"
            class="admin-btn-salir-movil"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            @click="salir"
          >
            🚪
          </button>


          <!-- ABRIR MENÚ -->
          <button
            type="button"
            class="admin-menu-toggle"
            :aria-expanded="menuAbierto"
            aria-label="Abrir menú administrativo"
            @click="menuAbierto = !menuAbierto"
          >
            {{ menuAbierto ? '✕' : '☰' }}
          </button>

        </div>

      </div>


      <!-- =================================== -->
      <!-- MENÚ -->
      <!-- =================================== -->

      <nav
        class="admin-menu"
        :class="{ abierto: menuAbierto }"
      >

        <!-- INICIO -->
        <RouterLink
          to="/admin"
          class="admin-menu-item"
          exact-active-class="activo"
          @click="cerrarMenu"
        >
          <span>🏠</span>
          Inicio
        </RouterLink>


        <!-- VOLANTES -->
        <RouterLink
          to="/admin/flyers"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span>🎨</span>
          Volantes
        </RouterLink>


        <!-- PROMOCIONES -->
        <RouterLink
          to="/admin/promociones"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span>⭐</span>
          Promociones
        </RouterLink>


        <!-- PRODUCTOS -->
        <RouterLink
          to="/admin/productos"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span>🛒</span>
          Productos
        </RouterLink>


        <!-- SUCURSALES -->
        <RouterLink
          to="/admin/sucursales"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span>🏪</span>
          Sucursales
        </RouterLink>


        <!-- REDES -->
        <RouterLink
          to="/admin/redes"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span>📱</span>
          Redes
        </RouterLink>

      </nav>


      <!-- =================================== -->
      <!-- CERRAR SESIÓN EN COMPUTADORA -->
      <!-- =================================== -->

      <button
        type="button"
        class="admin-btn-cerrar"
        @click="salir"
      >
        <span>🚪</span>

        <span>
          Cerrar sesión
        </span>
      </button>

    </aside>


    <!-- ===================================== -->
    <!-- CONTENIDO -->
    <!-- ===================================== -->

    <main class="admin-contenido">

      <!-- =================================== -->
      <!-- HEADER -->
      <!-- =================================== -->

      <header class="admin-header">

        <div class="admin-header-texto">

          <p class="admin-subtitulo">
            Panel de administración
          </p>

          <h1>
            Bienvenido,
            {{ usuario?.nombre || 'Administrador Mega-Mex' }}
          </h1>

        </div>


        <!-- PERFIL -->
        <div class="admin-perfil">

          <div class="admin-avatar">
            👨‍💼
          </div>


          <div class="admin-datos-perfil">

            <strong>
              Administrador
            </strong>

            <span>
              {{ usuario?.correo || 'admin@megamex.com' }}
            </span>

          </div>


          <!-- CERRAR SESIÓN -->
          <button
            type="button"
            class="admin-header-salir"
            title="Cerrar sesión"
            @click="salir"
          >
            <span>
              🚪
            </span>

            <span class="admin-header-salir-texto">
              Salir
            </span>
          </button>

        </div>

      </header>


      <!-- =================================== -->
      <!-- PANTALLA PRINCIPAL -->
      <!-- =================================== -->

      <div v-if="esInicioAdmin">

        <!-- BIENVENIDA -->
        <section class="admin-bienvenida">

          <div class="admin-bienvenida-texto">

            <span class="admin-etiqueta">
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


          <div class="admin-bienvenida-icono">
            ⚙️
          </div>

        </section>


        <!-- ================================= -->
        <!-- TARJETAS -->
        <!-- ================================= -->

        <section class="admin-tarjetas">

          <!-- VOLANTES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/flyers')"
          >

            <div class="admin-tarjeta-icono azul">
              🎨
            </div>

            <div class="admin-tarjeta-info">

              <span class="admin-estado">
                Marketing
              </span>

              <h3>
                Volantes
              </h3>

              <p>
                Agrega, edita o elimina folletos
                publicitarios de productos.
              </p>

            </div>

            <div class="admin-flecha">
              →
            </div>

          </article>


          <!-- PROMOCIONES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/promociones')"
          >

            <div class="admin-tarjeta-icono amarillo">
              ⭐
            </div>

            <div class="admin-tarjeta-info">

              <span class="admin-estado">
                Marketing
              </span>

              <h3>
                Promociones
              </h3>

              <p>
                Administra las promociones que
                se mostrarán en el sitio.
              </p>

            </div>

            <div class="admin-flecha">
              →
            </div>

          </article>


          <!-- PRODUCTOS -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/productos')"
          >

            <div class="admin-tarjeta-icono verde">
              🛒
            </div>

            <div class="admin-tarjeta-info">

              <span class="admin-estado">
                Catálogo
              </span>

              <h3>
                Productos
              </h3>

              <p>
                Administra los productos mostrados
                a los clientes.
              </p>

            </div>

            <div class="admin-flecha">
              →
            </div>

          </article>


          <!-- SUCURSALES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/sucursales')"
          >

            <div class="admin-tarjeta-icono morado">
              🏪
            </div>

            <div class="admin-tarjeta-info">

              <span class="admin-estado">
                Empresa
              </span>

              <h3>
                Sucursales
              </h3>

              <p>
                Administra la información de las
                sucursales Mega-Mex.
              </p>

            </div>

            <div class="admin-flecha">
              →
            </div>

          </article>


          <!-- REDES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/redes')"
          >

            <div class="admin-tarjeta-icono rosa">
              📱
            </div>

            <div class="admin-tarjeta-info">

              <span class="admin-estado">
                Comunicación
              </span>

              <h3>
                Redes sociales
              </h3>

              <p>
                Administra los enlaces de las
                redes sociales.
              </p>

            </div>

            <div class="admin-flecha">
              →
            </div>

          </article>

        </section>

      </div>


      <!-- =================================== -->
      <!-- AQUÍ CARGAN LAS VISTAS HIJAS -->
      <!-- =================================== -->

      <RouterView />

    </main>

  </div>
</template>


<script setup>

import {
  computed,
  ref
} from 'vue'


import {
  useRoute,
  useRouter
} from 'vue-router'


import {
  obtenerUsuario,
  cerrarSesion
} from '../utils/auth'


// ============================================
// ROUTER
// ============================================

const router = useRouter()

const route = useRoute()


// ============================================
// MENÚ CELULAR
// ============================================

const menuAbierto = ref(false)


// ============================================
// USUARIO ACTUAL
// ============================================

const usuario = obtenerUsuario()


// ============================================
// SABER SI ESTAMOS EN /admin
// ============================================

const esInicioAdmin = computed(() => {

  return route.name === 'admin'

})


// ============================================
// CERRAR MENÚ MÓVIL
// ============================================

const cerrarMenu = () => {

  menuAbierto.value = false

}


// ============================================
// NAVEGAR
// ============================================

const irA = (ruta) => {

  cerrarMenu()

  router.push(ruta)

}


// ============================================
// CERRAR SESIÓN
// ============================================

const salir = () => {

  const confirmar = window.confirm(
    '¿Deseas cerrar tu sesión de administrador?'
  )


  if (!confirmar) {

    return

  }


  cerrarMenu()


  cerrarSesion()


  router.replace('/login')

}

</script>


<style scoped>

/* ========================================== */
/* GENERAL */
/* ========================================== */

* {

  box-sizing: border-box;

}


.admin-layout {

  width: 100%;

  min-width: 0;

  min-height: 100dvh;

  display: flex;

  background:
    #f4f7fb;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


/* ========================================== */
/* SIDEBAR */
/* ========================================== */

.admin-sidebar {

  width: 270px;

  min-height: 100dvh;

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

  z-index: 1000;

}


/* ========================================== */
/* LOGO */
/* ========================================== */

.admin-logo-area {

  display: flex;

  align-items: center;

  gap: 13px;

  padding:
    5px 8px 25px;

  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.15);

}


.admin-logo-icono {

  width: 52px;

  height: 52px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 16px;

  background:
    rgba(255, 255, 255, 0.15);

  font-size: 27px;

}


.admin-logo-texto {

  min-width: 0;

}


.admin-logo-texto h2 {

  margin: 0;

  font-size: 22px;

  color: white;

}


.admin-logo-texto p {

  margin:
    4px 0 0;

  font-size: 12px;

  opacity: 0.75;

}


/* ========================================== */
/* ACCIONES CELULAR */
/* ========================================== */

.admin-mobile-actions {

  display: none;

  margin-left: auto;

  align-items: center;

  gap: 8px;

}


.admin-menu-toggle,
.admin-btn-salir-movil {

  width: 44px;

  height: 44px;

  border:
    1px solid
    rgba(255, 255, 255, 0.18);

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  background:
    rgba(255, 255, 255, 0.12);

  cursor: pointer;

  font-size: 20px;

  transition:
    0.25s;

}


.admin-btn-salir-movil {

  background:
    rgba(255, 100, 100, 0.16);

}


.admin-menu-toggle:hover,
.admin-btn-salir-movil:hover {

  background:
    rgba(255, 255, 255, 0.22);

}


/* ========================================== */
/* MENÚ */
/* ========================================== */

.admin-menu {

  margin-top: 30px;

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.admin-menu-item {

  width: 100%;

  padding:
    13px 15px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  gap: 13px;

  background:
    transparent;

  color:
    rgba(255, 255, 255, 0.88);

  text-decoration: none;

  cursor: pointer;

  font-size: 14px;

  font-weight: 600;

  transition:
    0.25s;

}


.admin-menu-item > span {

  width: 25px;

  text-align: center;

  font-size: 20px;

}


.admin-menu-item:hover {

  background:
    rgba(255, 255, 255, 0.13);

  color: white;

  transform:
    translateX(4px);

}


.admin-menu-item.activo {

  background:
    rgba(255, 255, 255, 0.18);

  color: white;

  font-weight: 800;

}


/* ========================================== */
/* CERRAR SESIÓN SIDEBAR */
/* ========================================== */

.admin-btn-cerrar {

  width: 100%;

  margin-top: auto;

  padding:
    14px 15px;

  border:
    1px solid
    rgba(255, 255, 255, 0.20);

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  background:
    rgba(255, 255, 255, 0.10);

  color: white;

  cursor: pointer;

  font-family: inherit;

  font-size: 13px;

  font-weight: bold;

  transition:
    0.3s;

}


.admin-btn-cerrar:hover {

  background:
    #dc4141;

  border-color:
    #dc4141;

  color: white;

  transform:
    translateY(-2px);

}


/* ========================================== */
/* CONTENIDO */
/* ========================================== */

.admin-contenido {

  width:
    calc(100% - 270px);

  min-width: 0;

  min-height: 100dvh;

  margin-left: 270px;

  padding: 35px;

}


/* ========================================== */
/* HEADER */
/* ========================================== */

.admin-header {

  width: 100%;

  padding:
    23px 28px;

  display: flex;

  justify-content:
    space-between;

  align-items: center;

  gap: 20px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 6px 25px
    rgba(0, 0, 0, 0.06);

}


.admin-header-texto {

  min-width: 0;

}


.admin-subtitulo {

  margin: 0;

  color:
    #89919d;

  font-size: 13px;

}


.admin-header h1 {

  margin:
    5px 0 0;

  color:
    #1f2937;

  font-size:
    clamp(
      21px,
      3vw,
      27px
    );

  overflow-wrap:
    anywhere;

}


/* ========================================== */
/* PERFIL */
/* ========================================== */

.admin-perfil {

  display: flex;

  align-items: center;

  gap: 12px;

  flex-shrink: 0;

}


.admin-avatar {

  width: 50px;

  height: 50px;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    #eaf5ff;

  border-radius: 15px;

  font-size: 26px;

}


.admin-datos-perfil {

  display: flex;

  flex-direction: column;

}


.admin-datos-perfil strong {

  color:
    #29313d;

  font-size: 13px;

}


.admin-datos-perfil span {

  margin-top: 4px;

  color:
    #8a929c;

  font-size: 11px;

  overflow-wrap:
    anywhere;

}


/* ========================================== */
/* BOTÓN SALIR HEADER */
/* ========================================== */

.admin-header-salir {

  min-height: 44px;

  padding:
    10px 13px;

  border:
    1px solid
    #ffd0d0;

  border-radius: 11px;

  display: flex;

  align-items: center;

  gap: 7px;

  background:
    #fff5f5;

  color:
    #d43b3b;

  cursor: pointer;

  font-family: inherit;

  font-size: 12px;

  font-weight: 800;

  transition:
    0.25s;

}


.admin-header-salir:hover {

  background:
    #dc4141;

  border-color:
    #dc4141;

  color: white;

  transform:
    translateY(-2px);

}


/* ========================================== */
/* BIENVENIDA */
/* ========================================== */

.admin-bienvenida {

  margin-top: 30px;

  padding:
    35px 40px;

  display: flex;

  justify-content:
    space-between;

  align-items: center;

  gap: 25px;

  overflow: hidden;

  border-radius: 25px;

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


.admin-bienvenida-texto {

  max-width: 600px;

}


.admin-etiqueta {

  display:
    inline-block;

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


.admin-bienvenida h2 {

  margin:
    18px 0 10px;

  font-size:
    clamp(
      26px,
      4vw,
      31px
    );

}


.admin-bienvenida p {

  margin: 0;

  line-height:
    1.6;

  opacity:
    0.88;

}


.admin-bienvenida-icono {

  flex-shrink: 0;

  font-size:
    90px;

  opacity:
    0.8;

  animation:
    admin-girar
    8s linear
    infinite;

}


@keyframes admin-girar {

  from {

    transform:
      rotate(0deg);

  }

  to {

    transform:
      rotate(360deg);

  }

}


/* ========================================== */
/* TARJETAS */
/* ========================================== */

.admin-tarjetas {

  margin-top:
    30px;

  display:
    grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    22px;

}


.admin-tarjeta {

  position:
    relative;

  min-width:
    0;

  min-height:
    245px;

  padding:
    27px;

  border:
    1px solid
    #edf1f5;

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
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.admin-tarjeta:hover {

  transform:
    translateY(-7px);

  border-color:
    rgba(0, 107, 197, 0.18);

  box-shadow:
    0 17px 35px
    rgba(0, 0, 0, 0.11);

}


/* ========================================== */
/* ICONOS */
/* ========================================== */

.admin-tarjeta-icono {

  width:
    62px;

  height:
    62px;

  display:
    flex;

  justify-content:
    center;

  align-items:
    center;

  border-radius:
    18px;

  font-size:
    31px;

}


.admin-tarjeta-icono.azul {

  background:
    #eaf5ff;

}


.admin-tarjeta-icono.amarillo {

  background:
    #fff8df;

}


.admin-tarjeta-icono.verde {

  background:
    #e9f9f0;

}


.admin-tarjeta-icono.morado {

  background:
    #f2eaff;

}


.admin-tarjeta-icono.rosa {

  background:
    #ffeaf1;

}


/* ========================================== */
/* INFORMACIÓN */
/* ========================================== */

.admin-tarjeta-info {

  margin-top:
    20px;

}


.admin-estado {

  color:
    #006bc5;

  font-size:
    10px;

  font-weight:
    bold;

  text-transform:
    uppercase;

}


.admin-tarjeta h3 {

  margin:
    8px 0;

  color:
    #202938;

  font-size:
    19px;

}


.admin-tarjeta p {

  margin:
    0;

  padding-right:
    20px;

  color:
    #777f8a;

  line-height:
    1.5;

  font-size:
    13px;

}


/* ========================================== */
/* FLECHA */
/* ========================================== */

.admin-flecha {

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


.admin-tarjeta:hover
.admin-flecha {

  transform:
    translateX(5px);

}


/* ========================================== */
/* TABLET */
/* ========================================== */

@media (max-width: 1100px) {

  .admin-contenido {

    padding:
      25px;

  }


  .admin-tarjetas {

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

  }


  .admin-datos-perfil {

    display:
      none;

  }

}


/* ========================================== */
/* CELULAR */
/* ========================================== */

@media (max-width: 750px) {

  .admin-layout {

    display:
      block;

  }


  /* ======================================== */
  /* BARRA SUPERIOR */
  /* ======================================== */

  .admin-sidebar {

    width:
      100%;

    min-height:
      auto;

    position:
      sticky;

    top:
      0;

    padding:
      12px 14px;

    box-shadow:
      0 6px 25px
      rgba(0, 40, 80, 0.18);

  }


  .admin-logo-area {

    width:
      100%;

    padding:
      0;

    border-bottom:
      none;

    gap:
      10px;

  }


  .admin-logo-icono {

    width:
      45px;

    height:
      45px;

    border-radius:
      13px;

    font-size:
      23px;

  }


  .admin-logo-texto h2 {

    font-size:
      18px;

  }


  .admin-logo-texto p {

    font-size:
      10px;

  }


  /* ======================================== */
  /* BOTONES CELULAR */
  /* ======================================== */

  .admin-mobile-actions {

    display:
      flex;

  }


  /* ======================================== */
  /* MENÚ DESPLEGABLE */
  /* ======================================== */

  .admin-menu {

    display:
      none;

    width:
      100%;

    margin-top:
      13px;

    padding-top:
      13px;

    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      8px;

    border-top:
      1px solid
      rgba(255, 255, 255, 0.15);

  }


  .admin-menu.abierto {

    display:
      grid;

    animation:
      admin-menu-entrada
      0.25s ease;

  }


  @keyframes admin-menu-entrada {

    from {

      opacity:
        0;

      transform:
        translateY(-8px);

    }


    to {

      opacity:
        1;

      transform:
        translateY(0);

    }

  }


  .admin-menu-item {

    min-height:
      48px;

    padding:
      11px 10px;

    justify-content:
      flex-start;

    font-size:
      12px;

  }


  .admin-menu-item > span {

    width:
      22px;

    font-size:
      17px;

  }


  /* OCULTAMOS CERRAR SESIÓN DEL SIDEBAR */

  .admin-btn-cerrar {

    display:
      none;

  }


  /* ======================================== */
  /* CONTENIDO */
  /* ======================================== */

  .admin-contenido {

    width:
      100%;

    margin-left:
      0;

    padding:
      18px 14px 35px;

  }


  /* ======================================== */
  /* HEADER */
  /* ======================================== */

  .admin-header {

    padding:
      18px;

    align-items:
      flex-start;

    border-radius:
      17px;

  }


  .admin-header h1 {

    font-size:
      20px;

  }


  .admin-perfil {

    gap:
      7px;

  }


  .admin-avatar {

    width:
      43px;

    height:
      43px;

    border-radius:
      12px;

    font-size:
      22px;

  }


  .admin-datos-perfil {

    display:
      none;

  }


  /* Ya existe el botón 🚪 arriba */

  .admin-header-salir {

    display:
      none;

  }


  /* ======================================== */
  /* BIENVENIDA */
  /* ======================================== */

  .admin-bienvenida {

    margin-top:
      18px;

    padding:
      27px 22px;

    border-radius:
      19px;

  }


  .admin-bienvenida h2 {

    font-size:
      25px;

  }


  .admin-bienvenida p {

    font-size:
      14px;

  }


  .admin-bienvenida-icono {

    display:
      none;

  }


  /* ======================================== */
  /* TARJETAS */
  /* ======================================== */

  .admin-tarjetas {

    margin-top:
      18px;

    grid-template-columns:
      1fr;

    gap:
      15px;

  }


  .admin-tarjeta {

    min-height:
      200px;

    padding:
      23px;

    border-radius:
      18px;

  }

}


/* ========================================== */
/* CELULAR PEQUEÑO */
/* ========================================== */

@media (max-width: 420px) {

  .admin-logo-texto p {

    display:
      none;

  }


  .admin-menu {

    grid-template-columns:
      1fr;

  }


  .admin-header {

    padding:
      16px;

  }


  .admin-header h1 {

    font-size:
      18px;

  }


  .admin-subtitulo {

    font-size:
      11px;

  }


  .admin-avatar {

    display:
      none;

  }


  .admin-bienvenida {

    padding:
      23px 18px;

  }


  .admin-bienvenida h2 {

    font-size:
      22px;

  }


  .admin-tarjeta {

    min-height:
      190px;

  }

}


/* ========================================== */
/* DISPOSITIVOS TÁCTILES */
/* ========================================== */

@media (hover: none) and (pointer: coarse) {

  .admin-menu-item,
  .admin-menu-toggle,
  .admin-btn-salir-movil,
  .admin-header-salir {

    min-height:
      44px;

  }


  .admin-tarjeta:hover {

    transform:
      none;

  }

}

</style>