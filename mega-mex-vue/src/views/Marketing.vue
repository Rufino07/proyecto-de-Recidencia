<template>
  <section class="marketing">

    <!-- ======================================= -->
    <!-- ENCABEZADO -->
    <!-- ======================================= -->
    <div class="encabezado">
      <div class="megafono">
        <img
          src="/MARKETING.png"
          alt="Marketing Mega-Mex"
        />
      </div>

      <h1>Marketing Mega-Mex</h1>

      <p>
        Descubre nuestros productos, promociones
        y contenido en redes sociales.
      </p>
    </div>


    <!-- ======================================= -->
    <!-- MENÚ PRINCIPAL -->
    <!-- ======================================= -->
    <div class="menu-marketing">

      <!-- FLYERS -->
      <div class="tarjeta-menu activa">

        <div class="icono-menu">
          🎨
        </div>

        <div class="texto-menu">
          <h3>Flyers</h3>
          <p>Conoce nuestros productos</p>
        </div>

      </div>


      <!-- PROMOCIONES -->
      <RouterLink
        to="/promociones"
        class="tarjeta-menu"
      >

        <div class="icono-menu">
          ⭐
        </div>

        <div class="texto-menu">
          <h3>Promociones</h3>
          <p>Descubre nuestras promociones</p>
        </div>

      </RouterLink>


      <!-- REDES -->
      <RouterLink
        to="/redes"
        class="tarjeta-menu"
      >

        <div class="icono-menu">
          📱
        </div>

        <div class="texto-menu">
          <h3>Redes</h3>
          <p>Síguenos en redes sociales</p>
        </div>

      </RouterLink>

    </div>


    <!-- ======================================= -->
    <!-- CONTENIDO DE FLYERS -->
    <!-- ======================================= -->
    <div class="contenedor">

      <!-- TÍTULO -->
      <div class="titulo-seccion">

        <span class="etiqueta">
          🎨 FLYERS DE PRODUCTOS
        </span>

        <h2>Conoce nuestros productos</h2>

        <p>
          Explora algunos de los productos que puedes encontrar
          en Mega-Mex.
        </p>

      </div>


      <!-- ======================================= -->
      <!-- GALERÍA -->
      <!-- ======================================= -->
      <div class="galeria">

        <article
          v-for="flyer in flyers"
          :key="flyer.id"
          class="tarjeta-flyer"
        >

          <!-- IMAGEN -->
          <div class="imagen-flyer">

            <img
              :src="flyer.imagen"
              :alt="flyer.titulo"
            />

            <!-- EFECTO AL PASAR MOUSE -->
            <div class="overlay">

              <button
                @click="verFlyer(flyer)"
              >
                👁 Ver flyer
              </button>

            </div>

          </div>


          <!-- INFORMACIÓN -->
          <div class="informacion-flyer">

            <span class="producto">
              PRODUCTO
            </span>

            <h3>
              {{ flyer.titulo }}
            </h3>

            <p>
              {{ flyer.descripcion }}
            </p>


            <button
              class="btn-ver"
              @click="verFlyer(flyer)"
            >
              👁 Ver flyer
            </button>

          </div>

        </article>

      </div>

    </div>


    <!-- ======================================= -->
    <!-- MODAL PARA VER FLYER -->
    <!-- ======================================= -->
    <transition name="modal">

      <div
        v-if="flyerSeleccionado"
        class="modal-fondo"
        @click.self="cerrarFlyer"
      >

        <div class="modal-flyer">

          <!-- BOTÓN CERRAR -->
          <button
            class="cerrar-modal"
            @click="cerrarFlyer"
          >
            ✕
          </button>


          <!-- IMAGEN GRANDE -->
          <img
            :src="flyerSeleccionado.imagen"
            :alt="flyerSeleccionado.titulo"
          />


          <!-- INFORMACIÓN -->
          <div class="modal-informacion">

            <span>
              PRODUCTO
            </span>

            <h2>
              {{ flyerSeleccionado.titulo }}
            </h2>

            <p>
              {{ flyerSeleccionado.descripcion }}
            </p>

          </div>

        </div>

      </div>

    </transition>

  </section>
</template>


<script setup>
import { ref } from 'vue'


/* ======================================= */
/* FLYER SELECCIONADO */
/* ======================================= */

const flyerSeleccionado = ref(null)


/* ======================================= */
/* LISTA DE FLYERS */
/* ======================================= */

const flyers = ref([

  {
    id: 1,
    titulo: 'Producto destacado',
    descripcion:
      'Conoce este producto disponible en Mega-Mex.',
    imagen:
      '/flyers/flyer1.jpg'
  },

  {
    id: 2,
    titulo: 'Productos Mega-Mex',
    descripcion:
      'Encuentra variedad de productos en nuestras sucursales.',
    imagen:
      '/flyers/flyer2.jpg'
  },

  {
    id: 3,
    titulo: 'Producto recomendado',
    descripcion:
      'Conoce algunos de nuestros productos destacados.',
    imagen:
      '/flyers/flyer3.jpg'
  },

  {
    id: 4,
    titulo: 'Productos Mega-Mex',
    descripcion:
      'Descubre productos disponibles en Mega-Mex.',
    imagen:
      '/flyers/flyer4.jpg'
  },

  {
    id: 5,
    titulo: 'Producto destacado',
    descripcion:
      'Conoce más de nuestra variedad de productos.',
    imagen:
      '/flyers/flyer5.jpg'
  },

  {
    id: 6,
    titulo: 'Producto Mega-Mex',
    descripcion:
      'Encuentra tus productos favoritos en Mega-Mex.',
    imagen:
      '/flyers/flyer6.jpg'
  }

])


/* ======================================= */
/* VER FLYER */
/* ======================================= */

const verFlyer = (flyer) => {

  flyerSeleccionado.value = flyer

  document.body.style.overflow = 'hidden'

}


/* ======================================= */
/* CERRAR FLYER */
/* ======================================= */

const cerrarFlyer = () => {

  flyerSeleccionado.value = null

  document.body.style.overflow = ''

}

</script>


<style scoped>

/* ======================================= */
/* GENERAL */
/* ======================================= */

.marketing {

  position: relative;

  min-height: 100vh;

  padding: 60px 6% 80px;

  background:
    radial-gradient(
      circle at top left,
      rgba(255,255,255,0.22),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #0a3c72,
      #0b5da8 38%,
      #0ea5e9 100%
    );

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}

.marketing::before,
.marketing::after {

  content: "";

  position: absolute;

  border-radius: 50%;

  filter: blur(18px);

  opacity: 0.35;

}

.marketing::before {

  width: 280px;
  height: 280px;

  top: 60px;
  right: 8%;

  background:
    rgba(255, 194, 80, 0.42);

}

.marketing::after {

  width: 220px;
  height: 220px;

  left: 9%;
  bottom: 120px;

  background:
    rgba(255, 255, 255, 0.18);

}


/* ======================================= */
/* ENCABEZADO */
/* ======================================= */

.encabezado {

  position: relative;

  z-index: 1;

  max-width: 900px;

  margin: 0 auto 48px;

  text-align: center;

  color: white;

}


.megafono {

  margin-bottom: 18px;

  display: flex;

  justify-content: center;

  align-items: center;

  animation:
    moverMegafono
    2.5s
    infinite
    ease-in-out;

}


.megafono img {

  width: 120px;
  height: 120px;

  object-fit:
    contain;

  filter:
    drop-shadow(0 16px 28px rgba(10, 35, 66, 0.35));

}


@keyframes moverMegafono {

  0%,
  100% {

    transform:
      rotate(-6deg);

  }


  50% {

    transform:
      rotate(8deg)
      scale(1.08);

  }

}


.encabezado h1 {

  margin: 0 0 12px;

  font-size: clamp(2.3rem, 4vw, 4rem);

  line-height: 1.1;

  letter-spacing: -0.04em;

}


.encabezado p {

  max-width: 720px;

  margin: auto;

  font-size: 1.05rem;

  line-height: 1.7;

  color: rgba(255, 255, 255, 0.85);

}


/* ======================================= */
/* MENÚ */
/* ======================================= */

.menu-marketing {

  position: relative;

  z-index: 1;

  max-width: 1100px;

  margin: 0 auto 52px;

  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 22px;

}


.tarjeta-menu {

  background:
    rgba(255, 255, 255, 0.94);

  padding: 22px 24px;

  border-radius: 22px;

  display: flex;

  align-items: center;

  gap: 18px;

  color: inherit;

  text-decoration: none;

  cursor: pointer;

  border: 1px solid rgba(255, 255, 255, 0.3);

  box-shadow:
    0 14px 30px rgba(5, 37, 70, 0.14);

  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;

}


.tarjeta-menu:hover {

  transform: translateY(-6px);

  box-shadow:
    0 24px 42px rgba(5, 37, 70, 0.18);

  border-color: rgba(10, 105, 185, 0.18);

}


.tarjeta-menu.activa {

  background:
    linear-gradient(135deg, #ffffff, #edf7ff);

  box-shadow:
    0 18px 36px rgba(10, 105, 185, 0.18);

}


.icono-menu {

  width: 68px;
  height: 68px;

  min-width: 68px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 18px;

  background: linear-gradient(135deg, #eaf6ff, #dfeeff);

  font-size: 32px;

  box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);

}


.texto-menu h3 {

  margin: 0;

  color: #14253d;

  font-size: 1.2rem;

  letter-spacing: -0.02em;

}


.texto-menu p {

  margin: 6px 0 0;

  color: #64748b;

  font-size: 0.83rem;

  line-height: 1.5;

}


/* ======================================= */
/* CONTENEDOR */
/* ======================================= */

.contenedor {

  position: relative;

  z-index: 1;

  max-width: 1250px;

  margin: auto;

  padding: 52px 40px 40px;

  background: rgba(248, 250, 252, 0.98);

  border: 1px solid rgba(148, 163, 184, 0.18);

  border-radius: 30px;

  box-sizing: border-box;

  box-shadow:
    0 28px 55px rgba(2, 26, 48, 0.18);

}


/* ======================================= */
/* TÍTULO DE LA SECCIÓN */
/* ======================================= */

.titulo-seccion {

  text-align:
    center;

  margin-bottom:
    45px;

}


.etiqueta {

  display: inline-block;

  padding: 9px 18px;

  border-radius: 999px;

  background: linear-gradient(135deg, #0e6fc9, #1c8fe7);

  color: white;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;

}


.titulo-seccion h2 {

  margin: 18px 0 10px;

  color: #102236;

  font-size: clamp(2rem, 3vw, 2.8rem);

}


.titulo-seccion p {

  max-width: 650px;

  margin: auto;

  color: #64748b;

  line-height: 1.7;

}


/* ======================================= */
/* GALERÍA */
/* ======================================= */

.galeria {

  display:
    grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    28px;

}


/* ======================================= */
/* TARJETA */
/* ======================================= */

.tarjeta-flyer {

  overflow: hidden;

  background: white;

  border: 1px solid rgba(148, 163, 184, 0.16);

  border-radius: 24px;

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;

}


.tarjeta-flyer:hover {

  transform: translateY(-9px);

  box-shadow:
    0 20px 42px rgba(15, 23, 42, 0.15);

  border-color: rgba(14, 111, 201, 0.15);

}


/* ======================================= */
/* IMAGEN */
/* ======================================= */

.imagen-flyer {

  position:
    relative;

  height:
    370px;

  overflow:
    hidden;

  background:
    #eef2f6;

}


.imagen-flyer img {

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;

  display:
    block;

  transition:
    transform 0.5s ease;

}


.tarjeta-flyer:hover
.imagen-flyer img {

  transform:
    scale(1.07);

}


/* ======================================= */
/* OVERLAY */
/* ======================================= */

.overlay {

  position:
    absolute;

  inset:
    0;

  display:
    flex;

  justify-content:
    center;

  align-items:
    center;

  background:
    rgba(0, 45, 90, 0.67);

  opacity:
    0;

  transition:
    opacity 0.3s ease;

}


.tarjeta-flyer:hover
.overlay {

  opacity:
    1;

}


.overlay button {

  border:
    none;

  padding:
    13px 25px;

  border-radius:
    30px;

  background:
    white;

  color:
    #006bc5;

  cursor:
    pointer;

  font-size:
    14px;

  font-weight:
    bold;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

}


.overlay button:hover {

  transform:
    scale(1.08);

  background:
    #006bc5;

  color:
    white;

}


/* ======================================= */
/* INFORMACIÓN */
/* ======================================= */

.informacion-flyer {

  padding: 22px 22px 20px;

}


.producto {

  display: inline-block;

  padding: 6px 12px;

  border-radius: 999px;

  background: #eaf5ff;

  color: #0a6dc0;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;

}


.informacion-flyer h3 {

  margin: 14px 0 8px;

  color: #14253d;

  font-size: 1.2rem;

  letter-spacing: -0.02em;

}


.informacion-flyer p {

  margin: 0;

  color: #6b7280;

  line-height: 1.6;

  font-size: 0.92rem;

}


/* ======================================= */
/* BOTÓN VER */
/* ======================================= */

.btn-ver {

  width: 100%;

  margin-top: 18px;

  border: none;

  padding: 12px 14px;

  border-radius: 12px;

  background: linear-gradient(135deg, #edf7ff, #dfeeff);

  color: #0a6dc0;

  cursor: pointer;

  font-weight: 700;

  transition: 0.25s ease;

}


.btn-ver:hover {

  background: linear-gradient(135deg, #0d6ec6, #1a8fe7);

  color: white;

  transform: translateY(-2px);

  box-shadow: 0 14px 26px rgba(10, 109, 192, 0.18);

}


/* ======================================= */
/* MODAL */
/* ======================================= */

.modal-fondo {

  position:
    fixed;

  inset:
    0;

  z-index:
    99999;

  padding:
    20px;

  background:
    rgba(0, 0, 0, 0.85);

  display:
    flex;

  justify-content:
    center;

  align-items:
    center;

  backdrop-filter:
    blur(5px);

}


/* ======================================= */
/* CONTENIDO MODAL */
/* ======================================= */

.modal-flyer {

  position:
    relative;

  width:
    100%;

  max-width:
    720px;

  max-height:
    92vh;

  overflow-y:
    auto;

  padding:
    25px;

  border-radius:
    24px;

  background:
    white;

  box-sizing:
    border-box;

  text-align:
    center;

  box-shadow:
    0 30px 70px
    rgba(0, 0, 0, 0.40);

}


/* IMAGEN GRANDE */

.modal-flyer img {

  display:
    block;

  width:
    auto;

  max-width:
    100%;

  max-height:
    68vh;

  margin:
    auto;

  border-radius:
    15px;

  object-fit:
    contain;

}


/* ======================================= */
/* CERRAR */
/* ======================================= */

.cerrar-modal {

  position:
    absolute;

  z-index:
    20;

  top:
    15px;

  right:
    15px;

  width:
    44px;

  height:
    44px;

  border:
    none;

  border-radius:
    50%;

  background:
    #e53935;

  color:
    white;

  cursor:
    pointer;

  font-size:
    18px;

  font-weight:
    bold;

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.25);

  transition:
    transform 0.2s ease;

}


.cerrar-modal:hover {

  transform:
    scale(1.1);

}


/* ======================================= */
/* INFORMACIÓN MODAL */
/* ======================================= */

.modal-informacion {

  padding:
    20px 10px 5px;

}


.modal-informacion span {

  color:
    #006bc5;

  font-size:
    12px;

  font-weight:
    bold;

}


.modal-informacion h2 {

  margin:
    10px 0;

  color:
    #202938;

}


.modal-informacion p {

  margin:
    0;

  color:
    #667085;

  line-height:
    1.6;

}


/* ======================================= */
/* ANIMACIÓN MODAL */
/* ======================================= */

.modal-enter-active,
.modal-leave-active {

  transition:
    opacity 0.3s ease;

}


.modal-enter-from,
.modal-leave-to {

  opacity:
    0;

}


/* ======================================= */
/* TABLET */
/* ======================================= */

@media
(max-width: 950px) {

  .menu-marketing {

    grid-template-columns:
      1fr;

  }


  .galeria {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


/* ======================================= */
/* CELULAR */
/* ======================================= */

@media
(max-width: 650px) {

  .marketing {

    padding:
      35px 15px;

  }


  .encabezado h1 {

    font-size:
      31px;

  }


  .encabezado p {

    font-size:
      15px;

  }


  .megafono {

    font-size:
      50px;

  }


  .tarjeta-menu {

    padding:
      20px;

  }


  .icono-menu {

    width:
      55px;

    height:
      55px;

    min-width:
      55px;

    font-size:
      28px;

  }


  .contenedor {

    padding:
      30px 15px;

    border-radius:
      22px;

  }


  .titulo-seccion h2 {

    font-size:
      28px;

  }


  .galeria {

    grid-template-columns:
      1fr;

  }


  .imagen-flyer {

    height:
      430px;

  }


  .overlay {

    opacity:
      1;

    align-items:
      flex-end;

    padding-bottom:
      25px;

    background:
      linear-gradient(
        transparent 55%,
        rgba(0, 45, 90, 0.72)
      );

  }


  .modal-fondo {

    padding:
      10px;

  }


  .modal-flyer {

    padding:
      15px;

  }


  .cerrar-modal {

    top:
      10px;

    right:
      10px;

  }

}

</style>