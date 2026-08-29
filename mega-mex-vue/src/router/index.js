import {
  createRouter,
  createWebHistory
} from 'vue-router'

// =====================================
// VISTAS DEL CLIENTE
// =====================================

import Inicio from '../views/Inicio.vue'
import Productos from '../views/Productos.vue'
import Promociones from '../views/Promociones.vue'
import Empresa from '../views/Empresa.vue'
import Marketing from '../views/Marketing.vue'
import Contacto from '../views/Contacto.vue'
import Redes from '../views/Redes.vue'

// =====================================
// LOGIN Y ADMIN
// =====================================

import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

// =====================================
// AUTENTICACIÓN
// =====================================

import {
  obtenerUsuario,
  cerrarSesion
} from '../utils/auth'


const router = createRouter({

  history: createWebHistory(),

  routes: [

    // =================================
    // ENTRADA PRINCIPAL
    // SIEMPRE MANDA AL LOGIN
    // =================================

    {
      path: '/',
      redirect: '/login'
    },


    // =================================
    // LOGIN
    // =================================

    {
      path: '/login',

      name: 'login',

      component: Login,

      meta: {
        ocultarNavegacion: true
      }
    },


    // =================================
    // INICIO DEL CLIENTE
    // =================================

    {
      path: '/inicio',

      name: 'inicio',

      component: Inicio,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // PRODUCTOS
    // =================================

    {
      path: '/productos',

      name: 'productos',

      component: Productos,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // PROMOCIONES
    // =================================

    {
      path: '/promociones',

      name: 'promociones',

      component: Promociones,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // NOSOTROS
    // =================================

    {
      path: '/empresa',

      name: 'empresa',

      component: Empresa,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // MARKETING
    // =================================

    {
      path: '/marketing',

      name: 'marketing',

      component: Marketing,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // CONTACTO
    // =================================

    {
      path: '/contacto',

      name: 'contacto',

      component: Contacto,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // REDES
    // =================================

    {
      path: '/redes',

      name: 'redes',

      component: Redes,

      meta: {
        requiereLogin: true,
        rol: 'cliente'
      }
    },


    // =================================
    // ADMINISTRADOR
    // =================================

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


    // =================================
    // RUTA QUE NO EXISTE
    // =================================

    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }

  ]

})


// =====================================
// PROTECCIÓN DE RUTAS
// =====================================

router.beforeEach((to) => {

  // =================================
  // SI ENTRA AL LOGIN
  // CERRAMOS LA SESIÓN ANTERIOR
  // =================================

  if (to.path === '/login') {

    cerrarSesion()

    return true

  }


  const usuario = obtenerUsuario()


  // =================================
  // NO HAY SESIÓN
  // =================================

  if (
    to.meta.requiereLogin &&
    !usuario
  ) {

    return '/login'

  }


  // =================================
  // PROTEGER ADMIN
  // =================================

  if (
    to.meta.rol === 'admin'
  ) {

    if (
      !usuario ||
      usuario.rol !== 'admin'
    ) {

      return '/login'

    }

  }


  // =================================
  // PROTEGER CLIENTE
  // =================================

  if (
    to.meta.rol === 'cliente'
  ) {

    if (!usuario) {

      return '/login'

    }


    // UN ADMIN NO ENTRA COMO CLIENTE
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


  return true

})


export default router