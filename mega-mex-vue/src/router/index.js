import { createRouter, createWebHistory } from 'vue-router'

import Inicio from '../views/Inicio.vue'
import Productos from '../views/Productos.vue'
import Promociones from '../views/Promociones.vue'
import Empresa from '../views/Empresa.vue'
import Marketing from '../views/Marketing.vue'
import Contacto from '../views/Contacto.vue'
import Redes from '../views/Redes.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/productos',
      name: 'productos',
      component: Productos
    },
    {
      path: '/promociones',
      name: 'promociones',
      component: Promociones
    },
    {
      path: '/empresa',
      name: 'empresa',
      component: Empresa
    },
    {
      path: '/marketing',
      name: 'marketing',
      component: Marketing
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    },
    {
      path: '/redes',
      name: 'redes',
      component: Redes
    }
  ]
})

export default router