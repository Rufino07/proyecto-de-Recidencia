<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  cerrarSesion
} from '../utils/auth'


const router = useRouter()

const menuAbierto = ref(false)


// ============================================
// CERRAR MENÚ MÓVIL
// ============================================

const cerrarMenu = () => {
  menuAbierto.value = false
}


// ============================================
// CERRAR SESIÓN
// ============================================

const salir = () => {

  const confirmar = window.confirm(
    '¿Deseas cerrar tu sesión?'
  )

  if (!confirmar) {
    return
  }

  cerrarMenu()

  cerrarSesion()

  router.replace('/login')
}
</script>


<template>

  <header class="header">

    <div class="navbar">

      <!-- =================================== -->
      <!-- LOGO -->
      <!-- =================================== -->

      <RouterLink
        to="/inicio"
        class="logo"
        @click="cerrarMenu"
      >

        <img
          src="/logo-mega-mex.png"
          alt="Logo Mega-Mex"
        >

        <div class="nombre-empresa">

          <strong>
            MEGA-MEX
          </strong>

          <span>
            Abarrotes
          </span>

        </div>

      </RouterLink>


      <!-- =================================== -->
      <!-- BOTÓN MENÚ CELULAR -->
      <!-- =================================== -->

      <button
        type="button"
        class="menu-movil"
        aria-label="Abrir menú"
        @click="menuAbierto = !menuAbierto"
      >
        {{ menuAbierto ? '✕' : '☰' }}
      </button>


      <!-- =================================== -->
      <!-- MENÚ -->
      <!-- =================================== -->

      <nav :class="{ activo: menuAbierto }">

        <!-- INICIO -->

        <RouterLink
          to="/inicio"
          class="nav-link"
          exact-active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            🏠
          </span>

          <span>
            Inicio
          </span>
        </RouterLink>


        <!-- PRODUCTOS -->

        <RouterLink
          to="/productos"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            🛒
          </span>

          <span>
            Productos
          </span>
        </RouterLink>


        <!-- PROMOCIONES -->

        <RouterLink
          to="/promociones"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            ⭐
          </span>

          <span>
            Promociones
          </span>
        </RouterLink>


        <!-- NOSOTROS -->

        <RouterLink
          to="/empresa"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            🏪
          </span>

          <span>
            Nosotros
          </span>
        </RouterLink>


        <!-- MARKETING -->

        <RouterLink
          to="/marketing"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            🎨
          </span>

          <span>
            Marketing
          </span>
        </RouterLink>


        <!-- CONTACTO -->

        <RouterLink
          to="/contacto"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            📞
          </span>

          <span>
            Contacto
          </span>
        </RouterLink>


        <!-- REDES -->

        <RouterLink
          to="/redes"
          class="nav-link"
          active-class="seleccionado"
          @click="cerrarMenu"
        >
          <span class="nav-icono">
            📱
          </span>

          <span>
            Redes
          </span>
        </RouterLink>


        <!-- ================================= -->
        <!-- CERRAR SESIÓN -->
        <!-- ================================= -->

        <button
          type="button"
          class="btn-salir"
          @click="salir"
        >

          <span class="icono-salir">
            🚪
          </span>

          <span class="texto-salir">
            Cerrar sesión
          </span>

        </button>

      </nav>

    </div>

  </header>

</template>


<style scoped>

/* ========================================== */
/* HEADER */
/* ========================================== */

.header {

  position: sticky;

  top: 0;

  z-index: 1000;

  width: 100%;

  background:
    rgba(255, 255, 255, 0.96);

  backdrop-filter:
    blur(15px);

  border-bottom:
    1px solid #e5edf5;

  box-shadow:
    0 5px 25px
    rgba(0, 50, 100, 0.06);

}


/* ========================================== */
/* NAVBAR */
/* ========================================== */

.navbar {

  width:
    min(
      1500px,
      94%
    );

  min-height: 90px;

  margin: auto;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 25px;

}


/* ========================================== */
/* LOGO */
/* ========================================== */

.logo {

  display: flex;

  align-items: center;

  gap: 13px;

  text-decoration: none;

  flex-shrink: 0;

}


.logo img {

  width: 63px;

  height: 63px;

  object-fit: contain;

  transition:
    transform
    0.3s ease;

}


.logo:hover img {

  transform:
    scale(1.08)
    rotate(-2deg);

}


/* ========================================== */
/* NOMBRE EMPRESA */
/* ========================================== */

.nombre-empresa {

  display: flex;

  flex-direction: column;

}


.nombre-empresa strong {

  color: #006bc5;

  font-size: 24px;

  font-weight: 800;

  letter-spacing: 1px;

}


.nombre-empresa span {

  margin-top: 3px;

  color: #758195;

  font-size: 13px;

}


/* ========================================== */
/* MENÚ */
/* ========================================== */

nav {

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 4px;

}


/* ========================================== */
/* ENLACES */
/* ========================================== */

.nav-link {

  position: relative;

  padding:
    11px 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  border-radius: 11px;

  color: #364152;

  text-decoration: none;

  font-size: 13px;

  font-weight: 700;

  white-space: nowrap;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

}


/* ========================================== */
/* ICONOS */
/* ========================================== */

.nav-icono {

  max-width: 0;

  overflow: hidden;

  opacity: 0;

  transform:
    translateX(8px);

  font-size: 15px;

  transition:
    max-width 0.3s ease,
    opacity 0.25s ease,
    transform 0.3s ease;

}


/* MOSTRAR ICONO AL PASAR */

.nav-link:hover .nav-icono,
.nav-link.seleccionado .nav-icono {

  max-width: 30px;

  opacity: 1;

  transform:
    translateX(0);

}


/* ========================================== */
/* HOVER */
/* ========================================== */

.nav-link:hover {

  color: #006bc5;

  background: #edf7ff;

  transform:
    translateY(-2px);

}


/* ========================================== */
/* SECCIÓN ACTIVA */
/* ========================================== */

.nav-link.seleccionado {

  color: white;

  background:
    linear-gradient(
      135deg,
      #006bc5,
      #129ce1
    );

  box-shadow:
    0 7px 17px
    rgba(0, 107, 197, 0.23);

}


/* ========================================== */
/* BOTÓN CERRAR SESIÓN */
/* ========================================== */

.btn-salir {

  width: 45px;

  height: 45px;

  margin-left: 7px;

  padding:
    0 12px;

  overflow: hidden;

  display: flex;

  align-items: center;

  justify-content: flex-start;

  gap: 8px;

  border:
    1px solid #ffd0d0;

  border-radius: 12px;

  background: #fff5f5;

  color: #d43b3b;

  cursor: pointer;

  white-space: nowrap;

  font-family: inherit;

  font-weight: 700;

  transition:
    width 0.35s ease,
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

}


/* ICONO */

.icono-salir {

  width: 20px;

  min-width: 20px;

  display: flex;

  justify-content: center;

  font-size: 17px;

}


/* TEXTO OCULTO */

.texto-salir {

  opacity: 0;

  transform:
    translateX(-5px);

  transition:
    opacity 0.25s ease,
    transform 0.3s ease;

}


/* MOSTRAR BOTÓN COMPLETO */

.btn-salir:hover {

  width: 145px;

  background: #dc4141;

  border-color: #dc4141;

  color: white;

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px
    rgba(220, 65, 65, 0.22);

}


.btn-salir:hover .texto-salir {

  opacity: 1;

  transform:
    translateX(0);

}


/* ========================================== */
/* MENÚ MÓVIL */
/* ========================================== */

.menu-movil {

  display: none;

  width: 45px;

  height: 45px;

  border: none;

  border-radius: 12px;

  background: #edf7ff;

  color: #006bc5;

  cursor: pointer;

  font-size: 23px;

  transition: 0.25s;

}


.menu-movil:hover {

  background: #006bc5;

  color: white;

}


/* ========================================== */
/* PANTALLAS MEDIANAS */
/* ========================================== */

@media (max-width: 1250px) {

  .nombre-empresa strong {

    font-size: 20px;

  }


  .logo img {

    width: 55px;

    height: 55px;

  }


  .nav-link {

    padding:
      10px 8px;

    font-size: 12px;

  }

}


/* ========================================== */
/* TABLET Y CELULAR */
/* ========================================== */

@media (max-width: 1000px) {

  .navbar {

    position: relative;

    min-height: 75px;

  }


  .menu-movil {

    display: flex;

    align-items: center;

    justify-content: center;

  }


  nav {

    position: absolute;

    top: calc(100% + 10px);

    left: 0;

    right: 0;

    padding: 15px;

    display: none;

    flex-direction: column;

    align-items: stretch;

    gap: 6px;

    background: white;

    border:
      1px solid #e5edf5;

    border-radius: 18px;

    box-shadow:
      0 15px 40px
      rgba(0, 40, 80, 0.15);

  }


  nav.activo {

    display: flex;

    animation:
      mostrarMenu
      0.25s ease;

  }


  @keyframes mostrarMenu {

    from {

      opacity: 0;

      transform:
        translateY(-10px);

    }


    to {

      opacity: 1;

      transform:
        translateY(0);

    }

  }


  .nav-link {

    width: 100%;

    padding:
      13px 15px;

    justify-content: flex-start;

  }


  .nav-icono {

    max-width: 30px;

    opacity: 1;

    transform: none;

  }


  .btn-salir {

    width: 100%;

    height: 48px;

    margin:
      8px 0 0;

    justify-content: center;

  }


  .texto-salir {

    opacity: 1;

    transform: none;

  }


  .btn-salir:hover {

    width: 100%;

  }

}


/* ========================================== */
/* CELULAR */
/* ========================================== */

@media (max-width: 550px) {

  .navbar {

    width: 92%;

  }


  .logo img {

    width: 48px;

    height: 48px;

  }


  .nombre-empresa strong {

    font-size: 18px;

  }


  .nombre-empresa span {

    font-size: 11px;

  }

}

</style>