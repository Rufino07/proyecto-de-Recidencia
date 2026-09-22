<script setup>
import Navbar from './components/Navbar.vue'
</script>


<template>

  <div class="app">

    <!-- ===================================== -->
    <!-- NAVBAR SOLO PARA EL CLIENTE -->
    <!-- ===================================== -->

    <Navbar
      v-if="!$route.meta.ocultarNavegacion"
    />


    <!-- ===================================== -->
    <!-- CONTENIDO DE LAS PÁGINAS -->
    <!-- ===================================== -->

    <main class="contenido-principal">
      <RouterView />
    </main>


    <!-- ===================================== -->
    <!-- FOOTER SOLO PARA EL CLIENTE -->
    <!-- ===================================== -->

    <footer
      v-if="!$route.meta.ocultarNavegacion"
      class="footer"
    >

      <div class="footer-contenido">

        <div class="footer-logo">

          <div class="footer-logo-icono">
            <img
              src="/logo-mega-mex.png"
              alt="Mega-Mex"
            >
          </div>

          <div class="footer-logo-texto">

            <h3>
              MEGA-MEX
            </h3>

            <p>
              Abarrotes por mayoreo y menudeo
            </p>

          </div>

        </div>


        <div class="footer-seccion">

          <h4>
            Enlaces
          </h4>

          <RouterLink to="/inicio">
            Inicio
          </RouterLink>

          <RouterLink to="/productos">
            Productos
          </RouterLink>

          <RouterLink to="/promociones">
            Promociones
          </RouterLink>

          <RouterLink to="/empresa">
            Nosotros
          </RouterLink>

        </div>


        <div class="footer-seccion">

          <h4>
            Contacto
          </h4>

          <p>
            <span class="footer-icono">📍</span>
            Heroica Ciudad de Tlaxiaco, Oaxaca
          </p>

          <RouterLink to="/redes">
            <span class="footer-icono">📱</span>
            Redes sociales
          </RouterLink>

        </div>

      </div>

      <div class="copyright">
        © 2026 Mega-Mex
      </div>

    </footer>

  </div>

</template>


<style scoped>

.app {
  min-height: 100vh;

  display: flex;

  flex-direction: column;

  background: #f5f9fd;
}


.contenido-principal {
  flex: 1;
}


/* ========================================== */
/* FOOTER */
/* ========================================== */

.footer {
  margin-top: auto;

  background:
    linear-gradient(
      135deg,
      #003b73,
      #005fb3,
      #006bc5
    );

  color: white;
  box-shadow:
    inset 0 1px 0
    rgba(255, 255, 255, 0.12);
}


.footer-contenido {
  width: min(1200px, 92%);

  margin: auto;

  padding: 56px 0 40px;

  display: grid;

  grid-template-columns:
    1.5fr 1fr 1fr;

  gap: 50px;
  align-items: start;
}


.footer-logo {
  display: flex;

  align-items: center;

  gap: 18px;
}

.footer-logo-icono {
  width: 76px;
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background:
    rgba(255, 255, 255, 0.12);

  box-shadow:
    0 10px 18px
    rgba(0, 0, 0, 0.12);
}

.footer-logo img {
  width: 58px;
  height: 58px;

  object-fit: contain;
}

.footer-logo-texto {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-logo h3 {
  margin: 0;

  font-size: 2rem;

  letter-spacing: 0.04em;
  line-height: 1.1;
}

.footer-logo p {
  margin: 0;

  color:
    rgba(255, 255, 255, 0.78);

  font-size: 0.82rem;
}


.footer-seccion {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 10px;
}

.footer-seccion h4 {
  margin: 0 0 10px;

  font-size: 1.1rem;
  font-weight: 700;
}

.footer-seccion a,
.footer-seccion p {
  color:
    rgba(255, 255, 255, 0.8);

  text-decoration: none;

  font-size: 0.95rem;
  line-height: 1.7;

  transition: 0.25s ease;
}

.footer-seccion a:hover {
  color: white;

  transform:
    translateX(4px);
}

.footer-icono {
  display: inline-block;

  margin-right: 6px;
}


.copyright {
  padding: 18px 16px 22px;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.12);

  text-align: center;

  color:
    rgba(255, 255, 255, 0.7);

  font-size: 0.8rem;
}


/* ========================================== */
/* RESPONSIVE */
/* ========================================== */

@media (max-width: 800px) {

  .footer-contenido {
    grid-template-columns: 1fr;

    gap: 30px;
  }

}

</style>