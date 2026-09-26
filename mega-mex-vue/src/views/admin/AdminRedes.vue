<template>
  <section class="pagina-redes">

    <!-- ENCABEZADO -->
    <div class="encabezado">

      <div>
        <span class="categoria">
          COMUNICACIÓN
        </span>

        <h2>
          📱 Administración de Redes
        </h2>

        <p>
          Administra los enlaces de las redes sociales de Mega-Mex.
        </p>
      </div>

      <button
        class="btn-guardar"
        :disabled="cargando || cargandoLista"
        @click="guardarRedes"
      >
        {{
          cargando
            ? '⏳ Guardando...'
            : '💾 Guardar cambios'
        }}
      </button>

    </div>


    <!-- CARGANDO -->
    <div
      v-if="cargandoLista"
      class="cargando"
    >
      <div class="cargando-icono">⏳</div>
      <p>Cargando configuración actual...</p>
    </div>


    <!-- FORMULARIO -->
    <div
      v-else
      class="contenedor"
    >

      <!-- FACEBOOK -->
      <div class="red-card">

        <div class="red-icon facebook">
          f
        </div>

        <div class="red-datos">

          <label>
            Facebook
          </label>

          <p>
            Enlace de la página oficial de Mega-Mex.
          </p>

          <input
            v-model="redes.facebook"
            type="url"
            placeholder="https://www.facebook.com/..."
          >

        </div>

      </div>


      <!-- INSTAGRAM -->
      <div class="red-card">

        <div class="red-icon instagram">
          ◎
        </div>

        <div class="red-datos">

          <label>
            Instagram
          </label>

          <p>
            Enlace del perfil oficial de Instagram.
          </p>

          <input
            v-model="redes.instagram"
            type="url"
            placeholder="https://www.instagram.com/..."
          >

        </div>

      </div>

    </div>


    <!-- MENSAJE -->
    <transition name="mensaje">

      <div
        v-if="mensaje"
        class="mensaje"
      >
        ✅ {{ mensaje }}
      </div>

    </transition>

  </section>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import { obtenerToken } from '../../utils/auth'


// ============================================
// CONFIGURACIÓN API
// ============================================

const API_URL = 'http://localhost:3000/api'


// ============================================
// VARIABLES
// ============================================

const mensaje = ref('')

const cargando = ref(false)

const cargandoLista = ref(false)


const redes = ref({
  facebook: '',
  instagram: ''
})


// ============================================
// CARGAR REDES DEL BACKEND
// ============================================

const cargarRedes = async () => {

  cargandoLista.value = true

  try {

    const respuesta = await fetch(`${API_URL}/redes`)

    const datos = await respuesta.json()

    if (datos.ok && datos.redes) {

      redes.value = {
        facebook: datos.redes.facebook || '',
        instagram: datos.redes.instagram || ''
      }

    }

  }

  catch (err) {

    console.error('Error cargando redes:', err)

    mostrarMensaje('No se pudo conectar con el servidor.')

  }

  finally {

    cargandoLista.value = false

  }

}


// ============================================
// AL MONTAR
// ============================================

onMounted(() => {

  cargarRedes()

})


// ============================================
// GUARDAR REDES
// ============================================

const guardarRedes = async () => {

  cargando.value = true

  try {

    const token = obtenerToken()

    const respuesta = await fetch(`${API_URL}/redes`, {

      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        facebook: redes.value.facebook.trim(),
        instagram: redes.value.instagram.trim()
      })

    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al guardar')
    }

    mostrarMensaje('Redes sociales actualizadas correctamente.')

  }

  catch (err) {

    console.error('Error guardando redes:', err)

    mostrarMensaje(err.message || 'Error al guardar')

  }

  finally {

    cargando.value = false

  }

}


// ============================================
// MENSAJE
// ============================================

const mostrarMensaje = (texto) => {

  mensaje.value = texto

  setTimeout(() => {

    mensaje.value = ''

  }, 3000)

}

</script>


<style scoped>

.pagina-redes {
  margin-top: 30px;
}


/* ENCABEZADO */

.encabezado {

  padding: 28px 32px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.06);

}


.categoria {

  color: #e53278;

  font-size: 11px;

  font-weight: bold;

  letter-spacing: 1px;

}


.encabezado h2 {

  margin: 8px 0;

  color: #202938;

  font-size: 25px;

}


.encabezado p {

  margin: 0;

  color: #7c8490;

}


.btn-guardar {

  padding: 13px 20px;

  border: none;

  border-radius: 12px;

  background: #006bc5;

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition: 0.25s;

}


.btn-guardar:hover:not(:disabled) {

  background: #00549c;

  transform: translateY(-2px);

}


.btn-guardar:disabled {

  opacity: 0.6;

  cursor: not-allowed;

}


/* CARGANDO */

.cargando {

  margin-top: 22px;

  min-height: 300px;

  padding: 40px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  text-align: center;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);

}


.cargando-icono {

  font-size: 60px;

  margin-bottom: 15px;

}


.cargando p {

  margin: 0;

  color: #7c8490;

}


/* CONTENEDOR */

.contenedor {

  margin-top: 22px;

  padding: 35px;

  display: flex;

  flex-direction: column;

  gap: 22px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);

}


/* TARJETAS */

.red-card {

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 20px;

  border:
    1px solid #e8ecf0;

  border-radius: 16px;

  transition: 0.25s;

}


.red-card:hover {

  border-color: #cbd8e5;

  box-shadow:
    0 6px 18px
    rgba(0, 0, 0, 0.05);

}


/* ICONOS */

.red-icon {

  width: 65px;

  height: 65px;

  min-width: 65px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 18px;

  color: white;

  font-size: 35px;

  font-weight: bold;

}


.facebook {

  background: #1877f2;

}


.instagram {

  background:
    linear-gradient(
      135deg,
      #833ab4,
      #e1306c,
      #f77737
    );

}


/* DATOS */

.red-datos {

  width: 100%;

}


.red-datos label {

  color: #202938;

  font-size: 16px;

  font-weight: bold;

}


.red-datos p {

  margin: 4px 0 12px;

  color: #89919d;

  font-size: 13px;

}


.red-datos input {

  width: 100%;

  padding: 14px 16px;

  border:
    1px solid #dfe4ea;

  border-radius: 10px;

  outline: none;

  font-size: 14px;

}


.red-datos input:focus {

  border-color: #006bc5;

  box-shadow:
    0 0 0 3px
    rgba(0, 107, 197, 0.10);

}


/* MENSAJE */

.mensaje {

  position: fixed;

  z-index: 9999;

  right: 30px;

  bottom: 30px;

  padding: 16px 20px;

  border-radius: 12px;

  background: #1e9d68;

  color: white;

  font-weight: bold;

  box-shadow:
    0 10px 30px
    rgba(0, 0, 0, 0.20);

}


.mensaje-enter-active,
.mensaje-leave-active {

  transition: 0.3s;

}


.mensaje-enter-from,
.mensaje-leave-to {

  opacity: 0;

  transform:
    translateY(20px);

}


/* RESPONSIVE */

@media (max-width: 700px) {

  .encabezado {

    flex-direction: column;

    align-items: flex-start;

  }


  .btn-guardar {

    width: 100%;

  }


  .red-card {

    flex-direction: column;

    align-items: flex-start;

  }

}

</style>