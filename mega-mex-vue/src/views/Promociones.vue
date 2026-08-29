<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const promocionActiva = ref(0)

const promocionesDestacadas = [
  {
    titulo: 'Promociones Mega-Mex',
    subtitulo: 'Descubre algo nuevo',
    descripcion:
      'Conoce nuestras promociones especiales y encuentra productos para tu hogar.',
    icono: '🏷️',
    clase: 'promo-azul'
  },
  {
    titulo: 'Especial Mayoreo',
    subtitulo: 'Para tu negocio',
    descripcion:
      'Consulta promociones especiales en presentaciones por caja, paquete y mayoreo.',
    icono: '📦',
    clase: 'promo-roja'
  },
  {
    titulo: 'Ofertas de temporada',
    subtitulo: 'Por tiempo limitado',
    descripcion:
      'Mantente pendiente de nuestras promociones y campañas especiales.',
    icono: '✨',
    clase: 'promo-amarilla'
  }
]

let intervalo

const siguiente = () => {
  promocionActiva.value =
    (promocionActiva.value + 1) % promocionesDestacadas.length
}

const anterior = () => {
  promocionActiva.value =
    (promocionActiva.value - 1 + promocionesDestacadas.length) %
    promocionesDestacadas.length
}

onMounted(() => {
  intervalo = setInterval(siguiente, 5000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>


<template>
  <main class="pagina-promociones">

    <!-- ===================================================
         HERO
    ==================================================== -->

    <section class="promo-hero">

      <!-- FORMAS ANIMADAS -->
      <div class="forma forma-1"></div>
      <div class="forma forma-2"></div>
      <div class="forma forma-3"></div>

      <div class="hero-contenido">

        <div class="hero-texto">

          <div class="hero-mini-etiqueta">

            <span class="pulso"></span>

            PROMOCIONES MEGA-MEX

          </div>

          <h1>
            Siempre hay algo
            <span>especial para ti.</span>
          </h1>

          <p>
            Descubre promociones, campañas especiales
            y novedades que Mega-Mex tiene para sus clientes.
          </p>


          <div class="hero-acciones">

            <a
              href="#destacadas"
              class="boton-principal"
            >
              Explorar promociones

              <span>↓</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100064149665664"
              target="_blank"
              rel="noopener noreferrer"
              class="boton-facebook"
            >

              <span class="facebook-f">
                f
              </span>

              Facebook

            </a>

          </div>

        </div>



        <!-- VISUAL HERO -->

        <div class="hero-visual">

          <div class="circulo-exterior">

            <div class="circulo-medio">

              <div class="ticket-principal">

                <span class="ticket-mini">
                  MEGA-MEX
                </span>

                <div class="ticket-icono">
                  🏷️
                </div>

                <strong>
                  PROMO
                </strong>

              </div>

            </div>


            <div class="icono-flotante icono-a">
              ⭐
            </div>

            <div class="icono-flotante icono-b">
              🛒
            </div>

            <div class="icono-flotante icono-c">
              📦
            </div>

          </div>

        </div>

      </div>

    </section>



    <!-- ===================================================
         CINTA ANIMADA
    ==================================================== -->

    <div class="cinta-promociones">

      <div class="cinta-contenido">

        <span>✦ PROMOCIONES</span>
        <span>✦ MEGA-MEX</span>
        <span>✦ MAYOREO</span>
        <span>✦ MENUDEO</span>
        <span>✦ NOVEDADES</span>
        <span>✦ PROMOCIONES</span>
        <span>✦ MEGA-MEX</span>
        <span>✦ MAYOREO</span>
        <span>✦ MENUDEO</span>
        <span>✦ NOVEDADES</span>

      </div>

    </div>



    <!-- ===================================================
         PROMOCIÓN DESTACADA / CARRUSEL
    ==================================================== -->

    <section
      id="destacadas"
      class="seccion-destacada"
    >

      <div class="encabezado-seccion">

        <div>

          <span class="super-titulo">
            DESTACADOS
          </span>

          <h2>
            Promociones que no
            querrás perderte
          </h2>

        </div>

        <p>
          Mantente pendiente de nuestras promociones
          y consulta disponibilidad directamente con Mega-Mex.
        </p>

      </div>



      <!-- CARRUSEL -->

      <div class="carrusel">

        <Transition
          name="cambio-promo"
          mode="out-in"
        >

          <article
            :key="promocionActiva"
            class="promo-destacada"
            :class="
              promocionesDestacadas[promocionActiva].clase
            "
          >

            <div class="destacada-texto">

              <span class="destacada-numero">
                0{{ promocionActiva + 1 }}
              </span>

              <span class="destacada-subtitulo">
                {{
                  promocionesDestacadas[promocionActiva].subtitulo
                }}
              </span>

              <h3>
                {{
                  promocionesDestacadas[promocionActiva].titulo
                }}
              </h3>

              <p>
                {{
                  promocionesDestacadas[promocionActiva].descripcion
                }}
              </p>


              <RouterLink
                to="/contacto"
                class="destacada-enlace"
              >

                Solicitar información

                <span>
                  →
                </span>

              </RouterLink>

            </div>


            <div class="destacada-visual">

              <div class="destacada-circulo">

                <span>
                  {{
                    promocionesDestacadas[promocionActiva].icono
                  }}
                </span>

              </div>

              <div class="brillo"></div>

            </div>

          </article>

        </Transition>


        <!-- CONTROLES -->

        <div class="controles">

          <button
            @click="anterior"
            aria-label="Promoción anterior"
          >
            ←
          </button>


          <div class="puntos">

            <button
              v-for="(promo, index) in promocionesDestacadas"
              :key="index"
              :class="{ activo: promocionActiva === index }"
              @click="promocionActiva = index"
            ></button>

          </div>


          <button
            @click="siguiente"
            aria-label="Siguiente promoción"
          >
            →
          </button>

        </div>

      </div>

    </section>



    <!-- ===================================================
         MOSAICO
    ==================================================== -->

    <section class="mosaico-seccion">

      <div class="titulo-centro">

        <span>
          DESCUBRE MÁS
        </span>

        <h2>
          Promociones para cada ocasión
        </h2>

        <p>
          Mega-Mex cuenta con promociones para compras
          de menudeo, mayoreo y temporadas especiales.
        </p>

      </div>


      <div class="mosaico">

        <!-- CARD GRANDE -->

        <article class="mosaico-card grande card-mayoreo">

          <div class="mosaico-icono">
            📦
          </div>

          <div class="mosaico-texto">

            <span>
              MAYOREO
            </span>

            <h3>
              Promociones para tu negocio
            </h3>

            <p>
              Consulta ofertas especiales en productos
              por caja, paquete y mayoreo.
            </p>

            <RouterLink to="/contacto">
              Más información →
            </RouterLink>

          </div>

        </article>



        <!-- CARD -->

        <article class="mosaico-card card-menudeo">

          <div class="mini-icono">
            🛍️
          </div>

          <span>
            MENUDEO
          </span>

          <h3>
            Compra para tu hogar
          </h3>

          <p>
            Encuentra promociones
            en productos seleccionados.
          </p>

        </article>



        <!-- CARD -->

        <article class="mosaico-card card-temporada">

          <div class="mini-icono">
            ✨
          </div>

          <span>
            TEMPORADA
          </span>

          <h3>
            Promociones especiales
          </h3>

          <p>
            Conoce nuestras campañas
            durante fechas especiales.
          </p>

        </article>



        <!-- CARD HORIZONTAL -->

        <article class="mosaico-card horizontal card-facebook">

          <div>

            <span>
              SÍGUENOS
            </span>

            <h3>
              Entérate primero en Facebook
            </h3>

            <p>
              Consulta publicaciones, promociones
              y novedades de Mega-Mex.
            </p>

          </div>


          <a
            href="https://www.facebook.com/profile.php?id=100064149665664"
            target="_blank"
            rel="noopener noreferrer"
            class="ir-facebook"
          >

            <span class="facebook-logo">
              f
            </span>

            Visitar Facebook

            <strong>
              ↗
            </strong>

          </a>

        </article>

      </div>

    </section>



    <!-- ===================================================
         AVISO
    ==================================================== -->

    <section class="aviso-promos">

      <div class="aviso-icono">
        !
      </div>

      <div>

        <span>
          IMPORTANTE
        </span>

        <h3>
          Consulta vigencia y disponibilidad
        </h3>

        <p>
          Las promociones mostradas en el sitio pueden
          cambiar según disponibilidad, sucursal o periodo
          de vigencia.
        </p>

      </div>

    </section>



    <!-- ===================================================
         CTA FINAL
    ==================================================== -->

    <section class="cta-final">

      <div class="cta-decoracion uno"></div>
      <div class="cta-decoracion dos"></div>

      <div class="cta-contenido">

        <span>
          ¿TIENES ALGUNA DUDA?
        </span>

        <h2>
          Pregunta por nuestras promociones
        </h2>

        <p>
          Comunícate con Mega-Mex y solicita información
          sobre productos y promociones disponibles.
        </p>

        <RouterLink
          to="/contacto"
          class="cta-boton"
        >
          Contactar con Mega-Mex
          <span>→</span>
        </RouterLink>

      </div>

    </section>

  </main>
</template>



<style scoped>

/* ==================================================
   CONFIGURACIÓN
================================================== */

.pagina-promociones {

  --azul: #006BC5;
  --azul-claro: #319CF4;
  --amarillo: #FFB932;
  --rojo: #E02B52;

  --oscuro: #102e4c;
  --gris: #66788a;

  min-height: 100vh;

  overflow: hidden;

  background:
    #f8fbff;
}


/* ==================================================
   HERO
================================================== */

.promo-hero {

  position: relative;

  min-height: 680px;

  padding:
    100px 25px;

  display: flex;

  align-items: center;

  overflow: hidden;

  background:
    linear-gradient(
      120deg,
      #062d52 0%,
      #006BC5 48%,
      #319CF4 100%
    );
}


.hero-contenido {

  position: relative;

  z-index: 5;

  width: 100%;

  max-width: 1200px;

  margin: auto;

  display: grid;

  grid-template-columns:
    1.15fr .85fr;

  align-items: center;

  gap: 70px;

}


/* FORMAS FONDO */

.forma {

  position: absolute;

  border-radius: 50%;

  filter: blur(2px);

}


.forma-1 {

  width: 450px;
  height: 450px;

  top: -250px;
  left: -150px;

  background:
    rgba(255,255,255,.07);

  animation:
    moverForma 9s
    ease-in-out infinite;

}


.forma-2 {

  width: 260px;
  height: 260px;

  right: 5%;
  bottom: -130px;

  background:
    rgba(255,185,50,.16);

  animation:
    moverForma 7s
    ease-in-out infinite reverse;

}


.forma-3 {

  width: 130px;
  height: 130px;

  left: 45%;
  top: 20%;

  background:
    rgba(224,43,82,.20);

  animation:
    moverForma 6s
    ease-in-out infinite;

}


@keyframes moverForma {

  0%,
  100% {

    transform:
      translate(0, 0)
      scale(1);

  }

  50% {

    transform:
      translate(25px, -20px)
      scale(1.08);

  }

}



/* HERO TEXTO */

.hero-mini-etiqueta {

  width: fit-content;

  padding:
    9px 16px;

  display: flex;

  align-items: center;

  gap: 9px;

  border:
    1px solid
    rgba(255,255,255,.18);

  border-radius:
    50px;

  color: white;

  background:
    rgba(255,255,255,.10);

  backdrop-filter:
    blur(10px);

  font-size:
    11px;

  font-weight:
    900;

  letter-spacing:
    1.8px;

}


.pulso {

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background:
    var(--amarillo);

  box-shadow:
    0 0 0
    rgba(255,185,50,.5);

  animation:
    pulso 1.8s
    infinite;

}


@keyframes pulso {

  0% {

    box-shadow:
      0 0 0 0
      rgba(255,185,50,.6);

  }

  70% {

    box-shadow:
      0 0 0 10px
      rgba(255,185,50,0);

  }

  100% {

    box-shadow:
      0 0 0 0
      rgba(255,185,50,0);

  }

}


.hero-texto h1 {

  max-width: 720px;

  margin:
    25px 0 20px;

  color: white;

  font-size:
    clamp(48px, 6vw, 78px);

  line-height:
    .98;

  letter-spacing:
    -3px;

}


.hero-texto h1 span {

  display: block;

  margin-top: 10px;

  color:
    var(--amarillo);

}


.hero-texto p {

  max-width:
    650px;

  color:
    rgba(255,255,255,.84);

  font-size:
    18px;

  line-height:
    1.7;

}


.hero-acciones {

  margin-top:
    35px;

  display: flex;

  flex-wrap: wrap;

  gap: 14px;

}


.boton-principal,
.boton-facebook {

  min-height: 52px;

  padding:
    0 22px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 17px;

  border-radius:
    13px;

  text-decoration: none;

  font-weight:
    900;

  transition:
    .3s;

}


.boton-principal {

  background:
    white;

  color:
    var(--azul);

}


.boton-facebook {

  border:
    1px solid
    rgba(255,255,255,.25);

  background:
    rgba(255,255,255,.10);

  color:
    white;

  backdrop-filter:
    blur(10px);

}


.boton-principal:hover,
.boton-facebook:hover {

  transform:
    translateY(-4px);

}


.facebook-f {

  width: 28px;
  height: 28px;

  display: grid;

  place-items: center;

  border-radius:
    8px;

  background:
    #1877F2;

  color: white;

  font-family:
    Arial;

  font-size:
    21px;

}



/* ==================================================
   HERO VISUAL
================================================== */

.hero-visual {

  display: flex;

  align-items: center;

  justify-content: center;

}


.circulo-exterior {

  position: relative;

  width: 410px;
  height: 410px;

  display: grid;

  place-items: center;

  border:
    1px solid
    rgba(255,255,255,.17);

  border-radius:
    50%;

  animation:
    girarCirculo
    20s linear infinite;

}


@keyframes girarCirculo {

  to {

    transform:
      rotate(360deg);

  }

}


.circulo-medio {

  width: 305px;
  height: 305px;

  display: grid;

  place-items: center;

  border-radius:
    50%;

  background:
    rgba(255,255,255,.07);

  backdrop-filter:
    blur(10px);

}


.ticket-principal {

  width: 220px;
  height: 255px;

  padding: 25px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  border-radius:
    30px;

  background:
    white;

  color:
    var(--azul);

  box-shadow:
    0 35px 80px
    rgba(0,0,0,.20);

  transform:
    rotate(-8deg);

  animation:
    ticketFlota
    4s ease-in-out infinite;

}


@keyframes ticketFlota {

  0%,
  100% {

    transform:
      rotate(-8deg)
      translateY(0);

  }

  50% {

    transform:
      rotate(-4deg)
      translateY(-14px);

  }

}


.ticket-mini {

  font-size:
    10px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.ticket-icono {

  margin:
    13px 0;

  font-size:
    90px;

}


.ticket-principal strong {

  color:
    var(--rojo);

  font-size:
    28px;

  letter-spacing:
    3px;

}


.icono-flotante {

  position: absolute;

  width: 66px;
  height: 66px;

  display: grid;

  place-items: center;

  border-radius:
    20px;

  background:
    white;

  font-size:
    31px;

  box-shadow:
    0 15px 35px
    rgba(0,0,0,.15);

  animation:
    contraGiro
    20s linear infinite;

}


@keyframes contraGiro {

  to {

    transform:
      rotate(-360deg);

  }

}


.icono-a {

  top: -15px;
  left: 50%;

}


.icono-b {

  bottom: 25px;
  left: 0;

}


.icono-c {

  right: -12px;
  top: 55%;

}



/* ==================================================
   CINTA
================================================== */

.cinta-promociones {

  overflow: hidden;

  padding:
    14px 0;

  background:
    var(--amarillo);

  color:
    var(--oscuro);

  transform:
    rotate(-1deg)
    scale(1.02);

}


.cinta-contenido {

  width:
    max-content;

  display: flex;

  gap: 55px;

  font-size:
    13px;

  font-weight:
    900;

  letter-spacing:
    2px;

  animation:
    cintaMover
    22s linear infinite;

}


@keyframes cintaMover {

  from {

    transform:
      translateX(0);

  }

  to {

    transform:
      translateX(-50%);

  }

}



/* ==================================================
   DESTACADAS
================================================== */

.seccion-destacada {

  max-width:
    1200px;

  margin: auto;

  padding:
    110px 20px;

}


.encabezado-seccion {

  margin-bottom:
    40px;

  display: flex;

  align-items: end;

  justify-content:
    space-between;

  gap: 45px;

}


.encabezado-seccion > div {

  max-width:
    650px;

}


.super-titulo {

  color:
    var(--rojo);

  font-size:
    11px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.encabezado-seccion h2 {

  margin-top:
    10px;

  color:
    var(--oscuro);

  font-size:
    clamp(34px, 5vw, 53px);

  line-height:
    1.05;

}


.encabezado-seccion > p {

  max-width:
    400px;

  color:
    var(--gris);

  line-height:
    1.6;

}



/* CARRUSEL */

.carrusel {

  position: relative;

}


.promo-destacada {

  min-height:
    460px;

  padding:
    55px;

  display: grid;

  grid-template-columns:
    1.2fr .8fr;

  align-items: center;

  gap: 40px;

  overflow: hidden;

  border-radius:
    34px;

  color: white;

  box-shadow:
    0 30px 70px
    rgba(0,70,130,.15);

}


.promo-azul {

  background:
    linear-gradient(
      135deg,
      #004e94,
      #319CF4
    );

}


.promo-roja {

  background:
    linear-gradient(
      135deg,
      #9b1634,
      #E02B52
    );

}


.promo-amarilla {

  background:
    linear-gradient(
      135deg,
      #c57900,
      #FFB932
    );

}


.destacada-numero {

  display: block;

  color:
    rgba(255,255,255,.25);

  font-size:
    70px;

  font-weight:
    900;

  line-height:
    1;

}


.destacada-subtitulo {

  display: block;

  margin-top:
    12px;

  font-size:
    11px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.destacada-texto h3 {

  max-width:
    580px;

  margin:
    10px 0 15px;

  font-size:
    clamp(35px, 5vw, 55px);

  line-height:
    1;

}


.destacada-texto p {

  max-width:
    570px;

  color:
    rgba(255,255,255,.85);

  font-size:
    16px;

  line-height:
    1.7;

}


.destacada-enlace {

  width: fit-content;

  margin-top:
    28px;

  padding:
    14px 20px;

  display: flex;

  align-items: center;

  gap: 25px;

  border-radius:
    12px;

  background:
    white;

  color:
    var(--oscuro);

  text-decoration:
    none;

  font-weight:
    900;

}


.destacada-visual {

  position: relative;

  min-height:
    340px;

  display: grid;

  place-items: center;

}


.destacada-circulo {

  position: relative;

  z-index: 2;

  width: 260px;
  height: 260px;

  display: grid;

  place-items: center;

  border-radius:
    50%;

  background:
    rgba(255,255,255,.15);

  border:
    1px solid
    rgba(255,255,255,.2);

  backdrop-filter:
    blur(10px);

  animation:
    respirar
    3.5s ease-in-out infinite;

}


@keyframes respirar {

  0%,
  100% {

    transform:
      scale(1);

  }

  50% {

    transform:
      scale(1.06);

  }

}


.destacada-circulo span {

  font-size:
    130px;

}


.brillo {

  position: absolute;

  width: 160px;
  height: 450px;

  transform:
    rotate(35deg);

  background:
    linear-gradient(
      to right,
      transparent,
      rgba(255,255,255,.18),
      transparent
    );

  animation:
    brilloMover
    4s infinite;

}


@keyframes brilloMover {

  from {

    left:
      -200px;

  }

  to {

    left:
      120%;

  }

}



/* TRANSICIÓN VUE */

.cambio-promo-enter-active,
.cambio-promo-leave-active {

  transition:
    all .45s ease;

}


.cambio-promo-enter-from {

  opacity: 0;

  transform:
    translateX(50px);

}


.cambio-promo-leave-to {

  opacity: 0;

  transform:
    translateX(-50px);

}



/* CONTROLES */

.controles {

  margin-top:
    20px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 20px;

}


.controles > button {

  width: 45px;
  height: 45px;

  border: none;

  border-radius:
    50%;

  background:
    white;

  color:
    var(--azul);

  cursor:
    pointer;

  font-size:
    18px;

  box-shadow:
    0 8px 20px
    rgba(0,70,130,.10);

}


.puntos {

  display: flex;

  gap: 7px;

}


.puntos button {

  width: 9px;
  height: 9px;

  padding: 0;

  border: none;

  border-radius:
    50%;

  background:
    #c8d6e3;

  cursor:
    pointer;

  transition:
    .3s;

}


.puntos button.activo {

  width: 30px;

  border-radius:
    20px;

  background:
    var(--azul);

}



/* ==================================================
   MOSAICO
================================================== */

.mosaico-seccion {

  padding:
    95px 20px;

  background:
    #eef7ff;

}


.titulo-centro {

  max-width:
    700px;

  margin:
    0 auto 45px;

  text-align:
    center;

}


.titulo-centro > span {

  color:
    var(--azul);

  font-size:
    11px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.titulo-centro h2 {

  margin:
    10px 0;

  color:
    var(--oscuro);

  font-size:
    clamp(32px, 5vw, 48px);

}


.titulo-centro p {

  color:
    var(--gris);

  line-height:
    1.6;

}


.mosaico {

  max-width:
    1200px;

  margin: auto;

  display: grid;

  grid-template-columns:
    1.3fr .7fr;

  grid-template-rows:
    auto auto;

  gap: 20px;

}


.mosaico-card {

  position: relative;

  overflow: hidden;

  padding:
    30px;

  border-radius:
    26px;

  transition:
    .35s;

}


.mosaico-card:hover {

  transform:
    translateY(-7px);

  box-shadow:
    0 25px 50px
    rgba(0,60,110,.13);

}


.grande {

  grid-row:
    span 2;

  min-height:
    500px;

  display: flex;

  flex-direction: column;

  justify-content:
    space-between;

}


.card-mayoreo {

  color: white;

  background:
    linear-gradient(
      145deg,
      #005ba9,
      #319CF4
    );

}


.mosaico-icono {

  font-size:
    130px;

  transition:
    .4s;

}


.mosaico-card:hover
.mosaico-icono {

  transform:
    scale(1.08)
    rotate(-8deg);

}


.mosaico-texto span,
.mosaico-card > span {

  font-size:
    10px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.mosaico-texto h3 {

  max-width:
    500px;

  margin:
    10px 0;

  font-size:
    40px;

}


.mosaico-texto p {

  max-width:
    520px;

  margin-bottom:
    20px;

  color:
    rgba(255,255,255,.83);

  line-height:
    1.6;

}


.mosaico-texto a {

  color: white;

  text-decoration:
    none;

  font-weight:
    900;

}


.card-menudeo {

  color: white;

  background:
    linear-gradient(
      145deg,
      #bb1e42,
      #E02B52
    );

}


.card-temporada {

  color:
    var(--oscuro);

  background:
    linear-gradient(
      145deg,
      #ffd35d,
      #FFB932
    );

}


.mini-icono {

  margin-bottom:
    25px;

  font-size:
    55px;

}


.mosaico-card h3 {

  margin:
    8px 0;

  font-size:
    27px;

}


.mosaico-card p {

  line-height:
    1.5;

}


.horizontal {

  grid-column:
    1 / -1;

  min-height:
    190px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 30px;

}


.card-facebook {

  color: white;

  background:
    linear-gradient(
      120deg,
      #112e4a,
      #1877F2
    );

}


.card-facebook p {

  color:
    rgba(255,255,255,.8);

}


.ir-facebook {

  flex-shrink: 0;

  padding:
    13px 18px;

  display: flex;

  align-items: center;

  gap: 12px;

  border-radius:
    12px;

  background: white;

  color:
    #1877F2;

  text-decoration:
    none;

  font-weight:
    900;

}


.facebook-logo {

  width: 34px;
  height: 34px;

  display: grid;

  place-items: center;

  border-radius:
    8px;

  background:
    #1877F2;

  color: white;

  font-family:
    Arial;

  font-size:
    25px;

}



/* ==================================================
   AVISO
================================================== */

.aviso-promos {

  max-width:
    1000px;

  margin:
    80px auto;

  padding:
    28px;

  display: flex;

  align-items: center;

  gap: 22px;

  border:
    1px solid
    #dce9f3;

  border-radius:
    20px;

  background:
    white;

  box-shadow:
    0 15px 40px
    rgba(0,70,130,.06);

}


.aviso-icono {

  flex-shrink: 0;

  width: 55px;
  height: 55px;

  display: grid;

  place-items: center;

  border-radius:
    16px;

  background:
    #fff2cf;

  color:
    #d48b00;

  font-size:
    28px;

  font-weight:
    900;

}


.aviso-promos span {

  color:
    var(--rojo);

  font-size:
    9px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.aviso-promos h3 {

  margin:
    4px 0;

  color:
    var(--oscuro);

}


.aviso-promos p {

  color:
    var(--gris);

  line-height:
    1.6;

}



/* ==================================================
   CTA
================================================== */

.cta-final {

  position: relative;

  max-width:
    1160px;

  margin:
    0 auto 90px;

  padding:
    70px 30px;

  overflow: hidden;

  border-radius:
    32px;

  text-align:
    center;

  background:
    linear-gradient(
      135deg,
      #E02B52,
      #b51b3d
    );

  color: white;

}


.cta-contenido {

  position: relative;

  z-index: 3;

  max-width:
    700px;

  margin: auto;

}


.cta-contenido > span {

  font-size:
    10px;

  font-weight:
    900;

  letter-spacing:
    2px;

}


.cta-contenido h2 {

  margin:
    10px 0;

  font-size:
    clamp(32px, 5vw, 48px);

}


.cta-contenido p {

  color:
    rgba(255,255,255,.84);

  line-height:
    1.7;

}


.cta-boton {

  width:
    fit-content;

  margin:
    27px auto 0;

  padding:
    14px 22px;

  display: flex;

  align-items: center;

  gap: 20px;

  border-radius:
    12px;

  background:
    white;

  color:
    var(--rojo);

  text-decoration:
    none;

  font-weight:
    900;

  transition:
    .3s;

}


.cta-boton:hover {

  transform:
    translateY(-4px);

}


.cta-decoracion {

  position: absolute;

  border-radius:
    50%;

  background:
    rgba(255,255,255,.08);

}


.cta-decoracion.uno {

  width: 300px;
  height: 300px;

  top: -160px;
  left: -80px;

}


.cta-decoracion.dos {

  width: 250px;
  height: 250px;

  bottom: -150px;
  right: -50px;

}



/* ==================================================
   RESPONSIVE
================================================== */

@media(max-width: 900px) {

  .hero-contenido {

    grid-template-columns:
      1fr;

    text-align:
      center;

  }


  .hero-mini-etiqueta {

    margin:
      auto;

  }


  .hero-texto p {

    margin:
      auto;

  }


  .hero-acciones {

    justify-content:
      center;

  }


  .circulo-exterior {

    width: 330px;
    height: 330px;

  }


  .circulo-medio {

    width: 250px;
    height: 250px;

  }


  .ticket-principal {

    width: 180px;
    height: 210px;

  }


  .ticket-icono {

    font-size:
      70px;

  }


  .encabezado-seccion {

    flex-direction:
      column;

    align-items:
      flex-start;

  }


  .promo-destacada {

    grid-template-columns:
      1fr;

    text-align:
      center;

  }


  .destacada-enlace {

    margin-left:
      auto;

    margin-right:
      auto;

  }


  .mosaico {

    grid-template-columns:
      1fr;

  }


  .grande {

    grid-row:
      auto;

  }


  .horizontal {

    grid-column:
      auto;

    flex-direction:
      column;

    align-items:
      flex-start;

  }

}



@media(max-width: 600px) {

  .promo-hero {

    min-height:
      auto;

    padding:
      75px 20px;

  }


  .hero-texto h1 {

    letter-spacing:
      -1px;

  }


  .circulo-exterior {

    width: 270px;
    height: 270px;

  }


  .circulo-medio {

    width: 210px;
    height: 210px;

  }


  .ticket-principal {

    width: 150px;
    height: 180px;

  }


  .ticket-icono {

    font-size:
      55px;

  }


  .icono-flotante {

    width: 50px;
    height: 50px;

    font-size:
      24px;

  }


  .promo-destacada {

    padding:
      32px 23px;

  }


  .destacada-circulo {

    width: 200px;
    height: 200px;

  }


  .destacada-circulo span {

    font-size:
      95px;

  }


  .mosaico-card {

    padding:
      25px;

  }


  .mosaico-texto h3 {

    font-size:
      31px;

  }


  .aviso-promos {

    margin-left:
      20px;

    margin-right:
      20px;

    align-items:
      flex-start;

  }


  .cta-final {

    margin-left:
      20px;

    margin-right:
      20px;

  }

}

</style>
