import { createRouter, createWebHistory } from 'vue-router'

// ============================================
// VISTAS PRINCIPALES
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

// ============================================
// ADMINISTRADOR
// ============================================

import Admin from '../views/Admin.vue'

import AdminFlyers from '../views/admin/AdminFlyers.vue'
import AdminPromociones from '../views/admin/AdminPromociones.vue'
import AdminProductos from '../views/admin/AdminProductos.vue'
import AdminSucursales from '../views/admin/AdminSucursales.vue'
import AdminRedes from '../views/admin/AdminRedes.vue'

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
    // REGISTRO
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
      },

      children: [

        {
          path: 'flyers',
          name: 'admin-flyers',
          component: AdminFlyers
        },

        {
          path: 'promociones',
          name: 'admin-promociones',
          component: AdminPromociones
        },

        {
          path: 'productos',
          name: 'admin-productos',
          component: AdminProductos
        },

        {
          path: 'sucursales',
          name: 'admin-sucursales',
          component: AdminSucursales
        },

        {
          path: 'redes',
          name: 'admin-redes',
          component: AdminRedes
        }

      ]
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

  if (to.path === '/registro') {

    return true

  }

  // ==========================================
  // OBTENER USUARIO
  // ==========================================

  const usuario = obtenerUsuario()

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

  if (to.meta.rol === 'admin') {

    if (!usuario) {

      return '/login'

    }

    if (usuario.rol !== 'admin') {

      return '/inicio'

    }

  }

  // ==========================================
  // CLIENTE
  // ==========================================

  if (to.meta.rol === 'cliente') {

    if (!usuario) {

      return '/login'

    }

    if (usuario.rol === 'admin') {

      return '/admin'

    }

    if (usuario.rol !== 'cliente') {

      return '/login'

    }

  }

  return true

})

export default router