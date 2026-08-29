<template>
  <section class="marketing">

    <!-- ======================================= -->
    <!-- ENCABEZADO -->
    <!-- ======================================= -->
    <div class="encabezado">
      <div class="megafono">📣</div>

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

  min-height: 100vh;

  padding: 60px 6%;

  background:
    linear-gradient(
      135deg,
      #006bc5 0%,
      #0785d8 50%,
      #19a1eb 100%
    );

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


/* ======================================= */
/* ENCABEZADO */
/* ======================================= */

.encabezado {

  text-align:
    center;

  color:
    white;

  margin-bottom:
    45px;

}


.megafono {

  font-size:
    65px;

  animation:
    moverMegafono
    2.5s
    infinite
    ease-in-out;

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

  margin:
    12px 0;

  font-size:
    44px;

}


.encabezado p {

  max-width:
    700px;

  margin:
    auto;

  font-size:
    17px;

  line-height:
    1.6;

}


/* ======================================= */
/* MENÚ */
/* ======================================= */

.menu-marketing {

  max-width:
    1050px;

  margin:
    0 auto 50px;

  display:
    grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    25px;

}


.tarjeta-menu {

  background:
    white;

  padding:
    25px;

  border-radius:
    22px;

  display:
    flex;

  align-items:
    center;

  gap:
    18px;

  color:
    inherit;

  text-decoration:
    none;

  cursor:
    pointer;

  box-shadow:
    0 12px 30px
    rgba(0, 0, 0, 0.15);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

}


.tarjeta-menu:hover {

  transform:
    translateY(-8px);

  box-shadow:
    0 20px 40px
    rgba(0, 0, 0, 0.22);

}


.tarjeta-menu.activa {

  outline:
    3px solid
    rgba(255, 255, 255, 0.40);

}


.icono-menu {

  width:
    65px;

  height:
    65px;

  min-width:
    65px;

  display:
    flex;

  justify-content:
    center;

  align-items:
    center;

  border-radius:
    18px;

  background:
    #edf7ff;

  font-size:
    34px;

}


.texto-menu h3 {

  margin:
    0;

  color:
    #252b38;

  font-size:
    20px;

}


.texto-menu p {

  margin:
    6px 0 0;

  color:
    #7b8490;

  font-size:
    13px;

}


/* ======================================= */
/* CONTENEDOR */
/* ======================================= */

.contenedor {

  max-width:
    1250px;

  margin:
    auto;

  padding:
    50px;

  background:
    #f8fafc;

  border-radius:
    30px;

  box-sizing:
    border-box;

  box-shadow:
    0 25px 60px
    rgba(0, 0, 0, 0.20);

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

  display:
    inline-block;

  padding:
    9px 20px;

  border-radius:
    30px;

  background:
    #006bc5;

  color:
    white;

  font-size:
    12px;

  font-weight:
    bold;

}


.titulo-seccion h2 {

  margin:
    18px 0 10px;

  color:
    #17202a;

  font-size:
    38px;

}


.titulo-seccion p {

  max-width:
    650px;

  margin:
    auto;

  color:
    #667085;

  line-height:
    1.6;

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

  overflow:
    hidden;

  background:
    white;

  border-radius:
    22px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.08);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

}


.tarjeta-flyer:hover {

  transform:
    translateY(-9px);

  box-shadow:
    0 20px 40px
    rgba(0, 0, 0, 0.16);

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

  padding:
    22px;

}


.producto {

  display:
    inline-block;

  padding:
    6px 12px;

  border-radius:
    20px;

  background:
    #eaf5ff;

  color:
    #006bc5;

  font-size:
    11px;

  font-weight:
    bold;

}


.informacion-flyer h3 {

  margin:
    14px 0 8px;

  color:
    #202938;

  font-size:
    19px;

}


.informacion-flyer p {

  margin:
    0;

  color:
    #6b7280;

  line-height:
    1.5;

  font-size:
    14px;

}


/* ======================================= */
/* BOTÓN VER */
/* ======================================= */

.btn-ver {

  width:
    100%;

  margin-top:
    18px;

  border:
    none;

  padding:
    11px;

  border-radius:
    12px;

  background:
    #eaf5ff;

  color:
    #006bc5;

  cursor:
    pointer;

  font-weight:
    bold;

  transition:
    0.25s;

}


.btn-ver:hover {

  background:
    #006bc5;

  color:
    white;

  transform:
    translateY(-2px);

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