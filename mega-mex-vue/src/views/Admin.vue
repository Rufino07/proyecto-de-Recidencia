<template>
  <div class="admin-layout">

    <!-- ===================================== -->
    <!-- SIDEBAR / BARRA SUPERIOR EN CELULAR -->
    <!-- ===================================== -->
    <aside class="admin-sidebar">

      <!-- ENCABEZADO -->
      <div class="admin-logo-area">
        <div class="admin-logo-icono">
          <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>

        <div class="admin-logo-texto">
          <h2>Mega-Mex</h2>
          <div class="admin-logo-subtitulo">
            <span class="admin-online-indicator"></span>
            <p>Administración</p>
          </div>
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
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>

          <!-- ABRIR MENÚ -->
          <button
            type="button"
            class="admin-menu-toggle"
            :aria-expanded="menuAbierto"
            aria-label="Abrir menú administrativo"
            @click="menuAbierto = !menuAbierto"
          >
            <svg v-if="!menuAbierto" class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <svg v-else class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <!-- =================================== -->
      <!-- MENÚ DE NAVEGACIÓN -->
      <!-- =================================== -->
      <nav
        class="admin-menu"
        :class="{ abierto: menuAbierto }"
      >
        <div class="admin-nav-seccion-titulo">Módulos</div>

        <!-- INICIO -->
        <RouterLink
          to="/admin"
          class="admin-menu-item"
          exact-active-class="activo"
          @click="cerrarMenu"
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span class="admin-item-nombre">Inicio</span>
        </RouterLink>

        <!-- VOLANTES -->
        <RouterLink
          to="/admin/flyers"l
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu" g
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
          </span>
          <span class="admin-item-nombre">Volantes</span>
        </RouterLink>

        <!-- PROMOCIONES -->
        <RouterLink
          to="/admin/promociones"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
          <span class="admin-item-nombre">Promociones</span>
        </RouterLink>

        <!-- PRODUCTOS -->
        <RouterLink
          to="/admin/productos"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m7.5 4.27 9 5.15" />
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </span>
          <span class="admin-item-nombre">Productos</span>
        </RouterLink>

        <!-- SUCURSALES -->
        <RouterLink
          to="/admin/sucursales"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5H9L2 8Z" />
              <path d="M18 12h-4v8h4Z" />
              <path d="M6 12h4v8H6Z" />
            </svg>
          </span>
          <span class="admin-item-nombre">Sucursales</span>
        </RouterLink>

        <!-- REDES -->
        <RouterLink
          to="/admin/redes"
          class="admin-menu-item"
          active-class="activo"
          @click="cerrarMenu"
        >
          <span class="admin-item-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </span>
          <span class="admin-item-nombre">Redes</span>
        </RouterLink>
      </nav>

      <!-- =================================== -->
      <!-- CERRAR SESIÓN EN COMPUTADORA -->
      <!-- =================================== -->
      <div class="admin-sidebar-footer">
        <button
          type="button"
          class="admin-btn-cerrar"
          @click="salir"
        >
          <span class="admin-btn-cerrar-icono">
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span>Cerrar sesión</span>
        </button>
      </div>

    </aside>

    <!-- ===================================== -->
    <!-- CONTENIDO PRINCIPAL -->
    <!-- ===================================== -->
    <main class="admin-contenido">

      <!-- =================================== -->
      <!-- HEADER -->
      <!-- =================================== -->
      <header class="admin-header">
        <div class="admin-header-texto">
          <div class="admin-header-badge">
            <span class="admin-header-badge-dot"></span>
            <p class="admin-subtitulo">
              Panel de administración
            </p>
          </div>

          <h1>
            Bienvenido,
            <span class="admin-usuario-destacado">{{ usuario?.nombre || 'Administrador Mega-Mex' }}</span>
          </h1>
        </div>

        <!-- PERFIL -->
        <div class="admin-perfil">
          <div class="admin-avatar-contenedor">
            <div class="admin-avatar">
              <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span class="admin-avatar-status" title="En línea"></span>
          </div>

          <div class="admin-datos-perfil">
            <strong>Administrador</strong>
            <span>{{ usuario?.correo || 'admin@megamex.com' }}</span>
          </div>

          <!-- CERRAR SESIÓN EN HEADER -->
          <button
            type="button"
            class="admin-header-salir"
            title="Cerrar sesión"
            @click="salir"
          >
            <svg class="admin-icono-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span class="admin-header-salir-texto">Salir</span>
          </button>
        </div>
      </header>

      <!-- =================================== -->
      <!-- PANTALLA PRINCIPAL (/admin) -->
      <!-- =================================== -->
      <div v-if="esInicioAdmin" class="admin-dashboard-home">

        <!-- BIENVENIDA -->
        <section class="admin-bienvenida">
          <div class="admin-bienvenida-texto">
            <div class="admin-etiqueta-fila">
              <span class="admin-etiqueta">PANEL ADMINISTRATIVO</span>
              <span class="admin-etiqueta-status">SISTEMA ACTIVO</span>
            </div>

            <h2>Administración Mega-Mex</h2>

            <p>
              Desde este panel podrás administrar el contenido
              que se mostrará a los usuarios del sitio.
            </p>
          </div>

          <div class="admin-bienvenida-icono" aria-hidden="true">
            <svg class="admin-gear-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </section>

        <!-- ================================= -->
        <!-- TARJETAS DE MÓDULOS -->
        <!-- ================================= -->
        <section class="admin-tarjetas">

          <!-- VOLANTES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/flyers')"
          >
            <div class="admin-tarjeta-top">
              <div class="admin-tarjeta-icono azul">
                <svg class="admin-tarjeta-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <span class="admin-estado estado-azul">Marketing</span>
            </div>

            <div class="admin-tarjeta-info">
              <h3>Volantes</h3>
              <p>
                Agrega, edita o elimina folletos publicitarios de productos.
              </p>
            </div>

            <div class="admin-tarjeta-action">
              <span class="admin-tarjeta-accion-texto">Gestionar</span>
              <div class="admin-flecha">
                <svg class="admin-flecha-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

          <!-- PROMOCIONES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/promociones')"
          >
            <div class="admin-tarjeta-top">
              <div class="admin-tarjeta-icono amarillo">
                <svg class="admin-tarjeta-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span class="admin-estado estado-amarillo">Marketing</span>
            </div>

            <div class="admin-tarjeta-info">
              <h3>Promociones</h3>
              <p>
                Administra las promociones que se mostrarán en el sitio.
              </p>
            </div>

            <div class="admin-tarjeta-action">
              <span class="admin-tarjeta-accion-texto">Gestionar</span>
              <div class="admin-flecha">
                <svg class="admin-flecha-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

          <!-- PRODUCTOS -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/productos')"
          >
            <div class="admin-tarjeta-top">
              <div class="admin-tarjeta-icono verde">
                <svg class="admin-tarjeta-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <span class="admin-estado estado-verde">Catálogo</span>
            </div>

            <div class="admin-tarjeta-info">
              <h3>Productos</h3>
              <p>
                Administra los productos mostrados a los clientes.
              </p>
            </div>

            <div class="admin-tarjeta-action">
              <span class="admin-tarjeta-accion-texto">Gestionar</span>
              <div class="admin-flecha">
                <svg class="admin-flecha-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

          <!-- SUCURSALES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/sucursales')"
          >
            <div class="admin-tarjeta-top">
              <div class="admin-tarjeta-icono morado">
                <svg class="admin-tarjeta-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5H9L2 8Z" />
                  <path d="M18 12h-4v8h4Z" />
                  <path d="M6 12h4v8H6Z" />
                </svg>
              </div>
              <span class="admin-estado estado-morado">Empresa</span>
            </div>

            <div class="admin-tarjeta-info">
              <h3>Sucursales</h3>
              <p>
                Administra la información de las sucursales Mega-Mex.
              </p>
            </div>

            <div class="admin-tarjeta-action">
              <span class="admin-tarjeta-accion-texto">Gestionar</span>
              <div class="admin-flecha">
                <svg class="admin-flecha-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

          <!-- REDES -->
          <article
            class="admin-tarjeta"
            @click="irA('/admin/redes')"
          >
            <div class="admin-tarjeta-top">
              <div class="admin-tarjeta-icono rosa">
                <svg class="admin-tarjeta-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <span class="admin-estado estado-rosa">Comunicación</span>
            </div>

            <div class="admin-tarjeta-info">
              <h3>Redes sociales</h3>
              <p>
                Administra los enlaces de las redes sociales.
              </p>
            </div>

            <div class="admin-tarjeta-action">
              <span class="admin-tarjeta-accion-texto">Gestionar</span>
              <div class="admin-flecha">
                <svg class="admin-flecha-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

        </section>

      </div>

      <!-- =================================== -->
      <!-- AQUÍ CARGAN LAS VISTAS HIJAS -->
      <!-- =================================== -->
      <div class="admin-router-view-container" :class="{ 'espacio-hija': !esInicioAdmin }">
        <RouterView />
      </div>

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
/* GENERAL Y RESET LOCAL */
/* ========================================== */
* {
  box-sizing: border-box;
}

.admin-layout {
  width: 100%;
  min-width: 0;
  min-height: 100dvh;
  display: flex;
  background-color: #f1f5f9;
  background-image:
    radial-gradient(at 0% 0%, rgba(2, 132, 199, 0.14) 0px, transparent 45%),
    radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 40%),
    radial-gradient(at 50% 100%, rgba(14, 165, 233, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.08) 0px, transparent 40%),
    radial-gradient(rgba(148, 163, 184, 0.22) 1.2px, transparent 1.2px);
  background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 28px 28px;
  background-attachment: fixed;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #0f172a;
}

/* ========================================== */
/* SIDEBAR PRINCIPAL */
/* ========================================== */
.admin-sidebar {
  width: 270px;
  min-height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  background: linear-gradient(180deg, #09172a 0%, #0d213f 50%, #0a2e5c 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 4px 0 25px rgba(9, 23, 42, 0.25);
  z-index: 1000;
}

/* ========================================== */
/* LOGO */
/* ========================================== */
.admin-logo-area {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 4px 8px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.admin-logo-icono {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.admin-icono-svg {
  width: 19px;
  height: 19px;
  display: block;
}

.admin-logo-icono .admin-icono-svg {
  width: 24px;
  height: 24px;
  color: #38bdf8;
}

.admin-logo-texto {
  min-width: 0;
}

.admin-logo-texto h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.admin-logo-subtitulo {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
}

.admin-online-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.admin-logo-texto p {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.3px;
  text-transform: uppercase;
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
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  cursor: pointer;
  font-size: 19px;
  transition: all 0.25s ease;
}

.admin-btn-salir-movil {
  background: rgba(239, 68, 68, 0.18);
  border-color: rgba(239, 68, 68, 0.3);
}

.admin-menu-toggle:hover,
.admin-btn-salir-movil:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.admin-btn-salir-movil:hover {
  background: rgba(239, 68, 68, 0.35);
}

/* ========================================== */
/* MENÚ DE NAVEGACIÓN */
/* ========================================== */
.admin-menu {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.admin-nav-seccion-titulo {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.45);
  padding: 0 12px 6px;
}

.admin-menu-item {
  width: 100%;
  padding: 11px 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.admin-item-icono {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: transform 0.2s ease;
}

.admin-item-nombre {
  flex: 1;
}

.admin-menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  transform: translateX(3px);
}

.admin-menu-item:hover .admin-item-icono {
  transform: scale(1.15);
}

.admin-menu-item.activo {
  background: linear-gradient(90deg, rgba(2, 132, 199, 0.25) 0%, rgba(2, 132, 199, 0.12) 100%);
  border-color: rgba(56, 189, 248, 0.35);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-menu-item.activo .admin-item-icono {
  transform: scale(1.1);
}

/* ========================================== */
/* CERRAR SESIÓN SIDEBAR */
/* ========================================== */
.admin-sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-btn-cerrar {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-btn-cerrar-icono {
  font-size: 16px;
  transition: transform 0.2s ease;
}

.admin-btn-cerrar:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.35);
  transform: translateY(-2px);
}

.admin-btn-cerrar:hover .admin-btn-cerrar-icono {
  transform: translateX(-2px);
}

/* ========================================== */
/* CONTENIDO PRINCIPAL */
/* ========================================== */
.admin-contenido {
  width: calc(100% - 270px);
  min-width: 0;
  min-height: 100dvh;
  margin-left: 270px;
  padding: 32px 36px 48px;
  display: flex;
  flex-direction: column;
}

/* ========================================== */
/* HEADER SUPERIOR */
/* ========================================== */
.admin-header {
  width: 100%;
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.7);
}

.admin-header-texto {
  min-width: 0;
}

.admin-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 4px;
}

.admin-header-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #0284c7;
}

.admin-subtitulo {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.admin-header h1 {
  margin: 2px 0 0;
  color: #0f172a;
  font-size: clamp(20px, 2.5vw, 25px);
  font-weight: 800;
  letter-spacing: -0.5px;
  overflow-wrap: anywhere;
}

.admin-usuario-destacado {
  color: #0284c7;
}

/* ========================================== */
/* PERFIL Y ACCIONES HEADER */
/* ========================================== */
.admin-perfil {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.admin-avatar-contenedor {
  position: relative;
}

.admin-avatar {
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border: 1px solid #7dd3fc;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.15);
}

.admin-avatar .admin-icono-svg {
  width: 22px;
  height: 22px;
  color: #0284c7;
}

.admin-avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background-color: #10b981;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.admin-datos-perfil {
  display: flex;
  flex-direction: column;
}

.admin-datos-perfil strong {
  color: #1e293b;
  font-size: 13px;
  font-weight: 700;
}

.admin-datos-perfil span {
  margin-top: 2px;
  color: #64748b;
  font-size: 11px;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.admin-header-salir {
  min-height: 40px;
  padding: 8px 14px;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-header-salir:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
}

/* ========================================== */
/* SECCIÓN DE BIENVENIDA / DASHBOARD HOME */
/* ========================================== */
.admin-dashboard-home {
  width: 100%;
}

.admin-bienvenida {
  margin-top: 26px;
  padding: 34px 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  color: #ffffff;
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 45%, #075985 100%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 16px 36px -6px rgba(2, 132, 199, 0.32);
}

.admin-bienvenida::after {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.admin-bienvenida-texto {
  max-width: 620px;
  z-index: 1;
}

.admin-etiqueta-fila {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-etiqueta {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.admin-etiqueta-status {
  font-size: 11px;
  font-weight: 700;
  color: #a7f3d0;
  letter-spacing: 0.5px;
}

.admin-bienvenida h2 {
  margin: 14px 0 8px;
  font-size: clamp(24px, 3.5vw, 29px);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.admin-bienvenida p {
  margin: 0;
  line-height: 1.6;
  font-size: 14px;
  opacity: 0.92;
}

.admin-bienvenida-icono {
  flex-shrink: 0;
  opacity: 0.9;
  animation: admin-girar 16s linear infinite;
  user-select: none;
  z-index: 1;
}

.admin-gear-svg {
  width: 72px;
  height: 72px;
  display: block;
  color: rgba(255, 255, 255, 0.88);
}

@keyframes admin-girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ========================================== */
/* TARJETAS DE MÓDULOS */
/* ========================================== */
.admin-tarjetas {
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.admin-tarjeta {
  position: relative;
  min-width: 0;
  padding: 24px;
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-tarjeta:hover {
  transform: translateY(-6px);
  background: #ffffff;
  border-color: rgba(2, 132, 199, 0.35);
  box-shadow: 0 20px 35px -8px rgba(2, 132, 199, 0.14), 0 4px 12px rgba(15, 23, 42, 0.04);
}

.admin-tarjeta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-tarjeta-icono {
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  transition: transform 0.3s ease;
}

.admin-tarjeta:hover .admin-tarjeta-icono {
  transform: scale(1.1);
}

.admin-tarjeta-svg {
  width: 26px;
  height: 26px;
  display: block;
}

.admin-tarjeta-icono.azul {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.admin-tarjeta-icono.azul .admin-tarjeta-svg {
  color: #2563eb;
}

.admin-tarjeta-icono.amarillo {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.admin-tarjeta-icono.amarillo .admin-tarjeta-svg {
  color: #d97706;
}

.admin-tarjeta-icono.verde {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.admin-tarjeta-icono.verde .admin-tarjeta-svg {
  color: #059669;
}

.admin-tarjeta-icono.morado {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
}

.admin-tarjeta-icono.morado .admin-tarjeta-svg {
  color: #7c3aed;
}

.admin-tarjeta-icono.rosa {
  background: #fdf2f8;
  border: 1px solid #fbcfe8;
}

.admin-tarjeta-icono.rosa .admin-tarjeta-svg {
  color: #db2777;
}

.admin-estado {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 4px 10px;
  border-radius: 20px;
}

.estado-azul {
  color: #1d4ed8;
  background: #eff6ff;
}

.estado-amarillo {
  color: #b45309;
  background: #fffbeb;
}

.estado-verde {
  color: #047857;
  background: #ecfdf5;
}

.estado-morado {
  color: #6d28d9;
  background: #f5f3ff;
}

.estado-rosa {
  color: #be185d;
  background: #fdf2f8;
}

.admin-tarjeta-info {
  margin-top: 18px;
  flex: 1;
}

.admin-tarjeta h3 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.admin-tarjeta p {
  margin: 0;
  color: #64748b;
  line-height: 1.5;
  font-size: 13px;
}

.admin-tarjeta-action {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-tarjeta-accion-texto {
  font-size: 12px;
  font-weight: 700;
  color: #0284c7;
}

.admin-flecha {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9ff;
  color: #0284c7;
  transition: all 0.25s ease;
}

.admin-flecha-svg {
  width: 14px;
  height: 14px;
  display: block;
}

.admin-tarjeta:hover .admin-flecha {
  background: #0284c7;
  color: #ffffff;
  transform: translateX(4px);
}

/* ========================================== */
/* CONTENEDOR DE VISTAS HIJAS */
/* ========================================== */
.admin-router-view-container.espacio-hija {
  margin-top: 24px;
  width: 100%;
}

/* ========================================== */
/* RESPONSIVE TABLET */
/* ========================================== */
@media (max-width: 1120px) {
  .admin-contenido {
    padding: 24px;
  }

  .admin-tarjetas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .admin-datos-perfil {
    display: none;
  }
}

/* ========================================== */
/* RESPONSIVE MÓVIL */
/* ========================================== */
@media (max-width: 768px) {
  .admin-layout {
    display: block;
  }

  .admin-sidebar {
    width: 100%;
    min-height: auto;
    position: sticky;
    top: 0;
    padding: 12px 16px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(9, 23, 42, 0.2);
  }

  .admin-logo-area {
    width: 100%;
    padding: 0;
    border-bottom: none;
    gap: 12px;
  }

  .admin-logo-icono {
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 12px;
  }

  .admin-logo-texto h2 {
    font-size: 18px;
  }

  .admin-logo-texto p {
    font-size: 10px;
  }

  .admin-mobile-actions {
    display: flex;
  }

  .admin-menu {
    display: none;
    width: 100%;
    margin-top: 14px;
    padding-top: 14px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .admin-menu.abierto {
    display: grid;
    animation: admin-menu-slide 0.25s ease-out;
  }

  @keyframes admin-menu-slide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .admin-nav-seccion-titulo {
    grid-column: span 2;
    padding: 0 6px 4px;
  }

  .admin-menu-item {
    min-height: 46px;
    padding: 10px 12px;
    font-size: 13px;
  }

  .admin-sidebar-footer {
    display: none;
  }

  .admin-contenido {
    width: 100%;
    margin-left: 0;
    padding: 18px 14px 40px;
  }

  .admin-header {
    padding: 16px 18px;
    border-radius: 16px;
  }

  .admin-header h1 {
    font-size: 19px;
  }

  .admin-perfil {
    gap: 8px;
  }

  .admin-avatar {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }

  .admin-datos-perfil {
    display: none;
  }

  .admin-header-salir {
    display: none;
  }

  .admin-bienvenida {
    margin-top: 16px;
    padding: 24px 20px;
    border-radius: 18px;
  }

  .admin-bienvenida h2 {
    font-size: 22px;
  }

  .admin-bienvenida p {
    font-size: 13px;
  }

  .admin-bienvenida-icono {
    display: none;
  }

  .admin-tarjetas {
    margin-top: 16px;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .admin-tarjeta {
    padding: 20px;
    border-radius: 16px;
  }
}

/* ========================================== */
/* CELULAR PEQUEÑO (< 440px) */
/* ========================================== */
@media (max-width: 440px) {
  .admin-menu {
    grid-template-columns: 1fr;
  }

  .admin-nav-seccion-titulo {
    grid-column: span 1;
  }

  .admin-header h1 {
    font-size: 17px;
  }

  .admin-avatar {
    display: none;
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
    min-height: 44px;
  }

  .admin-tarjeta:hover {
    transform: none;
  }
}
</style>