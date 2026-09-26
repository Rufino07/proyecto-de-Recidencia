<script setup>
import { ref, computed, onMounted } from 'vue'

const tipo = ref('menudeo')
const categoria = ref('Todos')
const busqueda = ref('')

const productos = ref([])
const cargando = ref(true)
const error = ref('')

// Modal
const productoSeleccionado = ref(null)

// URL del backend
const API_URL = 'http://localhost:3000/api'


// ============================================
// CARGAR PRODUCTOS DEL BACKEND
// ============================================

const cargarProductos = async () => {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await fetch(`${API_URL}/productos`)
    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al cargar productos')
    }

    productos.value = datos.productos
      .filter(p => p.activo)
      .map(p => {
        const tipoBackend = (p.tipo || '').toLowerCase()

        let tipoFiltro = tipoBackend
        if (tipoBackend === 'mayoreo y menudeo') {
          tipoFiltro = 'ambos'
        }

        return {
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria || 'General',
          tipo: tipoFiltro,
          tipoOriginal: p.tipo,
          descripcion: p.descripcion || 'Sin descripción',
          icono: '📦',
          imagen: p.imagen || null,
          activo: p.activo
        }
      })

  } catch (err) {
    console.error('Error cargando productos:', err)
    error.value = 'No se pudieron cargar los productos.'
  } finally {
    cargando.value = false
  }
}


// ============================================
// CATEGORÍAS DINÁMICAS
// ============================================

const categorias = computed(() => {
  const lista = productos.value
    .filter(p => p.tipo === tipo.value || p.tipo === 'ambos')
    .map(p => p.categoria)

  return ['Todos', ...new Set(lista)]
})


// ============================================
// FILTRAR PRODUCTOS
// ============================================

const productosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase()

  return productos.value.filter(producto => {
    const coincideTipo =
      producto.tipo === tipo.value ||
      producto.tipo === 'ambos'

    const coincideCategoria =
      categoria.value === 'Todos' ||
      producto.categoria === categoria.value

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto) ||
      producto.descripcion.toLowerCase().includes(texto)

    return coincideTipo && coincideCategoria && coincideBusqueda
  })
})


// ============================================
// CAMBIAR TIPO
// ============================================

const cambiarTipo = nuevoTipo => {
  tipo.value = nuevoTipo
  categoria.value = 'Todos'
}


// ============================================
// MODAL: ABRIR / CERRAR
// ============================================

const abrirModal = (producto) => {
  productoSeleccionado.value = producto
  document.body.style.overflow = 'hidden'  // bloquear scroll del fondo
}

const cerrarModal = () => {
  productoSeleccionado.value = null
  document.body.style.overflow = ''  // reactivar scroll
}


// ============================================
// AL MONTAR
// ============================================

onMounted(() => {
  cargarProductos()
})
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


        <div class="hero-visual">

          <div class="hero-circulo">

            <img
              src="/productos.png"
              alt="Productos de Mega-Mex"
            />

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


        <!-- CARGANDO -->
        <div
          v-if="cargando"
          class="sin-resultados"
        >
          <div class="sin-icono">
            ⏳
          </div>

          <h3>
            Cargando productos...
          </h3>

          <p>
            Obteniendo el catálogo desde el servidor.
          </p>

        </div>


        <!-- ERROR -->
        <div
          v-else-if="error"
          class="sin-resultados"
        >
          <div class="sin-icono">
            ⚠️
          </div>

          <h3>
            {{ error }}
          </h3>

          <p>
            Intenta recargar la página.
          </p>

        </div>


        <!-- PRODUCTOS -->
        <div
          v-else
          class="grid-productos"
        >

          <article
            v-for="producto in productosFiltrados"
            :key="producto.id"
            class="producto-card"
          >

            <div class="producto-foto">

              <div class="producto-badge">
                {{ producto.tipoOriginal || producto.tipo }}
              </div>

              <img
                v-if="producto.imagen"
                :src="producto.imagen"
                :alt="producto.nombre"
                class="producto-imagen"
              >

              <div
                v-else
                class="producto-emoji"
              >
                {{ producto.icono }}
              </div>

              <button
                class="producto-overlay"
                @click="abrirModal(producto)"
              >
                Ver producto
              </button>

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

              <button
                class="ver-mas"
                @click="abrirModal(producto)"
              >
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
          v-if="!cargando && !error && productosFiltrados.length === 0"
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


    <!-- ============================================= -->
    <!-- MODAL DE PRODUCTO -->
    <!-- ============================================= -->

    <Transition name="modal-fade">

      <div
        v-if="productoSeleccionado"
        class="modal-producto-fondo"
        @click.self="cerrarModal"
      >

        <div class="modal-producto">

          <!-- BOTÓN CERRAR -->

          <button
            class="modal-producto-cerrar"
            @click="cerrarModal"
            aria-label="Cerrar"
          >
            ✕
          </button>


          <!-- IMAGEN / EMOJI -->

          <div class="modal-producto-imagen">

            <img
              v-if="productoSeleccionado.imagen"
              :src="productoSeleccionado.imagen"
              :alt="productoSeleccionado.nombre"
            >

            <div
              v-else
              class="modal-producto-emoji"
            >
              {{ productoSeleccionado.icono }}
            </div>


            <div class="modal-producto-badge">
              {{ productoSeleccionado.tipoOriginal || productoSeleccionado.tipo }}
            </div>

          </div>


          <!-- INFORMACIÓN -->

          <div class="modal-producto-info">

            <span class="modal-producto-categoria">
              {{ productoSeleccionado.categoria }}
            </span>

            <h2>
              {{ productoSeleccionado.nombre }}
            </h2>

            <p class="modal-producto-descripcion">
              {{ productoSeleccionado.descripcion }}
            </p>


            <div class="modal-producto-detalles">

              <div class="detalle-item">

                <span class="detalle-icono">
                  🏷️
                </span>

                <div>

                  <strong>
                    Categoría
                  </strong>

                  <span>
                    {{ productoSeleccionado.categoria }}
                  </span>

                </div>

              </div>


              <div class="detalle-item">

                <span class="detalle-icono">
                  📦
                </span>

                <div>

                  <strong>
                    Tipo de venta
                  </strong>

                  <span>
                    {{ productoSeleccionado.tipoOriginal || productoSeleccionado.tipo }}
                  </span>

                </div>

              </div>

            </div>


            <div class="modal-producto-acciones">

              <button
                class="modal-btn-secundario"
                @click="cerrarModal"
              >
                Cerrar
              </button>

              <RouterLink
                to="/contacto"
                class="modal-btn-principal"
                @click="cerrarModal"
              >
                Consultar disponibilidad

                <span>→</span>
              </RouterLink>

            </div>

          </div>

        </div>

      </div>

    </Transition>

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


.producto-imagen {
  width: 100%;
  height: 100%;

  padding: 15px;

  object-fit: contain;

  transition: .3s;
}


.producto-card:hover
.producto-imagen {
  transform:
    scale(1.08);
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

  z-index: 2;
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

  border: none;

  cursor: pointer;

  transition: .3s;

  z-index: 2;
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
   MODAL PRODUCTO
============================= */

.modal-producto-fondo {
  position: fixed;

  inset: 0;

  z-index: 9999;

  padding: 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    rgba(10, 25, 45, 0.75);

  backdrop-filter:
    blur(6px);

  overflow-y: auto;
}


.modal-producto {
  position: relative;

  width: 100%;

  max-width: 900px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  border-radius: 24px;

  background: white;

  box-shadow:
    0 30px 80px
    rgba(0, 0, 0, 0.3);

  overflow: hidden;

  max-height: 90vh;
}


.modal-producto-cerrar {
  position: absolute;

  top: 15px;
  right: 15px;

  z-index: 3;

  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.95);

  color: #333;

  cursor: pointer;

  font-size: 18px;

  font-weight: bold;

  box-shadow:
    0 5px 15px rgba(0,0,0,.15);

  transition: .25s;
}


.modal-producto-cerrar:hover {
  background: #e53935;

  color: white;

  transform:
    rotate(90deg);
}


/* IMAGEN */

.modal-producto-imagen {
  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px;

  background:
    linear-gradient(
      145deg,
      #eef8ff,
      #ffffff
    );

  min-height: 400px;
}


.modal-producto-imagen img {
  width: 100%;
  height: 100%;

  max-height: 350px;

  object-fit: contain;
}


.modal-producto-emoji {
  font-size: 150px;

  line-height: 1;
}


.modal-producto-badge {
  position: absolute;

  top: 20px;
  left: 20px;

  padding: 8px 14px;

  border-radius: 50px;

  background:
    var(--azul);

  color: white;

  font-size: 11px;

  font-weight: 900;

  text-transform: uppercase;

  letter-spacing: 1px;
}


/* INFORMACIÓN */

.modal-producto-info {
  padding: 45px 40px 40px;

  display: flex;

  flex-direction: column;

  overflow-y: auto;
}


.modal-producto-categoria {
  color:
    var(--azul);

  font-size: 12px;

  font-weight: 900;

  letter-spacing: 1.5px;

  text-transform: uppercase;
}


.modal-producto-info h2 {
  margin: 10px 0 15px;

  color:
    var(--oscuro);

  font-size:
    clamp(26px, 3vw, 34px);

  line-height: 1.15;
}


.modal-producto-descripcion {
  margin: 0 0 25px;

  color:
    var(--gris);

  font-size: 15px;

  line-height: 1.7;
}


.modal-producto-detalles {
  margin-bottom: 30px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;
}


.detalle-item {
  padding: 14px;

  display: flex;

  align-items: center;

  gap: 12px;

  border-radius: 12px;

  background:
    #f5f9fd;
}


.detalle-icono {
  font-size: 24px;
}


.detalle-item strong {
  display: block;

  color:
    #7c8798;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 1px;

  text-transform: uppercase;
}


.detalle-item span {
  display: block;

  margin-top: 3px;

  color:
    var(--oscuro);

  font-size: 14px;

  font-weight: 700;
}


/* ACCIONES */

.modal-producto-acciones {
  margin-top: auto;

  padding-top: 25px;

  border-top:
    1px solid #e7edf3;

  display: flex;

  gap: 12px;
}


.modal-btn-secundario {
  flex-shrink: 0;

  padding: 14px 22px;

  border:
    1px solid #dce6ef;

  border-radius: 12px;

  background: white;

  color:
    var(--gris);

  cursor: pointer;

  font-weight: 800;

  font-size: 14px;

  transition: .25s;
}


.modal-btn-secundario:hover {
  border-color:
    #c0cbd6;
}


.modal-btn-principal {
  flex: 1;

  padding: 14px 22px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      var(--azul),
      var(--azul-claro)
    );

  color: white;

  text-decoration: none;

  font-weight: 800;

  font-size: 14px;

  transition: .25s;

  box-shadow:
    0 10px 24px
    rgba(0, 107, 197, 0.25);
}


.modal-btn-principal:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 15px 30px
    rgba(0, 107, 197, 0.35);
}


/* TRANSICIÓN MODAL */

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}


.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}


.modal-fade-enter-active .modal-producto,
.modal-fade-leave-active .modal-producto {
  transition: transform 0.35s
    cubic-bezier(0.34, 1.56, 0.64, 1);
}


.modal-fade-enter-from .modal-producto,
.modal-fade-leave-to .modal-producto {
  transform: scale(0.9);
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


  /* MODAL RESPONSIVE */

  .modal-producto {
    grid-template-columns: 1fr;

    max-height: 95vh;

    overflow-y: auto;
  }


  .modal-producto-imagen {
    min-height: 250px;

    padding: 25px;
  }


  .modal-producto-imagen img {
    max-height: 200px;
  }


  .modal-producto-emoji {
    font-size: 100px;
  }


  .modal-producto-info {
    padding: 30px 25px;
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


  .modal-producto-detalles {
    grid-template-columns: 1fr;
  }


  .modal-producto-acciones {
    flex-direction: column;
  }


  .modal-btn-principal,
  .modal-btn-secundario {
    width: 100%;

    justify-content: center;
  }

}

</style>