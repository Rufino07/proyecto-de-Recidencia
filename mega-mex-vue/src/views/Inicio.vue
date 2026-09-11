<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import heroProductos from '../assets/img22.png'

const mostrarPresentacion = ref(false)
const abrirCortina = ref(false)

let timerAbrir = null
let timerOcultar = null
let observer = null

const cerrarPresentacion = () => {
  abrirCortina.value = true

  clearTimeout(timerOcultar)

  timerOcultar = setTimeout(() => {
    mostrarPresentacion.value = false
    document.body.style.overflow = ''

    sessionStorage.setItem(
      'megaMexPresentacion',
      'vista'
    )
  }, 900)
}

onMounted(() => {
  const yaLaVio =
    sessionStorage.getItem('megaMexPresentacion')

  if (!yaLaVio) {
    mostrarPresentacion.value = true
    document.body.style.overflow = 'hidden'

    timerAbrir = setTimeout(() => {
      cerrarPresentacion()
    }, 1400)
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12
    }
  )

  document
    .querySelectorAll('.revelar')
    .forEach((elemento) => {
      observer.observe(elemento)
    })
})

onBeforeUnmount(() => {
  clearTimeout(timerAbrir)
  clearTimeout(timerOcultar)

  if (observer) {
    observer.disconnect()
  }

  document.body.style.overflow = ''
})
</script>


<template>

  <!-- ================================================= -->
  <!-- PRESENTACIÓN INICIAL -->
  <!-- ================================================= -->

  <Transition name="presentacion-fade">

    <div
      v-if="mostrarPresentacion"
      class="presentacion-tienda"
      :class="{ abierta: abrirCortina }"
    >

      <!-- TOLDO SUPERIOR -->

      <div class="toldo">

        <span class="toldo-azul"></span>
        <span class="toldo-blanco"></span>
        <span class="toldo-rojo"></span>
        <span class="toldo-blanco"></span>
        <span class="toldo-amarillo"></span>
        <span class="toldo-blanco"></span>
        <span class="toldo-azul"></span>

      </div>


      <!-- CORTINA IZQUIERDA -->

      <div class="cortina cortina-izquierda">

        <div class="lineas-cortina"></div>

      </div>


      <!-- CORTINA DERECHA -->

      <div class="cortina cortina-derecha">

        <div class="lineas-cortina"></div>

      </div>


      <!-- LETRERO / LOGO -->

      <div class="presentacion-centro">

        <div class="letrero-megamEX">

          <div class="letrero-superior"></div>


          <img
            src="/logo-mega-mex.png"
            alt="Abarrotes Mega-Mex"
          />


          <div class="letrero-info">

            <span>
              ABARROTES
            </span>

            <strong>
              MEGA-MEX
            </strong>

            <small>
              MAYOREO · MENUDEO
            </small>

          </div>


          <div class="letrero-colores">

            <span class="color-azul"></span>
            <span class="color-rojo"></span>
            <span class="color-amarillo"></span>

          </div>

        </div>

      </div>


      <!-- BOTÓN SALTAR -->

      <button
        type="button"
        class="saltar-presentacion"
        aria-label="Saltar presentación"
        @click="cerrarPresentacion"
      >

        Saltar

        <span>
          →
        </span>

      </button>


      <!-- PISO -->

      <div class="piso-tienda"></div>

    </div>

  </Transition>



  <!-- ================================================= -->
  <!-- PORTADA -->
  <!-- ================================================= -->

  <section class="hero">

    <div class="hero-decoracion decoracion-1"></div>
    <div class="hero-decoracion decoracion-2"></div>


    <div class="hero-contenido">


      <!-- ================================================= -->
      <!-- TEXTO -->
      <!-- ================================================= -->

      <div class="hero-texto">

        <div class="etiqueta">

          <span></span>

          ABARROTES MEGA-MEX

        </div>


        <h1>

          Todo lo que necesitas

          <strong>
            en un solo lugar.
          </strong>

        </h1>


        <p class="hero-descripcion">

          Encuentra productos de abarrotes por mayoreo
          y menudeo para tu hogar o negocio.
          Consulta nuestro catálogo, promociones
          y novedades.

        </p>


        <!-- BOTONES -->

        <div class="hero-botones">

          <RouterLink
            to="/productos"
            class="boton boton-principal"
          >

            Ver productos

            <span>
              →
            </span>

          </RouterLink>


          <RouterLink
            to="/promociones"
            class="boton boton-secundario"
          >

            Ver promociones

          </RouterLink>

        </div>


        <!-- BENEFICIOS -->

        <div class="beneficios">


          <div class="beneficio">

            <div class="beneficio-check">
              ✓
            </div>

            <div>

              <strong>
                Mayoreo
              </strong>

              <span>
                Para tu negocio
              </span>

            </div>

          </div>


          <div class="beneficio">

            <div class="beneficio-check">
              ✓
            </div>

            <div>

              <strong>
                Menudeo
              </strong>

              <span>
                Para tu hogar
              </span>

            </div>

          </div>


          <div class="beneficio">

            <div class="beneficio-check">
              ✓
            </div>

            <div>

              <strong>
                Promociones
              </strong>

              <span>
                Grandes opciones
              </span>

            </div>

          </div>


        </div>

      </div>



      <!-- ================================================= -->
      <!-- PRODUCTOS -->
      <!-- ================================================= -->

      <div class="hero-productos">


        <div class="productos-etiqueta">

          <div class="estrella">
            ★
          </div>

          <div>

            <strong>
              Gran variedad
            </strong>

            <span>
              Productos para todos
            </span>

          </div>

        </div>


        <div class="productos-imagen">

          <img
            :src="heroProductos"
            alt="Productos disponibles en Mega-Mex"
          />

        </div>


        <div class="productos-inferior">

          <div>

            <div class="productos-icono">
              +
            </div>

            <div>

              <strong>
                Productos Mega-Mex
              </strong>

              <span>
                Hogar y negocio
              </span>

            </div>

          </div>


          <RouterLink
            to="/productos"
            class="explorar"
          >

            Explorar

            <span>
              →
            </span>

          </RouterLink>

        </div>

      </div>

    </div>


    <!-- COLORES DE MARCA -->

    <div class="barra-marca">

      <span class="marca-azul"></span>
      <span class="marca-rojo"></span>
      <span class="marca-amarillo"></span>

    </div>

  </section>



  <!-- ================================================= -->
  <!-- CATEGORÍAS -->
  <!-- ================================================= -->

  <section class="seccion">

    <div class="contenedor">


      <div class="titulo-seccion revelar">

        <span>
          CONOCE MEGA-MEX
        </span>

        <h2>
          ¿Qué estás buscando?
        </h2>

        <p>
          Accede fácilmente a nuestras principales
          secciones.
        </p>

      </div>



      <div class="categorias">


        <!-- PRODUCTOS -->

        <RouterLink
          to="/productos"
          class="tarjeta revelar"
        >

          <div class="linea linea-azul"></div>


          <div class="tarjeta-superior">

            <div class="icono icono-azul">
              📦
            </div>

            <span class="numero">
              01
            </span>

          </div>


          <h3>
            Productos
          </h3>


          <p>
            Consulta nuestros productos disponibles
            por mayoreo y menudeo.
          </p>


          <span class="ver-mas">

            Ver productos

            <strong>
              →
            </strong>

          </span>

        </RouterLink>



        <!-- PROMOCIONES -->

        <RouterLink
          to="/promociones"
          class="tarjeta revelar"
        >

          <div class="linea linea-amarilla"></div>


          <div class="tarjeta-superior">

            <div class="icono icono-amarillo">
              🏷️
            </div>

            <span class="numero">
              02
            </span>

          </div>


          <h3>
            Promociones
          </h3>


          <p>
            Descubre las promociones y novedades
            disponibles en Mega-Mex.
          </p>


          <span class="ver-mas">

            Ver promociones

            <strong>
              →
            </strong>

          </span>

        </RouterLink>



        <!-- NOSOTROS -->

        <RouterLink
          to="/empresa"
          class="tarjeta revelar"
        >

          <div class="linea linea-roja"></div>


          <div class="tarjeta-superior">

            <div class="icono icono-rojo">
              🏪
            </div>

            <span class="numero">
              03
            </span>

          </div>


          <h3>
            Nosotros
          </h3>


          <p>
            Conoce nuestra empresa,
            historia y valores.
          </p>


          <span class="ver-mas">

            Conocer Mega-Mex

            <strong>
              →
            </strong>

          </span>

        </RouterLink>


      </div>

    </div>

  </section>



  <!-- ================================================= -->
  <!-- MAYOREO -->
  <!-- ================================================= -->

  <section class="mayoreo">

    <div class="mayoreo-decoracion"></div>


    <div class="contenedor mayoreo-contenido">


      <div class="mayoreo-texto revelar">

        <span class="etiqueta-blanca">

          VENTAS POR MAYOREO

        </span>


        <h2>

          Productos para
          surtir tu negocio

        </h2>


        <p>

          Encuentra diferentes presentaciones
          por caja, paquete y mayoreo para
          abastecer tu negocio.

        </p>


        <RouterLink
          to="/productos"
          class="boton boton-blanco"
        >

          Conocer productos

          <span>
            →
          </span>

        </RouterLink>

      </div>



      <!-- OPCIONES -->

      <div class="mayoreo-opciones revelar">


        <div class="opcion">

          <div class="opcion-numero">
            01
          </div>

          <div>

            <strong>
              Compra por caja
            </strong>

            <span>
              Presentaciones para tu negocio.
            </span>

          </div>

        </div>



        <div class="opcion">

          <div class="opcion-numero">
            02
          </div>

          <div>

            <strong>
              Gran variedad
            </strong>

            <span>
              Diferentes productos en un lugar.
            </span>

          </div>

        </div>



        <div class="opcion">

          <div class="opcion-numero">
            03
          </div>

          <div>

            <strong>
              Promociones
            </strong>

            <span>
              Consulta nuestras ofertas.
            </span>

          </div>

        </div>


      </div>

    </div>

  </section>



  <!-- ================================================= -->
  <!-- PROMOCIONES -->
  <!-- ================================================= -->

  <section class="seccion promociones">

    <div class="contenedor">


      <div class="titulo-seccion revelar">

        <span>
          OFERTAS Y NOVEDADES
        </span>

        <h2>
          Promociones Mega-Mex
        </h2>

        <p>
          Conoce promociones pensadas
          para ti y para tu negocio.
        </p>

      </div>



      <div class="promociones-grid">


        <!-- PROMOCIÓN -->

        <div class="promo revelar">

          <div class="promo-linea promo-linea-azul"></div>


          <div class="promo-superior">

            <div class="promo-icono promo-azul">
              %
            </div>

            <span>
              01
            </span>

          </div>


          <small>
            PROMOCIONES
          </small>

          <h3>
            Productos seleccionados
          </h3>

          <p>
            Consulta nuestras promociones
            vigentes.
          </p>

        </div>



        <!-- MAYOREO -->

        <div class="promo revelar">

          <div class="promo-linea promo-linea-roja"></div>


          <div class="promo-superior">

            <div class="promo-icono promo-rojo">
              $
            </div>

            <span>
              02
            </span>

          </div>


          <small class="texto-rojo">
            MAYOREO
          </small>

          <h3>
            Precios especiales
          </h3>

          <p>
            Encuentra opciones especiales
            para compras por mayoreo.
          </p>

        </div>



        <!-- NOVEDADES -->

        <div class="promo revelar">

          <div class="promo-linea promo-linea-amarilla"></div>


          <div class="promo-superior">

            <div class="promo-icono promo-amarillo">
              ★
            </div>

            <span>
              03
            </span>

          </div>


          <small class="texto-amarillo">
            NOVEDADES
          </small>

          <h3>
            Nuevos productos
          </h3>

          <p>
            Descubre los nuevos productos
            disponibles en Mega-Mex.
          </p>

        </div>


      </div>



      <div class="promociones-boton revelar">

        <RouterLink
          to="/promociones"
          class="boton boton-principal"
        >

          Ver todas las promociones

          <span>
            →
          </span>

        </RouterLink>

      </div>


    </div>

  </section>



  <!-- ================================================= -->
  <!-- LLAMADO FINAL -->
  <!-- ================================================= -->

  <section class="cta">

    <div class="contenedor">


      <div class="cta-contenido revelar">

        <div>

          <span>
            ABARROTES MEGA-MEX
          </span>

          <h2>
            Encuentra lo que necesitas.
          </h2>

          <p>
            Explora nuestros productos
            y promociones.
          </p>

        </div>


        <RouterLink
          to="/productos"
          class="boton boton-principal"
        >

          Explorar productos

          <span>
            →
          </span>

        </RouterLink>

      </div>


    </div>

  </section>

</template>


<style scoped>

/* ================================================= */
/* GENERAL */
/* ================================================= */

* {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;

  background: #ffffff;

  color: #172033;

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.contenedor {
  width: min(1180px, 90%);
  margin: auto;
}


/* ================================================= */
/* PRESENTACIÓN */
/* ================================================= */

.presentacion-tienda {
  position: fixed;

  inset: 0;

  z-index: 99999;

  overflow: hidden;

  background: #006bc5;
}


/* ================================================= */
/* TOLDO */
/* ================================================= */

.toldo {
  position: absolute;

  z-index: 50;

  top: 0;
  left: 0;

  width: 100%;
  height: 68px;

  display: flex;

  box-shadow:
    0 7px 20px
    rgba(0, 0, 0, 0.14);

  transition:
    transform 0.7s ease,
    opacity 0.7s ease;
}

.toldo span {
  flex: 1;

  border-radius:
    0 0 10px 10px;
}

.toldo-azul {
  background: #006bc5;
}

.toldo-blanco {
  background: white;
}

.toldo-rojo {
  background: #e5283c;
}

.toldo-amarillo {
  background: #ffc400;
}

.presentacion-tienda.abierta .toldo {
  transform:
    translateY(-110%);

  opacity: 0;
}


/* ================================================= */
/* CORTINAS */
/* ================================================= */

.cortina {
  position: absolute;

  z-index: 20;

  top: 0;

  width: 50%;
  height: 100%;

  overflow: hidden;

  background:
    linear-gradient(
      90deg,
      #0057a1,
      #006bc5 25%,
      #005ca9 50%,
      #0075cf 75%,
      #0057a1
    );

  transition:
    transform 1s
    cubic-bezier(.77, 0, .18, 1);
}

.cortina-izquierda {
  left: 0;

  border-right:
    1px solid
    rgba(255, 255, 255, 0.4);
}

.cortina-derecha {
  right: 0;

  border-left:
    1px solid
    rgba(255, 255, 255, 0.4);
}

.lineas-cortina {
  position: absolute;

  inset: 0;

  opacity: 0.14;

  background:
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 60px,
      rgba(0, 0, 0, 0.35) 61px,
      transparent 63px
    );
}

.presentacion-tienda.abierta
.cortina-izquierda {
  transform:
    translateX(-102%);
}

.presentacion-tienda.abierta
.cortina-derecha {
  transform:
    translateX(102%);
}


/* ================================================= */
/* LETRERO DEL LOGO */
/* ================================================= */

.presentacion-centro {
  position: absolute;

  z-index: 60;

  left: 50%;
  top: 50%;

  width: min(450px, 86%);

  transform:
    translate(-50%, -50%);

  transition:
    opacity 0.35s ease,
    transform 0.55s ease;
}

.presentacion-tienda.abierta
.presentacion-centro {
  opacity: 0;

  transform:
    translate(-50%, -50%)
    scale(0.94);
}

.letrero-megamEX {
  position: relative;

  width: 100%;

  padding:
    25px 29px 24px;

  display: flex;

  align-items: center;

  gap: 21px;

  overflow: hidden;

  border:
    1px solid
    rgba(255, 255, 255, 0.75);

  border-radius: 11px;

  background:
    rgba(255, 255, 255, 0.97);

  box-shadow:
    0 22px 55px
    rgba(0, 0, 0, 0.24);

  animation:
    entradaLetrero
    0.7s ease both;
}

.letrero-superior {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  background: #006bc5;
}

.letrero-megamEX img {
  width: 145px;

  max-height: 95px;

  flex-shrink: 0;

  object-fit: contain;
}

.letrero-info {
  flex: 1;

  text-align: left;
}

.letrero-info > span {
  display: block;

  margin-bottom: 3px;

  color: #006bc5;

  font-size: 0.6rem;

  font-weight: 850;

  letter-spacing: 2px;
}

.letrero-info strong {
  display: block;

  color: #172033;

  font-size: 1.65rem;

  line-height: 1;

  letter-spacing: 0.5px;
}

.letrero-info small {
  display: block;

  margin-top: 8px;

  color: #64748b;

  font-size: 0.59rem;

  font-weight: 700;

  letter-spacing: 1.4px;
}

.letrero-colores {
  position: absolute;

  bottom: 0;
  left: 0;

  width: 100%;
  height: 5px;

  display: flex;
}

.letrero-colores span {
  height: 100%;
}

.color-azul {
  width: 58%;

  background: #006bc5;
}

.color-rojo {
  width: 24%;

  background: #e5283c;
}

.color-amarillo {
  width: 18%;

  background: #ffc400;
}


/* ================================================= */
/* SALTAR PRESENTACIÓN */
/* ================================================= */

.saltar-presentacion {
  position: absolute;

  z-index: 100;

  right: 28px;
  bottom: 28px;

  min-height: 43px;

  padding:
    0 17px;

  display: flex;

  align-items: center;

  gap: 8px;

  border:
    1px solid
    rgba(255, 255, 255, 0.4);

  border-radius: 8px;

  background:
    rgba(255, 255, 255, 0.11);

  backdrop-filter:
    blur(8px);

  color: white;

  font-size: 0.78rem;

  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.saltar-presentacion:hover {
  background:
    rgba(255, 255, 255, 0.2);

  transform:
    translateX(3px);
}

.saltar-presentacion:focus-visible {
  outline:
    3px solid white;

  outline-offset: 3px;
}


/* ================================================= */
/* PISO */
/* ================================================= */

.piso-tienda {
  position: absolute;

  z-index: 30;

  bottom: 0;
  left: 0;

  width: 100%;
  height: 45px;

  background:
    linear-gradient(
      #d9dde2,
      #f0f2f4
    );

  border-top:
    2px solid #c7ccd2;

  transition:
    transform 0.7s ease;
}

.presentacion-tienda.abierta
.piso-tienda {
  transform:
    translateY(105%);
}

.presentacion-fade-leave-active {
  transition:
    opacity 0.35s ease;
}

.presentacion-fade-leave-to {
  opacity: 0;
}


/* ================================================= */
/* HERO */
/* ================================================= */

.hero {
  position: relative;

  min-height:
    calc(100vh - 70px);

  display: flex;

  align-items: center;

  overflow: hidden;

  background:
    linear-gradient(
      115deg,
      #f7fbff 0%,
      #ffffff 55%,
      #f3f8fc 100%
    );
}

.hero-contenido {
  position: relative;

  z-index: 2;

  width:
    min(1220px, 90%);

  margin: auto;

  display: grid;

  grid-template-columns:
    1.05fr 0.95fr;

  align-items: center;

  gap: 65px;

  padding:
    80px 0 100px;
}


/* ================================================= */
/* TEXTO HERO */
/* ================================================= */

.hero-texto {
  animation:
    entradaIzquierda
    0.8s ease both;
}

.etiqueta {
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 21px;

  color: #006bc5;

  font-size: 0.72rem;

  font-weight: 850;

  letter-spacing: 1.5px;
}

.etiqueta > span {
  width: 28px;
  height: 3px;

  border-radius: 20px;

  background: #006bc5;
}

.hero h1 {
  max-width: 700px;

  margin: 0;

  color: #172033;

  font-size:
    clamp(
      3rem,
      5vw,
      4.8rem
    );

  line-height: 1.03;

  letter-spacing: -3px;

  font-weight: 900;
}

.hero h1 strong {
  display: block;

  color: #006bc5;

  font-weight: 900;
}

.hero-descripcion {
  max-width: 610px;

  margin:
    27px 0 32px;

  color: #64748b;

  font-size: 1.02rem;

  line-height: 1.8;
}


/* ================================================= */
/* BOTONES */
/* ================================================= */

.hero-botones {
  display: flex;

  flex-wrap: wrap;

  gap: 13px;
}

.boton {
  min-height: 51px;

  padding:
    0 25px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  border-radius: 8px;

  text-decoration: none;

  font-size: 0.9rem;

  font-weight: 750;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.boton:hover {
  transform:
    translateY(-3px);
}

.boton span {
  transition:
    transform 0.25s ease;
}

.boton:hover span {
  transform:
    translateX(5px);
}

.boton:focus-visible {
  outline:
    3px solid
    rgba(0, 107, 197, 0.3);

  outline-offset: 4px;
}

.boton-principal {
  background: #006bc5;

  color: white;

  box-shadow:
    0 10px 24px
    rgba(0, 107, 197, 0.21);
}

.boton-principal:hover {
  background: #005ba8;

  box-shadow:
    0 15px 30px
    rgba(0, 107, 197, 0.29);
}

.boton-secundario {
  color: #172033;

  background: white;

  border:
    1px solid #dce5ee;

  box-shadow:
    0 6px 18px
    rgba(15, 23, 42, 0.05);
}

.boton-secundario:hover {
  color: #006bc5;

  border-color: #006bc5;
}


/* ================================================= */
/* BENEFICIOS */
/* ================================================= */

.beneficios {
  display: flex;

  flex-wrap: wrap;

  gap: 23px;

  margin-top: 35px;

  padding-top: 26px;

  border-top:
    1px solid #e7edf4;
}

.beneficio {
  display: flex;

  align-items: center;

  gap: 9px;
}

.beneficio-check {
  width: 27px;
  height: 27px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 7px;

  background: #e7f3ff;

  color: #006bc5;

  font-size: 0.7rem;

  font-weight: 900;
}

.beneficio strong {
  display: block;

  color: #334155;

  font-size: 0.77rem;
}

.beneficio span {
  display: block;

  margin-top: 2px;

  color: #94a3b8;

  font-size: 0.64rem;
}


/* ================================================= */
/* PRODUCTOS HERO */
/* ================================================= */

.hero-productos {
  position: relative;

  min-height: 500px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  animation:
    entradaDerecha
    0.9s ease both;
}

.productos-imagen {
  height: 405px;

  display: flex;

  align-items: center;

  justify-content: center;
}

.productos-imagen img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  filter:
    drop-shadow(
      0 25px 28px
      rgba(15, 23, 42, 0.16)
    );

  animation:
    productosFlotando
    5s ease-in-out infinite;

  transition:
    transform 0.4s ease,
    filter 0.4s ease;
}

.hero-productos:hover
.productos-imagen img {
  transform:
    translateY(-4px)
    scale(1.015);

  filter:
    drop-shadow(
      0 30px 32px
      rgba(15, 23, 42, 0.21)
    );
}


/* ================================================= */
/* BADGE PRODUCTOS */
/* ================================================= */

.productos-etiqueta {
  position: absolute;

  z-index: 5;

  top: 28px;
  right: 0;

  display: flex;

  align-items: center;

  gap: 10px;

  padding:
    12px 15px;

  border:
    1px solid #e5ebf1;

  border-radius: 9px;

  background:
    rgba(255, 255, 255, 0.96);

  box-shadow:
    0 12px 30px
    rgba(15, 23, 42, 0.09);
}

.estrella {
  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 7px;

  color: #c18c00;

  background: #fff5d2;
}

.productos-etiqueta strong {
  display: block;

  color: #172033;

  font-size: 0.76rem;
}

.productos-etiqueta span {
  display: block;

  margin-top: 2px;

  color: #94a3b8;

  font-size: 0.63rem;
}


/* ================================================= */
/* PRODUCTOS INFERIOR */
/* ================================================= */

.productos-inferior {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  margin:
    -12px 16px 0;

  padding:
    14px 16px;

  border:
    1px solid #e5ebf1;

  border-radius: 9px;

  background:
    rgba(255, 255, 255, 0.97);

  box-shadow:
    0 14px 32px
    rgba(15, 23, 42, 0.08);
}

.productos-inferior > div {
  display: flex;

  align-items: center;

  gap: 10px;
}

.productos-icono {
  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 7px;

  color: #006bc5;

  background: #e7f3ff;

  font-size: 1.2rem;

  font-weight: 900;
}

.productos-inferior strong {
  display: block;

  font-size: 0.76rem;
}

.productos-inferior span {
  display: block;

  margin-top: 2px;

  color: #94a3b8;

  font-size: 0.62rem;
}

.explorar {
  display: flex;

  align-items: center;

  gap: 6px;

  color: #006bc5;

  text-decoration: none;

  font-size: 0.76rem;

  font-weight: 800;
}

.explorar span {
  transition:
    transform 0.25s ease;
}

.explorar:hover span {
  transform:
    translateX(4px);
}


/* ================================================= */
/* DECORACIONES */
/* ================================================= */

.hero-decoracion {
  position: absolute;

  border-radius: 50%;

  pointer-events: none;
}

.decoracion-1 {
  width: 450px;
  height: 450px;

  right: -220px;
  top: -210px;

  border:
    90px solid
    rgba(0, 107, 197, 0.035);
}

.decoracion-2 {
  width: 150px;
  height: 150px;

  left: -70px;
  bottom: -50px;

  background:
    rgba(255, 196, 0, 0.06);
}


/* ================================================= */
/* BARRA MARCA */
/* ================================================= */

.barra-marca {
  position: absolute;

  bottom: 0;
  left: 0;

  width: 100%;
  height: 5px;

  display: flex;
}

.marca-azul {
  width: 60%;

  background: #006bc5;
}

.marca-rojo {
  width: 23%;

  background: #e5283c;
}

.marca-amarillo {
  width: 17%;

  background: #ffc400;
}


/* ================================================= */
/* SECCIONES */
/* ================================================= */

.seccion {
  padding:
    105px 0;
}

.titulo-seccion {
  max-width: 680px;

  margin:
    0 auto 55px;

  text-align: center;
}

.titulo-seccion > span {
  display: inline-block;

  margin-bottom: 14px;

  color: #006bc5;

  font-size: 0.69rem;

  font-weight: 850;

  letter-spacing: 1.5px;
}

.titulo-seccion h2 {
  margin:
    0 0 13px;

  color: #172033;

  font-size:
    clamp(
      2rem,
      4vw,
      3rem
    );

  letter-spacing: -1.5px;
}

.titulo-seccion p {
  margin: 0;

  color: #64748b;

  line-height: 1.7;
}


/* ================================================= */
/* CATEGORÍAS */
/* ================================================= */

.categorias {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;
}

.tarjeta {
  position: relative;

  min-height: 290px;

  padding: 32px;

  overflow: hidden;

  border:
    1px solid #e4ebf2;

  border-radius: 12px;

  background: white;

  color: inherit;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.tarjeta:hover {
  transform:
    translateY(-7px);

  border-color:
    transparent;

  box-shadow:
    0 20px 45px
    rgba(15, 23, 42, 0.1);
}

.tarjeta:focus-visible {
  outline:
    3px solid
    rgba(0, 107, 197, 0.25);

  outline-offset: 4px;
}

.linea {
  position: absolute;

  top: 0;
  left: 0;

  width: 0;
  height: 4px;

  transition:
    width 0.35s ease;
}

.tarjeta:hover .linea {
  width: 100%;
}

.linea-azul {
  background: #006bc5;
}

.linea-amarilla {
  background: #ffc400;
}

.linea-roja {
  background: #e5283c;
}

.tarjeta-superior {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 27px;
}

.icono {
  width: 54px;
  height: 54px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  font-size: 1.3rem;

  transition:
    transform 0.3s ease;
}

.tarjeta:hover .icono {
  transform:
    translateY(-3px);
}

.icono-azul {
  background: #e7f3ff;
}

.icono-amarillo {
  background: #fff5d2;
}

.icono-rojo {
  background: #ffe9ec;
}

.numero {
  color: #dce4ec;

  font-size: 2rem;

  font-weight: 900;
}

.tarjeta h3 {
  margin:
    0 0 12px;

  font-size: 1.2rem;
}

.tarjeta p {
  min-height: 67px;

  margin:
    0 0 23px;

  color: #64748b;

  font-size: 0.88rem;

  line-height: 1.7;
}

.ver-mas {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #006bc5;

  font-size: 0.84rem;

  font-weight: 750;
}

.ver-mas strong {
  transition:
    transform 0.25s ease;
}

.tarjeta:hover
.ver-mas strong {
  transform:
    translateX(5px);
}


/* ================================================= */
/* MAYOREO */
/* ================================================= */

.mayoreo {
  position: relative;

  overflow: hidden;

  padding:
    95px 0;

  background:
    linear-gradient(
      120deg,
      #00549d,
      #0073ca
    );

  color: white;
}

.mayoreo-decoracion {
  position: absolute;

  width: 500px;
  height: 500px;

  right: -220px;
  top: -270px;

  border:
    90px solid
    rgba(255, 255, 255, 0.04);

  border-radius: 50%;
}

.mayoreo-contenido {
  position: relative;

  z-index: 2;

  display: grid;

  grid-template-columns:
    1fr 1fr;

  align-items: center;

  gap: 80px;
}

.etiqueta-blanca {
  display: block;

  margin-bottom: 16px;

  color:
    rgba(255, 255, 255, 0.75);

  font-size: 0.69rem;

  font-weight: 850;

  letter-spacing: 1.5px;
}

.mayoreo h2 {
  max-width: 530px;

  margin:
    0 0 20px;

  font-size:
    clamp(
      2.4rem,
      5vw,
      3.7rem
    );

  line-height: 1.05;

  letter-spacing: -2px;
}

.mayoreo-texto > p {
  max-width: 560px;

  margin:
    0 0 29px;

  color:
    rgba(255, 255, 255, 0.78);

  line-height: 1.8;
}

.boton-blanco {
  color: #006bc5;

  background: white;

  box-shadow:
    0 10px 25px
    rgba(0, 0, 0, 0.1);
}


/* ================================================= */
/* OPCIONES MAYOREO */
/* ================================================= */

.mayoreo-opciones {
  display: grid;

  gap: 12px;
}

.opcion {
  display: flex;

  align-items: center;

  gap: 16px;

  padding:
    19px 21px;

  border:
    1px solid
    rgba(255, 255, 255, 0.16);

  border-radius: 9px;

  background:
    rgba(255, 255, 255, 0.08);

  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.opcion:hover {
  transform:
    translateX(5px);

  background:
    rgba(255, 255, 255, 0.13);
}

.opcion-numero {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 8px;

  background:
    rgba(255, 255, 255, 0.14);

  font-size: 0.75rem;

  font-weight: 900;
}

.opcion strong {
  display: block;

  margin-bottom: 4px;

  font-size: 0.86rem;
}

.opcion span {
  color:
    rgba(255, 255, 255, 0.68);

  font-size: 0.72rem;
}


/* ================================================= */
/* PROMOCIONES */
/* ================================================= */

.promociones {
  background: #f8fafc;
}

.promociones-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;
}

.promo {
  position: relative;

  min-height: 280px;

  padding: 31px;

  overflow: hidden;

  border:
    1px solid #e5ebf1;

  border-radius: 12px;

  background: white;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.promo:hover {
  transform:
    translateY(-7px);

  box-shadow:
    0 20px 45px
    rgba(15, 23, 42, 0.1);
}

.promo-linea {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 4px;
}

.promo-linea-azul {
  background: #006bc5;
}

.promo-linea-roja {
  background: #e5283c;
}

.promo-linea-amarilla {
  background: #ffc400;
}

.promo-superior {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 27px;
}

.promo-superior > span {
  color: #dce4ec;

  font-size: 2rem;

  font-weight: 900;
}

.promo-icono {
  width: 51px;
  height: 51px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 9px;

  font-size: 1rem;

  font-weight: 900;
}

.promo-azul {
  color: #006bc5;

  background: #e7f3ff;
}

.promo-rojo {
  color: #e5283c;

  background: #ffe9ec;
}

.promo-amarillo {
  color: #b98500;

  background: #fff5d2;
}

.promo small {
  display: block;

  margin-bottom: 10px;

  color: #006bc5;

  font-size: 0.67rem;

  font-weight: 850;

  letter-spacing: 1.3px;
}

.promo small.texto-rojo {
  color: #e5283c;
}

.promo small.texto-amarillo {
  color: #b98500;
}

.promo h3 {
  margin:
    0 0 12px;

  font-size: 1.18rem;
}

.promo p {
  margin: 0;

  color: #64748b;

  font-size: 0.87rem;

  line-height: 1.7;
}

.promociones-boton {
  margin-top: 45px;

  text-align: center;
}


/* ================================================= */
/* CTA */
/* ================================================= */

.cta {
  padding:
    75px 0;
}

.cta-contenido {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 40px;

  padding:
    45px 50px;

  border:
    1px solid #e4ebf2;

  border-radius: 13px;

  background:
    linear-gradient(
      120deg,
      #ffffff,
      #f3f8fc
    );
}

.cta-contenido > div > span {
  color: #006bc5;

  font-size: 0.67rem;

  font-weight: 850;

  letter-spacing: 1.5px;
}

.cta h2 {
  margin:
    8px 0;

  font-size:
    clamp(
      1.7rem,
      3vw,
      2.4rem
    );

  letter-spacing: -1px;
}

.cta p {
  margin: 0;

  color: #64748b;
}


/* ================================================= */
/* ANIMACIONES SCROLL */
/* ================================================= */

.revelar {
  opacity: 0;

  transform:
    translateY(25px);

  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.revelar.visible {
  opacity: 1;

  transform:
    translateY(0);
}

.categorias
.revelar:nth-child(2),
.promociones-grid
.revelar:nth-child(2) {
  transition-delay: 0.09s;
}

.categorias
.revelar:nth-child(3),
.promociones-grid
.revelar:nth-child(3) {
  transition-delay: 0.18s;
}


/* ================================================= */
/* KEYFRAMES */
/* ================================================= */

@keyframes entradaLetrero {

  from {
    opacity: 0;

    transform:
      translateY(17px)
      scale(0.96);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }

}

@keyframes entradaIzquierda {

  from {
    opacity: 0;

    transform:
      translateX(-30px);
  }

  to {
    opacity: 1;

    transform:
      translateX(0);
  }

}

@keyframes entradaDerecha {

  from {
    opacity: 0;

    transform:
      translateX(30px);
  }

  to {
    opacity: 1;

    transform:
      translateX(0);
  }

}

@keyframes productosFlotando {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-7px);
  }

}


/* ================================================= */
/* TABLET */
/* ================================================= */

@media (max-width: 950px) {

  .hero {
    min-height: auto;
  }

  .hero-contenido {
    grid-template-columns: 1fr;

    gap: 50px;

    padding:
      80px 0 90px;
  }

  .hero-texto {
    text-align: center;
  }

  .hero h1,
  .hero-descripcion {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-botones,
  .beneficios {
    justify-content: center;
  }

  .hero-productos {
    width:
      min(650px, 100%);

    margin: auto;
  }

  .categorias,
  .promociones-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .mayoreo-contenido {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .mayoreo-texto {
    text-align: center;
  }

  .mayoreo h2,
  .mayoreo-texto > p {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-contenido {
    flex-direction: column;

    text-align: center;
  }

}


/* ================================================= */
/* CELULAR */
/* ================================================= */

@media (max-width: 650px) {

  .toldo {
    height: 52px;
  }

  .presentacion-centro {
    width: 88%;
  }

  .letrero-megamEX {
    padding:
      20px 17px 19px;

    gap: 13px;
  }

  .letrero-megamEX img {
    width: 100px;

    max-height: 75px;
  }

  .letrero-info strong {
    font-size: 1.2rem;
  }

  .letrero-info > span {
    font-size: 0.49rem;
  }

  .letrero-info small {
    font-size: 0.48rem;

    letter-spacing: 1px;
  }

  .saltar-presentacion {
    right: 17px;
    bottom: 17px;
  }

  .hero-contenido {
    width: 92%;

    padding:
      60px 0 75px;
  }

  .hero h1 {
    font-size: 2.65rem;

    letter-spacing: -2px;
  }

  .hero-descripcion {
    font-size: 0.92rem;
  }

  .hero-botones {
    flex-direction: column;
  }

  .boton {
    width: 100%;
  }

  .beneficios {
    justify-content: center;

    gap: 14px;
  }

  .hero-productos {
    min-height: 390px;
  }

  .productos-imagen {
    height: 290px;
  }

  .productos-etiqueta {
    top: 0;
    right: 0;
  }

  .productos-inferior {
    margin:
      -5px 0 0;
  }

  .seccion {
    padding:
      75px 0;
  }

  .categorias,
  .promociones-grid {
    grid-template-columns: 1fr;
  }

  .tarjeta,
  .promo {
    min-height: auto;
  }

  .tarjeta p {
    min-height: auto;
  }

  .mayoreo {
    padding:
      75px 0;
  }

  .mayoreo h2 {
    font-size: 2.4rem;
  }

  .cta {
    padding:
      60px 0;
  }

  .cta-contenido {
    padding:
      35px 24px;
  }

}


/* ================================================= */
/* ACCESIBILIDAD */
/* ================================================= */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration:
      0.01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.01ms !important;
  }

}
</style>