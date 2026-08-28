<script setup>
import { ref } from 'vue'

const menuAbierto = ref(false)

const cerrarMenu = () => {
  menuAbierto.value = false
}
</script>

<template>
  <header class="header">

    <div class="navbar">

      <!-- LOGO -->
      <RouterLink
        to="/"
        class="logo"
        @click="cerrarMenu"
      >
        <img
          src="/logo-mega-mex.png"
          alt="Logo Mega-Mex"
        />

        <div class="nombre-empresa">
          <strong>MEGA-MEX</strong>
          <span>Abarrotes</span>
        </div>
      </RouterLink>


      <!-- BOTÓN CELULAR -->
      <button
        class="menu-movil"
        @click="menuAbierto = !menuAbierto"
      >
        ☰
      </button>


      <!-- MENÚ -->
      <nav :class="{ activo: menuAbierto }">

        <RouterLink
          to="/"
          @click="cerrarMenu"
        >
          Inicio
        </RouterLink>

        <RouterLink
          to="/productos"
          @click="cerrarMenu"
        >
          Productos
        </RouterLink>

        <RouterLink
          to="/promociones"
          @click="cerrarMenu"
        >
          Promociones
        </RouterLink>

        <RouterLink
          to="/empresa"
          @click="cerrarMenu"
        >
          Nosotros
        </RouterLink>

        <RouterLink
          to="/marketing"
          @click="cerrarMenu"
        >
          Marketing
        </RouterLink>

        <RouterLink
          to="/contacto"
          @click="cerrarMenu"
        >
          Contacto
        </RouterLink>

        <RouterLink
          to="/redes"
          @click="cerrarMenu"
        >
          Redes
        </RouterLink>

      </nav>

    </div>

  </header>
</template>