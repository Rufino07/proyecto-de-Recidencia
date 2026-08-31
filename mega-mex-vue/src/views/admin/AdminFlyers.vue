<template>
  <section class="pagina-admin">

    <div class="encabezado">
      <div>
        <span class="categoria">MARKETING</span>

        <h2>🎨 Administración de Volantes</h2>

        <p>
          Agrega, edita o elimina los volantes publicitarios de Mega-Mex.
        </p>
      </div>

      <button class="btn-principal" @click="nuevoVolante">
        + Agregar volante
      </button>
    </div>


    <!-- SIN VOLANTES -->
    <div v-if="volantes.length === 0" class="vacio">

      <div class="icono">
        🎨
      </div>

      <h3>Aún no tienes volantes</h3>

      <p>
        Agrega tu primer volante publicitario.
      </p>

      <button class="btn-principal" @click="nuevoVolante">
        + Agregar primer volante
      </button>

    </div>


    <!-- VOLANTES -->
    <div v-else class="contenido">

      <div class="titulo-lista">
        <h3>Volantes registrados</h3>

        <p>
          {{ volantes.length }}
          {{ volantes.length === 1 ? 'volante' : 'volantes' }}
        </p>
      </div>


      <div class="grid">

        <article
          v-for="volante in volantes"
          :key="volante.id"
          class="tarjeta"
        >

          <div class="imagen">

            <img
              v-if="volante.imagen"
              :src="volante.imagen"
              :alt="volante.titulo"
            >

            <div v-else class="sin-imagen">
              🎨
            </div>

            <span
              class="estado"
              :class="volante.activo ? 'activo' : 'oculto'"
            >
              {{ volante.activo ? 'Activo' : 'Oculto' }}
            </span>

          </div>


          <div class="info">

            <span class="tipo">VOLANTE</span>

            <h3>
              {{ volante.titulo }}
            </h3>

            <p>
              {{ volante.descripcion || 'Sin descripción' }}
            </p>


            <div class="acciones">

              <button
                class="editar"
                @click="editarVolante(volante)"
              >
                ✏️ Editar
              </button>

              <button
                class="eliminar"
                @click="eliminarVolante(volante.id)"
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
      @click.self="cerrarModal"
    >

      <div class="modal">

        <div class="modal-header">

          <div>
            <span>VOLANTE</span>

            <h3>
              {{ editando ? 'Editar volante' : 'Agregar volante' }}
            </h3>
          </div>

          <button class="cerrar" @click="cerrarModal">
            ✕
          </button>

        </div>


        <form @submit.prevent="guardarVolante" class="formulario">

          <div class="campo">

            <label>Título *</label>

            <input
              v-model="formulario.titulo"
              type="text"
              placeholder="Ejemplo: Ofertas de la semana"
              required
            >

          </div>


          <div class="campo">

            <label>Descripción</label>

            <textarea
              v-model="formulario.descripcion"
              rows="3"
              placeholder="Descripción del volante"
            ></textarea>

          </div>


          <div class="campo">

            <label>Imagen del volante</label>

            <input
              id="imagenVolante"
              class="input-file"
              type="file"
              accept="image/*"
              @change="seleccionarImagen"
            >

            <label
              for="imagenVolante"
              class="subir"
            >
              📷
              <strong>Seleccionar imagen</strong>
              <small>PNG, JPG o WEBP</small>
            </label>

          </div>


          <div v-if="formulario.imagen" class="preview">

            <img
              :src="formulario.imagen"
              alt="Vista previa"
            >

            <button
              type="button"
              @click="formulario.imagen = ''"
            >
              Quitar imagen
            </button>

          </div>


          <div class="estado-form">

            <div>
              <strong>Mostrar volante</strong>
              <p>Será visible en la página.</p>
            </div>

            <input
              v-model="formulario.activo"
              type="checkbox"
            >

          </div>


          <div class="botones-modal">

            <button
              type="button"
              class="cancelar"
              @click="cerrarModal"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="guardar"
            >
              {{ editando ? 'Guardar cambios' : 'Agregar volante' }}
            </button>

          </div>

        </form>

      </div>

    </div>

  </section>
</template>


<script setup>

import {
  ref,
  onMounted
} from 'vue'


const volantes = ref([])

const mostrarModal = ref(false)

const editando = ref(false)

const idEditando = ref(null)


const formulario = ref({
  titulo: '',
  descripcion: '',
  imagen: '',
  activo: true
})


onMounted(() => {

  const datos =
    localStorage.getItem('megaMexVolantes')

  if (datos) {

    try {
      volantes.value = JSON.parse(datos)
    }
    catch {
      volantes.value = []
    }

  }

})


const guardarStorage = () => {

  localStorage.setItem(
    'megaMexVolantes',
    JSON.stringify(volantes.value)
  )

}


const nuevoVolante = () => {

  editando.value = false

  idEditando.value = null

  formulario.value = {
    titulo: '',
    descripcion: '',
    imagen: '',
    activo: true
  }

  mostrarModal.value = true

}


const cerrarModal = () => {

  mostrarModal.value = false

}


const seleccionarImagen = (event) => {

  const archivo = event.target.files[0]

  if (!archivo) return

  const lector = new FileReader()

  lector.onload = (e) => {

    formulario.value.imagen =
      e.target.result

  }

  lector.readAsDataURL(archivo)

}


const guardarVolante = () => {

  if (!formulario.value.titulo.trim()) {
    return
  }


  if (editando.value) {

    const indice =
      volantes.value.findIndex(
        item => item.id === idEditando.value
      )

    if (indice !== -1) {

      volantes.value[indice] = {
        ...volantes.value[indice],
        ...formulario.value
      }

    }

  }
  else {

    volantes.value.unshift({

      id: Date.now(),

      ...formulario.value

    })

  }


  guardarStorage()

  cerrarModal()

}


const editarVolante = (volante) => {

  editando.value = true

  idEditando.value = volante.id

  formulario.value = {
    titulo: volante.titulo,
    descripcion: volante.descripcion,
    imagen: volante.imagen,
    activo: volante.activo
  }

  mostrarModal.value = true

}


const eliminarVolante = (id) => {

  if (!confirm('¿Deseas eliminar este volante?')) {
    return
  }

  volantes.value =
    volantes.value.filter(
      volante => volante.id !== id
    )

  guardarStorage()

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
  gap: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,.06);
}

.categoria {
  color: #006bc5;
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

.btn-principal {
  padding: 13px 20px;
  border: none;
  border-radius: 12px;
  background: #006bc5;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.vacio {
  margin-top: 22px;
  min-height: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 20px;
  text-align: center;
}

.icono {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaf5ff;
  border-radius: 28px;
  font-size: 50px;
}

.vacio p {
  color: #858d98;
}

.contenido {
  margin-top: 22px;
  padding: 28px;
  background: white;
  border-radius: 20px;
}

.titulo-lista h3 {
  margin: 0;
  color: #202938;
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
}

.imagen {
  height: 260px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f9fb;
}

.imagen img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sin-imagen {
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

.oculto {
  background: #eceff3;
  color: #666;
}

.info {
  padding: 20px;
}

.tipo {
  color: #006bc5;
  font-size: 10px;
  font-weight: bold;
}

.info h3 {
  margin: 7px 0;
  color: #202938;
}

.info p {
  color: #7b838e;
  min-height: 38px;
}

.acciones {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.editar,
.eliminar {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  font-weight: bold;
}

.editar {
  background: #eaf5ff;
  color: #006bc5;
}

.eliminar {
  background: #fff0f0;
  color: #dc3f3f;
}

.fondo-modal {
  position: fixed;
  z-index: 5000;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(20,28,40,.55);
}

.modal {
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 22px;
}

.modal-header {
  padding: 25px 28px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #edf0f3;
}

.modal-header span {
  color: #006bc5;
  font-size: 10px;
  font-weight: bold;
}

.modal-header h3 {
  margin: 5px 0 0;
}

.cerrar {
  border: none;
  background: #f2f4f6;
  border-radius: 10px;
  width: 38px;
  height: 38px;
  cursor: pointer;
}

.formulario {
  padding: 28px;
}

.campo {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label {
  font-weight: bold;
}

.campo input,
.campo textarea {
  padding: 13px;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
  outline: none;
}

.input-file {
  display: none;
}

.subir {
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #cad3dc;
  border-radius: 14px;
  cursor: pointer;
}

.subir small {
  color: #858d98;
}

.preview {
  margin-bottom: 20px;
  text-align: center;
}

.preview img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.preview button {
  margin-top: 10px;
  border: none;
  background: transparent;
  color: #dc3f3f;
  cursor: pointer;
}

.estado-form {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  border-radius: 12px;
}

.estado-form p {
  margin: 4px 0 0;
  color: #858d98;
}

.botones-modal {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancelar,
.guardar {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.cancelar {
  background: #edf0f3;
}

.guardar {
  background: #006bc5;
  color: white;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2,1fr);
  }
}

@media (max-width: 650px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .encabezado {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>