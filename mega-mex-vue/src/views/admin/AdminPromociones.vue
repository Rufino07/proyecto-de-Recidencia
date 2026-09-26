<template>
  <section class="pagina-admin">

    <div class="encabezado">

      <div>
        <span class="categoria">MARKETING</span>

        <h2>⭐ Administración de Promociones</h2>

        <p>
          Agrega, edita o elimina promociones de Mega-Mex.
        </p>
      </div>

      <button class="btn-principal" @click="nueva">
        + Nueva promoción
      </button>

    </div>


    <!-- CARGANDO -->
    <div v-if="cargandoLista" class="vacio">

      <div class="icono-vacio">⏳</div>

      <h3>Cargando promociones...</h3>

      <p>
        Obteniendo el listado desde el servidor.
      </p>

    </div>


    <!-- VACÍO -->
    <div v-else-if="promociones.length === 0" class="vacio">

      <div class="icono-vacio">⭐</div>

      <h3>Aún no tienes promociones</h3>

      <p>
        Agrega tu primera promoción.
      </p>

      <button class="btn-principal" @click="nueva">
        + Agregar primera promoción
      </button>

    </div>


    <!-- LISTA -->
    <div v-else class="contenedor">

      <div class="titulo-lista">
        <h3>Promociones registradas</h3>
        <p>{{ promociones.length }} registradas</p>
      </div>


      <div class="grid">

        <article
          v-for="promo in promociones"
          :key="promo.id"
          class="tarjeta"
        >

          <div class="imagen">

            <img
              v-if="promo.imagen"
              :src="promo.imagen"
              :alt="promo.titulo"
            >

            <div v-else class="sin-imagen">
              ⭐
            </div>

            <span
              class="estado"
              :class="promo.activo ? 'activo' : 'inactivo'"
            >
              {{ promo.activo ? 'Activa' : 'Oculta' }}
            </span>

          </div>


          <div class="info">

            <span class="mini-titulo">
              PROMOCIÓN
            </span>

            <h3>{{ promo.titulo }}</h3>

            <p>{{ promo.descripcion }}</p>

            <small v-if="promo.vigencia">
              📅 {{ promo.vigencia }}
            </small>

            <div class="acciones">

              <button
                class="btn-editar"
                @click="editar(promo)"
              >
                ✏️ Editar
              </button>

              <button
                class="btn-eliminar"
                @click="eliminar(promo)"
              >
                🗑️ Eliminar
              </button>

            </div>

          </div>

        </article>

      </div>

    </div>


    <!-- MODAL -->
    <div
      v-if="mostrarModal"
      class="fondo-modal"
      @click.self="cerrar"
    >

      <div class="modal">

        <div class="modal-header">

          <h3>
            {{ editando ? 'Editar promoción' : 'Nueva promoción' }}
          </h3>

          <button @click="cerrar">
            ✕
          </button>

        </div>


        <form @submit.prevent="guardar">

          <div class="campo">

            <label>Título *</label>

            <input
              v-model="form.titulo"
              required
              placeholder="Ejemplo: Oferta especial"
            >

          </div>


          <div class="campo">

            <label>Descripción</label>

            <textarea
              v-model="form.descripcion"
              rows="3"
              placeholder="Descripción de la promoción"
            ></textarea>

          </div>


          <div class="campo">

            <label>Vigencia</label>

            <input
              v-model="form.vigencia"
              placeholder="Ejemplo: 30 de agosto al 5 de septiembre"
            >

          </div>


          <div class="campo">

            <label>Imagen</label>

            <input
              type="file"
              accept="image/*"
              @change="seleccionarImagen"
            >

          </div>


          <div v-if="form.imagen" class="preview">

            <img :src="form.imagen">

            <button
              type="button"
              class="quitar-imagen"
              @click="form.imagen = ''"
            >
              Quitar imagen
            </button>

          </div>


          <label class="check">
            <input
              v-model="form.activo"
              type="checkbox"
            >

            Mostrar promoción
          </label>


          <div class="acciones-modal">

            <button
              type="button"
              class="btn-cancelar"
              :disabled="cargando"
              @click="cerrar"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="btn-principal"
              :disabled="cargando"
            >
              {{ cargando ? 'Guardando...' : 'Guardar' }}
            </button>

          </div>

        </form>

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

const promociones = ref([])
const mostrarModal = ref(false)
const editando = ref(false)
const idEditando = ref(null)

const cargando = ref(false)
const cargandoLista = ref(false)
const mensaje = ref('')


const form = ref({
  titulo: '',
  descripcion: '',
  vigencia: '',
  imagen: '',
  activo: true
})


// ============================================
// CARGAR PROMOCIONES DEL BACKEND
// ============================================

const cargarPromociones = async () => {
  cargandoLista.value = true

  try {
    const respuesta = await fetch(`${API_URL}/promociones`)
    const datos = await respuesta.json()

    if (datos.ok) {
      promociones.value = datos.promociones
    } else {
      mostrarMensaje('Error al cargar promociones')
    }

  } catch (err) {
    console.error('Error cargando promociones:', err)
    mostrarMensaje('No se pudo conectar con el servidor.')

  } finally {
    cargandoLista.value = false
  }
}


// ============================================
// AL MONTAR
// ============================================

onMounted(() => {
  cargarPromociones()
})


// ============================================
// NUEVA PROMOCIÓN
// ============================================

const nueva = () => {

  editando.value = false
  idEditando.value = null

  form.value = {
    titulo: '',
    descripcion: '',
    vigencia: '',
    imagen: '',
    activo: true
  }

  mostrarModal.value = true
}


// ============================================
// EDITAR PROMOCIÓN
// ============================================

const editar = (promo) => {

  editando.value = true
  idEditando.value = promo.id

  form.value = {
    titulo: promo.titulo || '',
    descripcion: promo.descripcion || '',
    vigencia: promo.vigencia || '',
    imagen: promo.imagen || '',
    activo: promo.activo !== false
  }

  mostrarModal.value = true
}


// ============================================
// SELECCIONAR IMAGEN (base64)
// ============================================

const seleccionarImagen = (event) => {

  const archivo = event.target.files[0]

  if (!archivo) return

  if (!archivo.type.startsWith('image/')) {
    mostrarMensaje('Selecciona un archivo de imagen válido.')
    return
  }

  const lector = new FileReader()

  lector.onload = (e) => {
    form.value.imagen = e.target.result
  }

  lector.readAsDataURL(archivo)
}


// ============================================
// GUARDAR (crear o editar)
// ============================================

const guardar = async () => {

  if (!form.value.titulo.trim()) {
    mostrarMensaje('El título es obligatorio.')
    return
  }

  cargando.value = true

  try {

    const token = obtenerToken()

    const url = editando.value
      ? `${API_URL}/promociones/${idEditando.value}`
      : `${API_URL}/promociones`

    const metodo = editando.value ? 'PUT' : 'POST'

    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo: form.value.titulo.trim(),
        descripcion: form.value.descripcion.trim(),
        vigencia: form.value.vigencia.trim(),
        imagen: form.value.imagen || null,
        activo: form.value.activo
      })
    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al guardar')
    }

    await cargarPromociones()

    cerrar()

    mostrarMensaje(
      editando.value
        ? 'Promoción actualizada correctamente.'
        : 'Promoción creada correctamente.'
    )

  } catch (err) {
    console.error('Error guardando promoción:', err)
    mostrarMensaje(err.message || 'Error al guardar')

  } finally {
    cargando.value = false
  }
}


// ============================================
// ELIMINAR PROMOCIÓN
// ============================================

const eliminar = async (promo) => {

  if (!window.confirm(`¿Eliminar "${promo.titulo}"?`)) return

  try {

    const token = obtenerToken()

    const respuesta = await fetch(`${API_URL}/promociones/${promo.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al eliminar')
    }

    await cargarPromociones()

    mostrarMensaje('Promoción eliminada correctamente.')

  } catch (err) {
    console.error('Error eliminando promoción:', err)
    mostrarMensaje(err.message || 'Error al eliminar')
  }
}


// ============================================
// CERRAR MODAL
// ============================================

const cerrar = () => {
  mostrarModal.value = false
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
.pagina-admin {
  margin-top: 30px;
}

.encabezado {
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,.06);
}

.categoria,
.mini-titulo {
  color: #d89b00;
  font-size: 11px;
  font-weight: bold;
}

.encabezado h2 {
  margin: 8px 0;
  color: #202938;
}

.encabezado p {
  margin: 0;
  color: #7c8490;
}

.btn-principal {
  padding: 13px 20px;
  border: none;
  border-radius: 12px;
  background: #006bc5;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: .25s;
}

.btn-principal:hover:not(:disabled) {
  background: #00549c;
  transform: translateY(-2px);
}

.btn-principal:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.vacio {
  margin-top: 22px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 20px;
  text-align: center;
  padding: 40px;
}

.icono-vacio {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff8df;
  border-radius: 28px;
  font-size: 50px;
}

.vacio h3 {
  margin: 20px 0 8px;
  color: #202938;
}

.vacio p {
  color: #858d98;
  margin-bottom: 20px;
}

.contenedor {
  margin-top: 22px;
  padding: 28px;
  background: white;
  border-radius: 20px;
}

.titulo-lista p {
  color: #858d98;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 22px;
}

.tarjeta {
  overflow: hidden;
  border: 1px solid #edf0f3;
  border-radius: 18px;
  transition: .25s;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,.08);
}

.imagen {
  height: 230px;
  position: relative;
  display: flex;
  justify-content: center;
  background: #f7f9fb;
}

.imagen img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sin-imagen {
  margin: auto;
  font-size: 60px;
}

.estado {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: bold;
}

.activo {
  background: #dcf8e9;
  color: #168b56;
}

.inactivo {
  background: #eceff3;
}

.info {
  padding: 20px;
}

.info h3 {
  margin: 7px 0;
}

.info p {
  color: #7b838e;
}

.acciones {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-editar,
.btn-eliminar {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  font-weight: bold;
  transition: .2s;
}

.btn-editar {
  background: #eaf5ff;
  color: #006bc5;
}

.btn-editar:hover {
  background: #006bc5;
  color: white;
}

.btn-eliminar {
  background: #fff0f0;
  color: #dc3f3f;
}

.btn-eliminar:hover {
  background: #dc3f3f;
  color: white;
}

.fondo-modal {
  position: fixed;
  z-index: 5000;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20,28,40,.55);
  backdrop-filter: blur(4px);
}

.modal {
  width: 90%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 22px;
  padding: 28px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header button {
  border: none;
  background: #f2f4f6;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 16px;
}

.campo {
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label {
  font-weight: bold;
  color: #343c48;
  font-size: 13px;
}

.campo input,
.campo textarea {
  padding: 13px;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
}

.campo input:focus,
.campo textarea:focus {
  outline: none;
  border-color: #006bc5;
  box-shadow: 0 0 0 3px rgba(0,107,197,.1);
}

.preview {
  text-align: center;
  margin-bottom: 20px;
}

.preview img {
  width: 100%;
  max-height: 260px;
  object-fit: contain;
  border-radius: 10px;
}

.quitar-imagen {
  margin-top: 10px;
  border: none;
  background: transparent;
  color: #dc3f3f;
  cursor: pointer;
  font-weight: bold;
}

.check {
  display: block;
  margin: 20px 0;
  cursor: pointer;
}

.acciones-modal {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancelar {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: #edf0f3;
  color: #555e69;
  cursor: pointer;
  font-weight: bold;
}

.btn-cancelar:disabled {
  opacity: .6;
  cursor: not-allowed;
}

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
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
}

.mensaje-enter-active,
.mensaje-leave-active {
  transition: .3s;
}

.mensaje-enter-from,
.mensaje-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media(max-width:800px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .encabezado {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}
</style>