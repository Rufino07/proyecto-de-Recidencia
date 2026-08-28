<script setup>
import { ref, computed } from 'vue'

const tipo = ref('menudeo')
const categoria = ref('Todos')
const busqueda = ref('')

const productos = [
  {
    id: 1,
    nombre: 'Arroz',
    categoria: 'Abarrotes',
    tipo: 'menudeo',
    icono: '🍚',
    descripcion: 'Diferentes marcas y presentaciones.'
  },
  {
    id: 2,
    nombre: 'Frijol',
    categoria: 'Abarrotes',
    tipo: 'menudeo',
    icono: '🫘',
    descripcion: 'Variedad para tus compras diarias.'
  },
  {
    id: 3,
    nombre: 'Leche',
    categoria: 'Lácteos',
    tipo: 'menudeo',
    icono: '🥛',
    descripcion: 'Diferentes marcas y presentaciones.'
  },
  {
    id: 4,
    nombre: 'Refrescos',
    categoria: 'Bebidas',
    tipo: 'menudeo',
    icono: '🥤',
    descripcion: 'Bebidas para diferentes ocasiones.'
  },
  {
    id: 5,
    nombre: 'Botanas',
    categoria: 'Botanas',
    tipo: 'menudeo',
    icono: '🍿',
    descripcion: 'Gran variedad de botanas.'
  },

  {
    id: 6,
    nombre: 'Abarrotes por caja',
    categoria: 'Abarrotes',
    tipo: 'mayoreo',
    icono: '📦',
    descripcion: 'Presentaciones especiales para negocio.'
  },
  {
    id: 7,
    nombre: 'Bebidas por caja',
    categoria: 'Bebidas',
    tipo: 'mayoreo',
    icono: '🥤',
    descripcion: 'Venta por caja y paquete.'
  },
  {
    id: 8,
    nombre: 'Lácteos por mayoreo',
    categoria: 'Lácteos',
    tipo: 'mayoreo',
    icono: '🥛',
    descripcion: 'Presentaciones para surtir tu negocio.'
  },
  {
    id: 9,
    nombre: 'Productos de limpieza',
    categoria: 'Limpieza',
    tipo: 'mayoreo',
    icono: '🧼',
    descripcion: 'Opciones para comercios y negocios.'
  }
]

const categorias = computed(() => {
  const lista = productos
    .filter(p => p.tipo === tipo.value)
    .map(p => p.categoria)

  return ['Todos', ...new Set(lista)]
})

const productosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase()

  return productos.filter(producto => {
    const coincideTipo = producto.tipo === tipo.value

    const coincideCategoria =
      categoria.value === 'Todos' ||
      producto.categoria === categoria.value

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto)

    return coincideTipo && coincideCategoria && coincideBusqueda
  })
})

const cambiarTipo = nuevoTipo => {
  tipo.value = nuevoTipo
  categoria.value = 'Todos'
}
</script>

<template>
  <main class="productos-page">

    <!-- HERO -->
    <section class="productos-hero">

      <div class="hero-contenido">

        <div class="hero-texto">

          <div class="mini-etiqueta">
            <span class="punto"></span>
            CATÁLOGO MEGA-MEX
          </div>

          <h1>
            Todo lo que buscas
            <span>en un solo lugar.</span>
          </h1>

          <p>
            Explora nuestra variedad de productos por mayoreo
            y menudeo para tu hogar o negocio.
          </p>

          <div class="hero-botones">

            <button
              class="hero-btn principal"
              @click="cambiarTipo('menudeo')"
            >
              🛍️ Ver menudeo
            </button>

            <button
              class="hero-btn secundario"
              @click="cambiarTipo('mayoreo')"
            >
              📦 Ver mayoreo
            </button>

          </div>

        </div>


        <!-- PARTE VISUAL -->
        <div class="hero-visual">

          <div class="hero-circulo">

            <div class="caja-central">
              📦
            </div>

            <div class="burbuja b1">🥤</div>
            <div class="burbuja b2">🥛</div>
            <div class="burbuja b3">🛒</div>
            <div class="burbuja b4">🍚</div>

          </div>

        </div>

      </div>

    </section>


    <!-- CONTENIDO -->
    <section class="catalogo">

      <div class="catalogo-contenido">


        <!-- TÍTULO -->
        <div class="catalogo-titulo">

          <span>NUESTRO CATÁLOGO</span>

          <h2>
            Encuentra lo que necesitas
          </h2>

          <p>
            Selecciona el tipo de compra y explora nuestras categorías.
          </p>

        </div>


        <!-- SELECTOR -->
        <div class="selector-compra">

          <button
            :class="['selector-card', { activo: tipo === 'menudeo' }]"
            @click="cambiarTipo('menudeo')"
          >

            <div class="selector-icono azul">
              🛍️
            </div>

            <div>
              <small>COMPRA INDIVIDUAL</small>
              <h3>Menudeo</h3>
              <p>Para tus compras del día a día.</p>
            </div>

            <div
              v-if="tipo === 'menudeo'"
              class="check"
            >
              ✓
            </div>

          </button>


          <button
            :class="['selector-card', { activo: tipo === 'mayoreo' }]"
            @click="cambiarTipo('mayoreo')"
          >

            <div class="selector-icono amarillo">
              📦
            </div>

            <div>
              <small>PARA TU NEGOCIO</small>
              <h3>Mayoreo</h3>
              <p>Presentaciones por caja y paquete.</p>
            </div>

            <div
              v-if="tipo === 'mayoreo'"
              class="check"
            >
              ✓
            </div>

          </button>

        </div>


        <!-- BARRA -->
        <div class="barra-catalogo">

          <div class="barra-titulo">

            <span>
              {{ tipo === 'menudeo'
                ? 'PRODUCTOS POR MENUDEO'
                : 'PRODUCTOS POR MAYOREO'
              }}
            </span>

            <h3>
              Explora nuestros productos
            </h3>

          </div>


          <div class="buscador">

            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9.5 3a6.5 6.5 0 1 0 3.98 11.64L19.85 21 21 19.85l-6.36-6.37A6.5 6.5 0 0 0 9.5 3m0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9"
              />
            </svg>

            <input
              v-model="busqueda"
              placeholder="Buscar producto..."
            />

          </div>

        </div>


        <!-- CATEGORÍAS -->
        <div class="categorias">

          <button
            v-for="item in categorias"
            :key="item"
            :class="{ activa: categoria === item }"
            @click="categoria = item"
          >
            {{ item }}
          </button>

        </div>


        <!-- PRODUCTOS -->
        <div class="grid-productos">

          <article
            v-for="producto in productosFiltrados"
            :key="producto.id"
            class="producto-card"
          >

            <div class="producto-foto">

              <div class="producto-badge">
                {{ producto.tipo }}
              </div>

              <div class="producto-emoji">
                {{ producto.icono }}
              </div>

              <div class="producto-overlay">
                Ver producto
              </div>

            </div>


            <div class="producto-info">

              <span>
                {{ producto.categoria }}
              </span>

              <h3>
                {{ producto.nombre }}
              </h3>

              <p>
                {{ producto.descripcion }}
              </p>

              <button class="ver-mas">
                Ver información

                <span>
                  →
                </span>
              </button>

            </div>

          </article>

        </div>


        <!-- SIN RESULTADOS -->
        <div
          v-if="productosFiltrados.length === 0"
          class="sin-resultados"
        >

          <div class="sin-icono">
            🔎
          </div>

          <h3>
            No encontramos resultados
          </h3>

          <p>
            Prueba con otro nombre o categoría.
          </p>

        </div>

      </div>

    </section>


    <!-- CTA -->
    <section class="productos-contacto">

      <div>

        <span>
          ¿NECESITAS INFORMACIÓN?
        </span>

        <h2>
          ¿Buscas algún producto en especial?
        </h2>

        <p>
          Comunícate con Mega-Mex y pregunta por disponibilidad.
        </p>

      </div>


      <RouterLink
        to="/contacto"
        class="btn-contacto"
      >
        Contactar

        <span>
          →
        </span>
      </RouterLink>

    </section>

  </main>
</template>


<style scoped>

.productos-page {
  --azul: #006BC5;
  --azul-claro: #319CF4;
  --amarillo: #FFB932;
  --rojo: #E02B52;
  --oscuro: #102f4d;
  --gris: #64748b;

  background: #f7fbff;

  min-height: 100vh;
}


/* =============================
   HERO
============================= */

.productos-hero {
  position: relative;

  overflow: hidden;

  padding: 90px 25px;

  background:
    radial-gradient(
      circle at 87% 22%,
      rgba(255,185,50,.28),
      transparent 27%
    ),
    linear-gradient(
      135deg,
      #005cae,
      var(--azul-claro)
    );
}


.productos-hero::before {
  content: "";

  position: absolute;

  width: 500px;
  height: 500px;

  top: -300px;
  left: -150px;

  border-radius: 50%;

  background:
    rgba(255,255,255,.07);
}


.hero-contenido {
  position: relative;

  z-index: 2;

  max-width: 1200px;

  margin: auto;

  display: grid;

  grid-template-columns:
    1.15fr .85fr;

  align-items: center;

  gap: 60px;
}


.mini-etiqueta {
  width: fit-content;

  padding: 9px 15px;

  display: flex;

  align-items: center;

  gap: 8px;

  border:
    1px solid rgba(255,255,255,.2);

  border-radius: 50px;

  background:
    rgba(255,255,255,.12);

  color: white;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.punto {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background:
    var(--amarillo);
}


.hero-texto h1 {
  max-width: 720px;

  margin: 22px 0;

  color: white;

  font-size:
    clamp(45px, 6vw, 72px);

  line-height: 1.03;

  letter-spacing: -2px;
}


.hero-texto h1 span {
  display: block;

  color:
    var(--amarillo);
}


.hero-texto > p {
  max-width: 620px;

  color:
    rgba(255,255,255,.88);

  font-size: 18px;

  line-height: 1.7;
}


.hero-botones {
  margin-top: 32px;

  display: flex;

  flex-wrap: wrap;

  gap: 13px;
}


.hero-btn {
  padding: 14px 22px;

  border: none;

  border-radius: 12px;

  cursor: pointer;

  font-weight: 800;

  font-size: 14px;

  transition: .25s;
}


.hero-btn:hover {
  transform:
    translateY(-3px);
}


.hero-btn.principal {
  background: white;

  color:
    var(--azul);
}


.hero-btn.secundario {
  border:
    1px solid rgba(255,255,255,.35);

  background:
    rgba(255,255,255,.12);

  color: white;
}


/* VISUAL */

.hero-visual {
  display: flex;

  justify-content: center;

  align-items: center;
}


.hero-circulo {
  position: relative;

  width: 350px;
  height: 350px;

  display: flex;

  align-items: center;

  justify-content: center;

  border:
    1px solid rgba(255,255,255,.2);

  border-radius: 50%;

  background:
    rgba(255,255,255,.09);

  backdrop-filter:
    blur(5px);
}


.caja-central {
  width: 200px;
  height: 200px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 35px;

  background: white;

  font-size: 100px;

  box-shadow:
    0 30px 70px
    rgba(0,0,0,.18);

  transform:
    rotate(-5deg);
}


.burbuja {
  position: absolute;

  width: 64px;
  height: 64px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 18px;

  background: white;

  font-size: 31px;

  box-shadow:
    0 14px 30px
    rgba(0,0,0,.13);

  animation:
    flotar 4s
    ease-in-out infinite;
}


.b1 {
  top: 20px;
  right: 25px;
}


.b2 {
  bottom: 15px;
  right: 25px;

  animation-delay: .6s;
}


.b3 {
  bottom: 30px;
  left: 10px;

  animation-delay: 1s;
}


.b4 {
  top: 35px;
  left: 10px;

  animation-delay: 1.4s;
}


@keyframes flotar {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

}


/* =============================
   CATÁLOGO
============================= */

.catalogo {
  padding:
    85px 20px;
}


.catalogo-contenido {
  max-width:
    1200px;

  margin: auto;
}


.catalogo-titulo {
  max-width: 680px;

  margin:
    auto auto 45px;

  text-align: center;
}


.catalogo-titulo > span {
  color:
    var(--azul);

  font-size: 11px;

  font-weight: 900;

  letter-spacing: 2px;
}


.catalogo-titulo h2 {
  margin: 10px 0;

  color:
    var(--oscuro);

  font-size:
    clamp(32px, 5vw, 47px);
}


.catalogo-titulo p {
  color:
    var(--gris);
}


/* SELECTOR */

.selector-compra {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;

  margin-bottom: 60px;
}


.selector-card {
  position: relative;

  padding: 27px;

  display: flex;

  align-items: center;

  gap: 20px;

  text-align: left;

  border:
    1px solid #dfe9f2;

  border-radius: 20px;

  background: white;

  cursor: pointer;

  font-family: inherit;

  transition:
    .25s;
}


.selector-card:hover {
  transform:
    translateY(-5px);

  border-color:
    rgba(0,107,197,.35);

  box-shadow:
    0 18px 40px
    rgba(0,107,197,.09);
}


.selector-card.activo {
  border:
    2px solid var(--azul);

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f2f9ff
    );

  box-shadow:
    0 18px 45px
    rgba(0,107,197,.12);
}


.selector-icono {
  flex-shrink: 0;

  width: 72px;
  height: 72px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 18px;

  font-size: 33px;
}


.selector-icono.azul {
  background: #e9f6ff;
}


.selector-icono.amarillo {
  background: #fff4d8;
}


.selector-card small {
  color:
    var(--azul);

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 1.5px;
}


.selector-card h3 {
  margin: 4px 0;

  color:
    var(--oscuro);

  font-size: 25px;
}


.selector-card p {
  color:
    var(--gris);

  font-size: 13px;
}


.check {
  position: absolute;

  top: 15px;
  right: 15px;

  width: 27px;
  height: 27px;

  display: grid;

  place-items: center;

  border-radius: 50%;

  background:
    var(--azul);

  color: white;

  font-weight: bold;
}


/* BARRA */

.barra-catalogo {
  margin-bottom:
    23px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 25px;
}


.barra-titulo > span {
  color:
    var(--azul);

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 1.5px;
}


.barra-titulo h3 {
  margin-top: 5px;

  color:
    var(--oscuro);

  font-size: 26px;
}


.buscador {
  width: 350px;
  height: 52px;

  padding: 0 16px;

  display: flex;

  align-items: center;

  gap: 10px;

  border:
    1px solid #dce6ef;

  border-radius: 13px;

  background: white;

  transition: .2s;
}


.buscador:focus-within {
  border-color:
    var(--azul);

  box-shadow:
    0 0 0 4px
    rgba(0,107,197,.07);
}


.buscador svg {
  width: 20px;
  height: 20px;

  color:
    var(--azul);
}


.buscador input {
  width: 100%;

  border: none;

  outline: none;

  background: transparent;

  font-size: 14px;
}


/* CATEGORÍAS */

.categorias {
  margin-bottom: 30px;

  display: flex;

  flex-wrap: wrap;

  gap: 9px;
}


.categorias button {
  padding: 9px 16px;

  border:
    1px solid #dce7f0;

  border-radius: 50px;

  background: white;

  color:
    #536579;

  cursor: pointer;

  font-weight: 700;

  font-size: 12px;

  transition: .2s;
}


.categorias button:hover {
  border-color:
    var(--azul);

  color:
    var(--azul);
}


.categorias button.activa {
  border-color:
    var(--azul);

  background:
    var(--azul);

  color: white;
}


/* PRODUCTOS */

.grid-productos {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;
}


.producto-card {
  overflow: hidden;

  border:
    1px solid #e3ebf2;

  border-radius: 20px;

  background: white;

  transition:
    .3s;
}


.producto-card:hover {
  transform:
    translateY(-7px);

  box-shadow:
    0 22px 45px
    rgba(0,78,145,.11);
}


.producto-foto {
  position: relative;

  height: 200px;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      #edf8ff,
      #ffffff
    );
}


.producto-badge {
  position: absolute;

  top: 14px;
  left: 14px;

  padding: 6px 10px;

  border-radius: 50px;

  background:
    rgba(255,255,255,.9);

  color:
    var(--azul);

  font-size: 9px;

  font-weight: 900;

  text-transform: uppercase;

  box-shadow:
    0 5px 15px rgba(0,0,0,.05);
}


.producto-emoji {
  font-size: 78px;

  transition: .3s;
}


.producto-card:hover
.producto-emoji {
  transform:
    scale(1.12);
}


.producto-overlay {
  position: absolute;

  left: 50%;
  bottom: -45px;

  transform:
    translateX(-50%);

  padding: 8px 14px;

  border-radius: 50px;

  background:
    var(--azul);

  color: white;

  font-size: 11px;

  font-weight: 800;

  transition: .3s;
}


.producto-card:hover
.producto-overlay {
  bottom: 15px;
}


.producto-info {
  padding: 22px;
}


.producto-info > span {
  color:
    var(--azul);

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 1px;

  text-transform: uppercase;
}


.producto-info h3 {
  margin: 7px 0;

  color:
    var(--oscuro);

  font-size: 20px;
}


.producto-info p {
  min-height: 42px;

  color:
    var(--gris);

  font-size: 13px;

  line-height: 1.5;
}


.ver-mas {
  width: 100%;

  margin-top: 16px;

  padding-top: 14px;

  display: flex;

  justify-content:
    space-between;

  border: none;

  border-top:
    1px solid #e7edf3;

  background: transparent;

  color:
    var(--azul);

  cursor: pointer;

  font-weight: 800;
}


/* SIN RESULTADOS */

.sin-resultados {
  padding: 70px;

  text-align: center;
}


.sin-icono {
  font-size: 55px;
}


.sin-resultados h3 {
  margin: 14px 0 5px;

  color:
    var(--oscuro);
}


.sin-resultados p {
  color:
    var(--gris);
}


/* =============================
   CONTACTO
============================= */

.productos-contacto {
  max-width: 1160px;

  margin:
    0 auto 85px;

  padding: 42px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 30px;

  border-radius: 25px;

  background:
    linear-gradient(
      135deg,
      #005dac,
      var(--azul-claro)
    );

  color: white;

  box-shadow:
    0 25px 55px
    rgba(0,107,197,.18);
}


.productos-contacto > div > span {
  font-size: 10px;

  font-weight: 900;

  letter-spacing: 2px;
}


.productos-contacto h2 {
  margin: 7px 0;

  color: white;

  font-size: 30px;
}


.productos-contacto p {
  color:
    rgba(255,255,255,.85);
}


.btn-contacto {
  flex-shrink: 0;

  padding: 14px 23px;

  display: flex;

  align-items: center;

  gap: 18px;

  border-radius: 11px;

  background: white;

  color:
    var(--azul);

  text-decoration: none;

  font-weight: 900;

  transition: .25s;
}


.btn-contacto:hover {
  transform:
    translateY(-3px);
}


/* =============================
   RESPONSIVE
============================= */

@media(max-width: 1000px) {

  .grid-productos {
    grid-template-columns:
      repeat(2,1fr);
  }

}


@media(max-width: 820px) {

  .hero-contenido {
    grid-template-columns:
      1fr;

    text-align: center;
  }


  .mini-etiqueta {
    margin: auto;
  }


  .hero-texto > p {
    margin: auto;
  }


  .hero-botones {
    justify-content: center;
  }


  .hero-circulo {
    width: 300px;
    height: 300px;
  }


  .selector-compra {
    grid-template-columns: 1fr;
  }


  .barra-catalogo {
    flex-direction: column;

    align-items: stretch;
  }


  .buscador {
    width: 100%;
  }


  .productos-contacto {
    margin-left: 20px;
    margin-right: 20px;

    flex-direction: column;

    text-align: center;
  }

}


@media(max-width: 550px) {

  .grid-productos {
    grid-template-columns:
      1fr;
  }


  .selector-card {
    align-items:
      flex-start;
  }


  .hero-circulo {
    width: 250px;
    height: 250px;
  }


  .caja-central {
    width: 155px;
    height: 155px;

    font-size: 78px;
  }


  .burbuja {
    width: 52px;
    height: 52px;

    font-size: 25px;
  }

}

</style>