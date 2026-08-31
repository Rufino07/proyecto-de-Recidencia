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

        <!-- LOGO -->
        <div class="footer-logo">

          <img
            src="/logo-mega-mex.png"
            alt="Mega-Mex"
          >

          <div>

            <h3>
              MEGA-MEX
            </h3>

            <p>
              Abarrotes por mayoreo y menudeo
            </p>

          </div>

        </div>


        <!-- ENLACES -->
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


        <!-- CONTACTO -->
        <div class="footer-seccion">

          <h4>
            Contacto
          </h4>

          <p>
            📍 Heroica Ciudad de Tlaxiaco, Oaxaca
          </p>

          <RouterLink to="/redes">
            📱 Redes sociales
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
      #003f7d,
      #006bc5
    );

  color: white;
}


.footer-contenido {
  width: min(1200px, 92%);

  margin: auto;

  padding: 45px 0;

  display: grid;

  grid-template-columns:
    1.5fr 1fr 1fr;

  gap: 50px;
}


/* ========================================== */
/* LOGO */
/* ========================================== */

.footer-logo {
  display: flex;

  align-items: flex-start;

  gap: 15px;
}


.footer-logo img {
  width: 70px;

  height: 70px;

  object-fit: contain;

  padding: 7px;

  border-radius: 15px;

  background:
    rgba(255, 255, 255, 0.10);
}


.footer-logo h3 {
  margin: 5px 0 5px;

  font-size: 22px;

  letter-spacing: 1px;
}


.footer-logo p {
  margin: 0;

  color:
    rgba(255, 255, 255, 0.75);

  font-size: 13px;
}


/* ========================================== */
/* SECCIONES */
/* ========================================== */

.footer-seccion {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 10px;
}


.footer-seccion h4 {
  margin: 0 0 8px;

  font-size: 15px;
}


.footer-seccion a {
  color:
    rgba(255, 255, 255, 0.78);

  text-decoration: none;

  font-size: 13px;

  transition: 0.25s;
}


.footer-seccion a:hover {
  color: white;

  transform:
    translateX(4px);
}


.footer-seccion p {
  margin: 0;

  color:
    rgba(255, 255, 255, 0.78);

  font-size: 13px;

  line-height: 1.6;
}


/* ========================================== */
/* COPYRIGHT */
/* ========================================== */

.copyright {
  padding: 18px;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.12);

  text-align: center;

  color:
    rgba(255, 255, 255, 0.65);

  font-size: 12px;
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