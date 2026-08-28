<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>

  <div class="app">

    <Navbar />

    <main>
      <RouterView />
    </main>

    <footer class="footer">

      <div class="footer-contenido">

        <div class="footer-logo">

          <img
            src="/logo-mega-mex.png"
            alt="Mega-Mex"
          />

          <div>
            <h3>MEGA-MEX</h3>
            <p>Abarrotes por mayoreo y menudeo</p>
          </div>

        </div>

        <div>
          <h4>Enlaces</h4>

          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/productos">Productos</RouterLink>
          <RouterLink to="/promociones">Promociones</RouterLink>
        </div>

        <div>
          <h4>Contacto</h4>

          <p>
            Heroica Ciudad de Tlaxiaco, Oaxaca
          </p>

          <p>
            Síguenos en nuestras redes sociales
          </p>
        </div>

      </div>

      <div class="copyright">
        © 2026 Mega-Mex
      </div>

    </footer>

  </div>

</template>