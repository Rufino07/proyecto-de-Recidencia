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


    <div v-if="promociones.length === 0" class="vacio">

      <div class="icono-vacio">⭐</div>

      <h3>Aún no tienes promociones</h3>

      <p>
        Agrega tu primera promoción.
      </p>

      <button class="btn-principal" @click="nueva">
        + Agregar primera promoción
      </button>

    </div>


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
              @click="cerrar"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="btn-principal"
            >
              Guardar
            </button>

          </div>

        </form>

      </div>

    </div>

  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const promociones = ref([])
const mostrarModal = ref(false)
const editando = ref(false)
const idEditando = ref(null)

const form = ref({
  titulo: '',
  descripcion: '',
  vigencia: '',
  imagen: '',
  activo: true
})


onMounted(() => {

  const datos =
    localStorage.getItem('megaMexPromociones')

  if (datos) {

    try {
      promociones.value = JSON.parse(datos)
    } catch {
      promociones.value = []
    }

  }

})


const persistir = () => {

  localStorage.setItem(
    'megaMexPromociones',
    JSON.stringify(promociones.value)
  )

}


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


const editar = (promo) => {

  editando.value = true

  idEditando.value = promo.id

  form.value = {
    titulo: promo.titulo,
    descripcion: promo.descripcion,
    vigencia: promo.vigencia,
    imagen: promo.imagen,
    activo: promo.activo
  }

  mostrarModal.value = true
}


const seleccionarImagen = (event) => {

  const archivo = event.target.files[0]

  if (!archivo) return

  const lector = new FileReader()

  lector.onload = (e) => {

    form.value.imagen =
      e.target.result

  }

  lector.readAsDataURL(archivo)
}


const guardar = () => {

  if (!form.value.titulo.trim()) return


  if (editando.value) {

    const indice =
      promociones.value.findIndex(
        item =>
          item.id === idEditando.value
      )


    if (indice !== -1) {

      promociones.value[indice] = {

        id: idEditando.value,

        ...form.value

      }

    }

  } else {

    promociones.value.unshift({

      id: Date.now(),

      ...form.value

    })

  }


  persistir()

  cerrar()
}


const eliminar = (promo) => {

  if (
    !window.confirm(
      `¿Eliminar "${promo.titulo}"?`
    )
  ) return


  promociones.value =
    promociones.value.filter(
      item =>
        item.id !== promo.id
    )


  persistir()
}


const cerrar = () => {

  mostrarModal.value = false

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

.vacio p {
  color: #858d98;
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
}

.btn-editar {
  background: #eaf5ff;
  color: #006bc5;
}

.btn-eliminar {
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
  background: rgba(20,28,40,.55);
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
}

.modal-header button {
  border: none;
  cursor: pointer;
}

.campo {
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo input,
.campo textarea {
  padding: 13px;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
}

.preview img {
  width: 100%;
  max-height: 260px;
  object-fit: contain;
}

.check {
  display: block;
  margin: 20px 0;
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