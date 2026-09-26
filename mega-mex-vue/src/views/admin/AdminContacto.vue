<template>
  <section class="pagina-contacto-admin">

    <!-- ENCABEZADO -->
    <div class="encabezado">
      <div>
        <span class="categoria">COMUNICACIÓN</span>
        <h2>📧 Mensajes de Contacto</h2>
        <p>Revisa los mensajes enviados por los clientes.</p>
      </div>

      <div class="contador-total">
        <div class="contador-numero">{{ totalNoLeidos }}</div>
        <div class="contador-texto">No leídos</div>
      </div>
    </div>


    <!-- FILTROS -->
    <div class="filtros">
      <button
        :class="{ activo: filtro === 'todos' }"
        @click="filtro = 'todos'"
      >
        Todos ({{ mensajes.length }})
      </button>

      <button
        :class="{ activo: filtro === 'noleidos' }"
        @click="filtro = 'noleidos'"
      >
        No leídos ({{ totalNoLeidos }})
      </button>

      <button
        :class="{ activo: filtro === 'leidos' }"
        @click="filtro = 'leidos'"
      >
        Leídos ({{ totalLeidos }})
      </button>
    </div>


    <!-- CARGANDO -->
    <div v-if="cargandoLista" class="vacio">
      <div class="icono-vacio">⏳</div>
      <h3>Cargando mensajes...</h3>
      <p>Obteniendo los mensajes desde el servidor.</p>
    </div>


    <!-- SIN MENSAJES -->
    <div v-else-if="mensajesFiltrados.length === 0" class="vacio">
      <div class="icono-vacio">📭</div>
      <h3>
        {{ filtro === 'todos' ? 'No hay mensajes' : 'No hay mensajes en este filtro' }}
      </h3>
      <p>Cuando los clientes envíen mensajes, aparecerán aquí.</p>
    </div>


    <!-- LISTA DE MENSAJES -->
    <div v-else class="lista-mensajes">

      <article
        v-for="msg in mensajesFiltrados"
        :key="msg.id"
        :class="['mensaje-card', { noleido: !msg.leido }]"
      >

        <!-- CABECERA -->
        <div class="mensaje-header">

          <div class="mensaje-avatar">
            {{ msg.nombre.charAt(0).toUpperCase() }}
          </div>

          <div class="mensaje-info-basica">
            <h3>{{ msg.nombre }}</h3>
            <p class="mensaje-correo">
              📧 {{ msg.correo }}
            </p>
            <p v-if="msg.telefono" class="mensaje-telefono">
              📞 {{ msg.telefono }}
            </p>
          </div>

          <div class="mensaje-meta">
            <span
              class="mensaje-estado"
              :class="msg.leido ? 'leido' : 'noleido'"
            >
              {{ msg.leido ? '✓ Leído' : '● Nuevo' }}
            </span>
            <span class="mensaje-fecha">
              {{ formatearFecha(msg.creado_en) }}
            </span>
          </div>

        </div>


        <!-- MENSAJE -->
        <div class="mensaje-cuerpo">
          <p>{{ msg.mensaje }}</p>
        </div>


        <!-- ACCIONES -->
        <div class="mensaje-acciones">

          <button
            class="btn-accion btn-leido"
            @click="toggleLeido(msg)"
          >
            {{ msg.leido ? '📩 Marcar como no leído' : '✅ Marcar como leído' }}
          </button>

          <a
            :href="`mailto:${msg.correo}?subject=Respuesta de Mega-Mex`"
            class="btn-accion btn-responder"
          >
            ✉️ Responder por correo
          </a>

          <button
            class="btn-accion btn-eliminar"
            @click="eliminarMensaje(msg)"
          >
            🗑️ Eliminar
          </button>

        </div>

      </article>

    </div>


    <!-- MENSAJE -->
    <transition name="mensaje-flotante">
      <div v-if="mensaje" class="mensaje-flotante">
        ✅ {{ mensaje }}
      </div>
    </transition>

  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { obtenerToken } from '../../utils/auth'

const API_URL = 'http://localhost:3000/api'

const mensajes = ref([])
const filtro = ref('todos')
const cargandoLista = ref(false)
const mensaje = ref('')


// ============================================
// COMPUTED
// ============================================

const totalNoLeidos = computed(() =>
  mensajes.value.filter(m => !m.leido).length
)

const totalLeidos = computed(() =>
  mensajes.value.filter(m => m.leido).length
)

const mensajesFiltrados = computed(() => {
  if (filtro.value === 'noleidos') {
    return mensajes.value.filter(m => !m.leido)
  }
  if (filtro.value === 'leidos') {
    return mensajes.value.filter(m => m.leido)
  }
  return mensajes.value
})


// ============================================
// CARGAR MENSAJES
// ============================================

const cargarMensajes = async () => {
  cargandoLista.value = true

  try {
    const token = obtenerToken()

    const respuesta = await fetch(`${API_URL}/contacto`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const datos = await respuesta.json()

    if (datos.ok) {
      mensajes.value = datos.mensajes
    } else {
      mostrarMensaje('Error al cargar mensajes')
    }
  } catch (err) {
    console.error('Error cargando mensajes:', err)
    mostrarMensaje('No se pudo conectar con el servidor.')
  } finally {
    cargandoLista.value = false
  }
}


// ============================================
// TOGGLE LEÍDO
// ============================================

const toggleLeido = async (msg) => {
  try {
    const token = obtenerToken()

    const respuesta = await fetch(`${API_URL}/contacto/${msg.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al actualizar')
    }

    await cargarMensajes()

  } catch (err) {
    console.error('Error actualizando estado:', err)
    mostrarMensaje(err.message || 'Error al actualizar')
  }
}


// ============================================
// ELIMINAR
// ============================================

const eliminarMensaje = async (msg) => {
  const confirmar = window.confirm(
    `¿Eliminar el mensaje de "${msg.nombre}"?`
  )

  if (!confirmar) return

  try {
    const token = obtenerToken()

    const respuesta = await fetch(`${API_URL}/contacto/${msg.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al eliminar')
    }

    await cargarMensajes()
    mostrarMensaje('Mensaje eliminado correctamente.')

  } catch (err) {
    console.error('Error eliminando:', err)
    mostrarMensaje(err.message || 'Error al eliminar')
  }
}


// ============================================
// FORMATEAR FECHA
// ============================================

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO)
  const ahora = new Date()
  const diffMin = Math.floor((ahora - fecha) / 60000)

  if (diffMin < 1) return 'Ahora mismo'
  if (diffMin < 60) return `Hace ${diffMin} min`
  if (diffMin < 1440) return `Hace ${Math.floor(diffMin / 60)} h`

  return fecha.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}


// ============================================
// MENSAJE FLOTANTE
// ============================================

const mostrarMensaje = (texto) => {
  mensaje.value = texto
  setTimeout(() => {
    mensaje.value = ''
  }, 3000)
}


// ============================================
// AL MONTAR
// ============================================

onMounted(() => {
  cargarMensajes()
})
</script>


<style scoped>

.pagina-contacto-admin {
  margin-top: 30px;
}

.encabezado {
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
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

.contador-total {
  padding: 15px 25px;
  text-align: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  flex-shrink: 0;
}

.contador-numero {
  font-size: 32px;
  font-weight: 900;
  color: #dc2626;
  line-height: 1;
}

.contador-texto {
  font-size: 11px;
  font-weight: bold;
  color: #991b1b;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 5px;
}

.filtros {
  margin-top: 22px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filtros button {
  padding: 10px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  background: white;
  color: #64748b;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  transition: .2s;
}

.filtros button:hover {
  border-color: #006bc5;
  color: #006bc5;
}

.filtros button.activo {
  background: #006bc5;
  color: white;
  border-color: #006bc5;
}

.vacio {
  margin-top: 22px;
  min-height: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.icono-vacio {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f9ff;
  border-radius: 28px;
  font-size: 50px;
}

.vacio h3 {
  margin: 20px 0 7px;
  color: #202938;
}

.vacio p {
  margin: 0;
  color: #858d98;
}

.lista-mensajes {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mensaje-card {
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: white;
  transition: .25s;
}

.mensaje-card.noleido {
  border-left: 5px solid #dc2626;
  background: linear-gradient(135deg, #ffffff, #fef7f7);
}

.mensaje-card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.mensaje-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}

.mensaje-avatar {
  width: 55px;
  height: 55px;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #006bc5, #319cf4);
  color: white;
  font-size: 24px;
  font-weight: 900;
}

.mensaje-info-basica {
  flex-grow: 1;
}

.mensaje-info-basica h3 {
  margin: 0 0 5px;
  color: #202938;
  font-size: 18px;
}

.mensaje-correo,
.mensaje-telefono {
  margin: 3px 0;
  color: #64748b;
  font-size: 13px;
}

.mensaje-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.mensaje-estado {
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: bold;
}

.mensaje-estado.leido {
  background: #dcf8e9;
  color: #168b56;
}

.mensaje-estado.noleido {
  background: #fee2e2;
  color: #dc2626;
}

.mensaje-fecha {
  color: #94a3b8;
  font-size: 12px;
}

.mensaje-cuerpo {
  padding: 18px 20px;
  margin-bottom: 18px;
  border-radius: 12px;
  background: #f8fafc;
}

.mensaje-cuerpo p {
  margin: 0;
  color: #334155;
  line-height: 1.7;
  font-size: 14px;
}

.mensaje-acciones {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-accion {
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: .2s;
}

.btn-leido {
  background: #e0f2fe;
  color: #0369a1;
}

.btn-leido:hover {
  background: #0369a1;
  color: white;
}

.btn-responder {
  background: #eaf5ff;
  color: #006bc5;
}

.btn-responder:hover {
  background: #006bc5;
  color: white;
}

.btn-eliminar {
  background: #fee2e2;
  color: #dc2626;
  margin-left: auto;
}

.btn-eliminar:hover {
  background: #dc2626;
  color: white;
}

.mensaje-flotante {
  position: fixed;
  z-index: 9999;
  right: 30px;
  bottom: 30px;
  padding: 16px 20px;
  border-radius: 12px;
  background: #1e9d68;
  color: white;
  font-weight: bold;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.20);
}

.mensaje-flotante-enter-active,
.mensaje-flotante-leave-active {
  transition: .3s;
}

.mensaje-flotante-enter-from,
.mensaje-flotante-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 700px) {
  .encabezado {
    flex-direction: column;
    align-items: flex-start;
  }

  .mensaje-header {
    flex-direction: column;
  }

  .mensaje-meta {
    align-items: flex-start;
  }

  .btn-eliminar {
    margin-left: 0;
  }

  .mensaje-acciones {
    flex-direction: column;
  }

  .btn-accion {
    width: 100%;
    justify-content: center;
  }
}

</style>