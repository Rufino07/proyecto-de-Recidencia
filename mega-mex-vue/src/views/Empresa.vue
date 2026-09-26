<template>
  <main class="empresa-pagina">
    <section class="empresa-portada">
      <div class="contenedor empresa-portada-grid">
        <div class="empresa-portada-contenido">
          <span class="empresa-etiqueta">INFORMACIÓN DE LA EMPRESA</span>

          <h1>
            Conoce quiénes somos
          </h1>

          <p>
            Mega-Mex es una empresa de abarrotes comprometida con ofrecer
            variedad, atención cercana y opciones para cada compra.
          </p>

          <div class="empresa-acento" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <figure class="empresa-foto-principal">
          <img
            :src="heroImage"
            alt="Fotografía de Mega-Mex"
          />
          <figcaption>Agrega aquí una foto de la empresa</figcaption>
        </figure>
      </div>
    </section>

    <section class="contenedor empresa-folleto">
      <div class="empresa-ficha">
        <span class="empresa-ficha-numero">01</span>
        <span class="empresa-ficha-etiqueta">NUESTRA EMPRESA</span>

        <h2>
          Información de Mega-Mex
        </h2>

        <p>
          Mega-Mex nace para atender las compras diarias de las familias y
          negocios de Heroica Ciudad de Tlaxiaco, Oaxaca, con una experiencia
          práctica, amable y confiable.
        </p>

        <p class="empresa-ficha-detalle">
          Nuestro objetivo es acercar productos de uso diario a la comunidad,
          brindando una experiencia de compra sencilla, ordenada y con el
          respaldo de un equipo dispuesto a servir.
        </p>

        <div class="empresa-datos">
          <div>
            <strong>Ubicación</strong>
            <span>Tlaxiaco, Oaxaca</span>
          </div>
          <div>
            <strong>Atención</strong>
            <span>Mayoreo y menudeo</span>
          </div>
        </div>
      </div>

      <div class="empresa-contenido">
        <div class="empresa-bloque">
          <span class="empresa-bloque-numero">02</span>
          <div>
            <h3>Misión</h3>
            <p>
              Facilitar el acceso a productos de abarrotes con una atención
              honesta, ágil y cercana para nuestra comunidad.
            </p>
          </div>
        </div>

        <div class="empresa-bloque">
          <span class="empresa-bloque-numero">03</span>
          <div>
            <h3>Visión</h3>
            <p>
              Ser una tienda de referencia en la región por la confianza de
              nuestros clientes y la calidad de nuestro servicio.
            </p>
          </div>
        </div>

        <div class="empresa-valores">
          <span class="empresa-ficha-etiqueta">04 · NUESTROS VALORES</span>

          <h3>
            Lo que nos define
          </h3>

          <div class="empresa-valores-lista">
            <article>
              <strong>Servicio al cliente</strong>
              <p>Atendemos con amabilidad y buscamos resolver cada necesidad.</p>
            </article>

            <article>
              <strong>Respeto</strong>
              <p>Valoramos a nuestros clientes, colaboradores y comunidad.</p>
            </article>

            <article>
              <strong>Búsqueda de excelencia</strong>
              <p>Mejoramos continuamente nuestros productos y nuestro servicio.</p>
            </article>

            <article>
              <strong>Transparencia</strong>
              <p>Trabajamos con claridad, honestidad y responsabilidad.</p>
            </article>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================= -->
    <!-- SUCURSALES -->
    <!-- ============================================= -->

    <section
      v-if="sucursales.length > 0"
      class="contenedor empresa-sucursales"
    >
      <div class="empresa-sucursales-encabezado">
        <span class="empresa-ficha-etiqueta">05 · NUESTRAS SUCURSALES</span>

        <h2>
          Encuéntranos cerca de ti
        </h2>

        <p>
          Visítanos en cualquiera de nuestras sucursales. Te esperamos con
          la mejor atención y variedad de productos.
        </p>
      </div>


      <div class="empresa-sucursales-grid">

        <article
          v-for="sucursal in sucursales"
          :key="sucursal.id"
          class="empresa-sucursal-card"
        >

          <div class="empresa-sucursal-icono">
            🏪
          </div>

          <h3>
            {{ sucursal.nombre }}
          </h3>


          <div class="empresa-sucursal-datos">

            <div class="empresa-sucursal-dato">
              <span>📍</span>
              <p>{{ sucursal.direccion }}</p>
            </div>

            <div
              v-if="sucursal.telefono"
              class="empresa-sucursal-dato"
            >
              <span>📞</span>
              <p>{{ sucursal.telefono }}</p>
            </div>

            <div
              v-if="sucursal.horario"
              class="empresa-sucursal-dato"
            >
              <span>🕐</span>
              <p>{{ sucursal.horario }}</p>
            </div>

          </div>


          <a
            v-if="sucursal.mapa"
            :href="sucursal.mapa"
            target="_blank"
            rel="noopener noreferrer"
            class="empresa-sucursal-mapa"
          >
            Ver en Google Maps
            <span>→</span>
          </a>

        </article>

      </div>
    </section>


    <section class="empresa-cierre">
      <div class="contenedor empresa-cierre-contenido">
        <p>Tu compra diaria, con el trato que mereces.</p>
        <RouterLink to="/contacto" class="boton boton-azul">
          Ponte en contacto
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import heroImage from '../assets/hero.png'


// ============================================
// CONFIGURACIÓN
// ============================================

const API_URL = 'http://localhost:3000/api'


// ============================================
// ESTADO
// ============================================

const sucursales = ref([])


// ============================================
// CARGAR SUCURSALES DEL BACKEND
// ============================================

const cargarSucursales = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/sucursales`)
    const datos = await respuesta.json()

    if (datos.ok) {
      // Filtrar solo las activas
      sucursales.value = datos.sucursales.filter(s => s.activa)
    }
  } catch (err) {
    console.error('Error cargando sucursales:', err)
  }
}


// ============================================
// AL MONTAR
// ============================================

onMounted(() => {
  cargarSucursales()
})
</script>


<style scoped>

/* =========================================================
   NOSOTROS / FOLLETO EMPRESARIAL
========================================================= */

.empresa-pagina {
  overflow: hidden;
  background: #f7fbfd;
}

.empresa-portada {
  padding: 86px 0 105px;
  background:
    radial-gradient(circle at 10% 10%, rgba(49,156,244,.2), transparent 29%),
    linear-gradient(135deg, #eefaff 0%, #ffffff 62%, #fff7ea 100%);
}

.empresa-portada-grid {
  display: grid;
  grid-template-columns: 1.28fr .72fr;
  align-items: center;
  gap: 52px;
}

.empresa-portada-contenido {
  padding-left: 24px;
  border-left: 5px solid var(--rojo-mega, #E02B52);
}

.empresa-etiqueta,
.empresa-ficha-etiqueta {
  color: var(--rojo-mega, #E02B52);
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
}

.empresa-portada h1 {
  max-width: 650px;
  margin: 18px 0;
  color: #12375b;
  font-size: clamp(38px, 4.6vw, 60px);
  line-height: 1.04;
}

.empresa-portada p {
  max-width: 485px;
  color: var(--texto-gris, #64748b);
  font-size: 17px;
  line-height: 1.75;
}

.empresa-acento {
  display: flex;
  gap: 7px;
  margin-top: 28px;
}

.empresa-acento span {
  width: 38px;
  height: 5px;
  border-radius: 5px;
}

.empresa-acento span:nth-child(1) { background: var(--azul-mega, #006BC5); }
.empresa-acento span:nth-child(2) { background: var(--rojo-mega, #E02B52); }
.empresa-acento span:nth-child(3) { background: var(--amarillo-mega, #FFB932); }

.empresa-foto-principal {
  position: relative;
  min-height: 290px;
  margin: 0;
  overflow: hidden;
  border: 12px solid white;
  border-radius: 4px 34px 4px 34px;
  background: #dbeefa;
  box-shadow: 0 25px 55px rgba(15,72,110,.2);
  transform: rotate(1.5deg);
}

.empresa-foto-principal::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 52%, rgba(0,44,82,.64));
}

.empresa-foto-principal img {
  width: 100%;
  height: 100%;
  min-height: 290px;
  object-fit: cover;
}

.empresa-foto-principal figcaption {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 1;
  color: white;
  max-width: 190px;
  font-size: 12px;
  line-height: 1.4;
  font-weight: bold;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.empresa-folleto {
  display: grid;
  grid-template-columns: .92fr 1.08fr;
  gap: 72px;
  padding-top: 88px;
  padding-bottom: 92px;
}

.empresa-ficha {
  position: relative;
  padding: 38px 40px;
  border-top: 4px solid var(--azul-mega, #006BC5);
  background: white;
  box-shadow: 0 18px 45px rgba(15,72,110,.09);
}

.empresa-ficha-numero {
  position: absolute;
  top: 25px;
  right: 30px;
  color: #e4f2fb;
  font-size: 56px;
  font-weight: bold;
  line-height: 1;
}

.empresa-ficha h2 {
  max-width: 420px;
  margin: 18px 0 16px;
  color: #12375b;
  font-size: 31px;
  line-height: 1.15;
}

.empresa-ficha p,
.empresa-bloque p {
  color: var(--texto-gris, #64748b);
  line-height: 1.7;
}

.empresa-ficha-detalle {
  margin-top: 14px;
}

.empresa-datos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid #e2edf3;
}

.empresa-datos div {
  display: grid;
  gap: 5px;
}

.empresa-datos strong {
  color: var(--azul-mega, #006BC5);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.empresa-datos span {
  color: #12375b;
  font-size: 14px;
  font-weight: bold;
}

.empresa-contenido {
  display: grid;
  gap: 32px;
  align-content: center;
}

.empresa-bloque {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 17px;
}

.empresa-bloque-numero {
  color: var(--rojo-mega, #E02B52);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

.empresa-bloque h3 {
  margin-bottom: 7px;
  color: #12375b;
  font-size: 23px;
}

.empresa-valores {
  padding-top: 25px;
  border-top: 1px solid #dbe9f1;
}

.empresa-valores h3 {
  margin: 10px 0 18px;
  color: #12375b;
  font-size: 23px;
}

.empresa-valores-lista {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.empresa-valores-lista article {
  padding: 16px;
  border: 1px solid #d7eaf4;
  border-radius: 10px;
  background: #f6fbfe;
}

.empresa-valores-lista strong {
  display: block;
  margin-bottom: 6px;
  color: var(--azul-oscuro, #004A8F);
  font-size: 15px;
}

.empresa-valores-lista p {
  color: var(--texto-gris, #64748b);
  font-size: 13px;
  line-height: 1.45;
}


/* =========================================================
   SUCURSALES
========================================================= */

.empresa-sucursales {
  padding-top: 40px;
  padding-bottom: 90px;
}

.empresa-sucursales-encabezado {
  max-width: 700px;
  margin-bottom: 50px;
}

.empresa-sucursales-encabezado h2 {
  margin: 15px 0;
  color: #12375b;
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
}

.empresa-sucursales-encabezado p {
  color: var(--texto-gris, #64748b);
  font-size: 16px;
  line-height: 1.7;
}

.empresa-sucursales-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.empresa-sucursal-card {
  position: relative;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0eef7;
  border-radius: 18px;
  background: white;
  box-shadow: 0 12px 35px rgba(15,72,110,.07);
  transition: 0.3s;
}

.empresa-sucursal-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 50px rgba(15,72,110,.14);
  border-color: rgba(0,107,197,.2);
}

.empresa-sucursal-icono {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #eef7ff, #e4f0ff);
  font-size: 34px;
  margin-bottom: 20px;
}

.empresa-sucursal-card h3 {
  margin: 0 0 20px;
  color: #12375b;
  font-size: 22px;
  line-height: 1.2;
}

.empresa-sucursal-datos {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  flex-grow: 1;
}

.empresa-sucursal-dato {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.empresa-sucursal-dato span {
  font-size: 18px;
  line-height: 1.4;
  flex-shrink: 0;
}

.empresa-sucursal-dato p {
  margin: 0;
  color: #5b6b7d;
  font-size: 14px;
  line-height: 1.55;
}

.empresa-sucursal-mapa {
  padding: 13px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--azul-mega, #006BC5), var(--azul-cielo, #319CF4));
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  transition: 0.25s;
  box-shadow: 0 10px 24px rgba(0,107,197,.25);
}

.empresa-sucursal-mapa:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 32px rgba(0,107,197,.35);
}


/* =========================================================
   CIERRE
========================================================= */

.empresa-cierre {
  background: #003b73;
}

.empresa-cierre-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 38px;
  padding-bottom: 38px;
}

.empresa-cierre p {
  color: white;
  font-size: 22px;
  font-weight: bold;
}

.empresa-cierre .boton {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  white-space: nowrap;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 850px) {
  .empresa-portada {
    padding: 65px 0 80px;
  }

  .empresa-portada-grid,
  .empresa-folleto {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .empresa-portada-contenido {
    padding-left: 18px;
  }

  .empresa-foto-principal,
  .empresa-foto-principal img {
    min-height: 250px;
  }

  .empresa-folleto {
    padding-top: 65px;
    padding-bottom: 70px;
  }

  .empresa-sucursales {
    padding-top: 20px;
    padding-bottom: 70px;
  }
}

@media (max-width: 520px) {
  .empresa-portada h1 {
    font-size: 39px;
  }

  .empresa-foto-principal {
    min-height: 210px;
    border-width: 8px;
    border-radius: 3px 28px 3px 28px;
  }

  .empresa-foto-principal img {
    min-height: 210px;
  }

  .empresa-ficha {
    padding: 30px 23px;
  }

  .empresa-ficha h2 {
    font-size: 27px;
  }

  .empresa-datos {
    grid-template-columns: 1fr;
  }

  .empresa-valores-lista {
    grid-template-columns: 1fr;
  }

  .empresa-cierre-contenido {
    align-items: flex-start;
    flex-direction: column;
  }

  .empresa-cierre p {
    font-size: 19px;
  }

  .empresa-sucursal-card {
    padding: 28px 22px;
  }
}

</style>