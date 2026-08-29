import { createRouter, createWebHistory } from 'vue-router'

// ============================================
// VISTAS
// ============================================

import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'

import Inicio from '../views/Inicio.vue'
import Productos from '../views/Productos.vue'
import Promociones from '../views/Promociones.vue'
import Empresa from '../views/Empresa.vue'
import Marketing from '../views/Marketing.vue'
import Contacto from '../views/Contacto.vue'
import Redes from '../views/Redes.vue'
import Admin from '../views/Admin.vue'


// ============================================
// AUTENTICACIÓN
// ============================================

import {
  obtenerUsuario,
  cerrarSesion
} from '../utils/auth'


// ============================================
// CREAR ROUTER
// ============================================

const router = createRouter({

  history: createWebHistory(),

  routes: [

    // ========================================
    // ENTRADA PRINCIPAL
    // ========================================

    {
      path: '/',
      redirect: '/login'
    },


    // ========================================
    // LOGIN
    // ========================================

    {
      path: '/login',
      name: 'login',
      component: Login,

      meta: {
        ocultarNavegacion: true
      }
    },


    // ========================================
    // REGISTRO DE USUARIOS
    // ========================================

    {
      path: '/registro',
      name: 'registro',
      component: Registro,

      meta: {
        ocultarNavegacion: true
      }
    },


    // ========================================
    // CLIENTE
    // ========================================

    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/productos',
      name: 'productos',
      component: Productos,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/promociones',
      name: 'promociones',
      component: Promociones,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/empresa',
      name: 'empresa',
      component: Empresa,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/marketing',
      name: 'marketing',
      component: Marketing,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    {
      path: '/redes',
      name: 'redes',
      component: Redes,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // ========================================
    // ADMINISTRADOR
    // ========================================

    {
      path: '/admin',
      name: 'admin',
      component: Admin,

      meta: {
        requiereLogin: true,
        rol: 'admin',
        ocultarNavegacion: true
      }
    },


    // ========================================
    // RUTA NO ENCONTRADA
    // ========================================

    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }

  ]

})


// ============================================
// PROTECCIÓN DE RUTAS
// ============================================

router.beforeEach((to) => {

  // ==========================================
  // LOGIN
  // ==========================================

  if (to.path === '/login') {

    cerrarSesion()

    return true

  }


  // ==========================================
  // REGISTRO
  // ==========================================

  // El registro es público.
  // No necesita que el usuario haya iniciado sesión.

  if (to.path === '/registro') {

    return true

  }


  // ==========================================
  // OBTENER USUARIO
  // ==========================================

  const usuario =
    obtenerUsuario()


  // ==========================================
  // RUTA PROTEGIDA SIN LOGIN
  // ==========================================

  if (
    to.meta.requiereLogin &&
    !usuario
  ) {

    return '/login'

  }


  // ==========================================
  // ADMINISTRADOR
  // ==========================================

  if (
    to.meta.rol === 'admin'
  ) {

    if (!usuario) {

      return '/login'

    }


    if (
      usuario.rol !== 'admin'
    ) {

      return '/inicio'

    }

  }


  // ==========================================
  // CLIENTE
  // ==========================================

  if (
    to.meta.rol === 'cliente'
  ) {

    if (!usuario) {

      return '/login'

    }


    // Si un administrador intenta entrar
    // a las páginas del cliente
    if (
      usuario.rol === 'admin'
    ) {

      return '/admin'

    }


    if (
      usuario.rol !== 'cliente'
    ) {

      return '/login'

    }

  }


  // ==========================================
  // PERMITIR NAVEGACIÓN
  // ==========================================

  return true

})


export default router