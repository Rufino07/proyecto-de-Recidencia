<template>

  <section class="pagina-productos">

    <!-- ===================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================== -->

    <div class="encabezado">

      <div>
        <span class="categoria">
          CATÁLOGO
        </span>

        <h2>
          🛒 Administración de Productos
        </h2>

        <p>
          Agrega, edita o elimina los productos
          que se mostrarán en Mega-Mex.
        </p>
      </div>


      <button
        class="btn-agregar"
        @click="abrirNuevoProducto"
      >
        + Agregar producto
      </button>

    </div>


    <!-- ===================================== -->
    <!-- PRODUCTOS VACÍOS -->
    <!-- ===================================== -->

    <div
      v-if="productos.length === 0"
      class="sin-productos"
    >

      <div class="icono-vacio">
        🛒
      </div>

      <h3>
        Aún no tienes productos
      </h3>

      <p>
        Agrega tu primer producto al catálogo de Mega-Mex.
      </p>

      <button
        class="btn-primer-producto"
        @click="abrirNuevoProducto"
      >
        + Agregar primer producto
      </button>

    </div>


    <!-- ===================================== -->
    <!-- LISTA DE PRODUCTOS -->
    <!-- ===================================== -->

    <div
      v-else
      class="contenedor-productos"
    >

      <div class="barra-lista">

        <div>
          <h3>
            Productos registrados
          </h3>

          <p>
            {{ productos.length }}
            {{ productos.length === 1 ? 'producto' : 'productos' }}
          </p>
        </div>

      </div>


      <div class="grid-productos">

        <article
          v-for="producto in productos"
          :key="producto.id"
          class="tarjeta-producto"
        >

          <!-- IMAGEN -->

          <div class="imagen-producto">

            <img
              v-if="producto.imagen"
              :src="producto.imagen"
              :alt="producto.nombre"
            >

            <div
              v-else
              class="sin-imagen"
            >
              📦
            </div>

            <span
              class="estado-producto"
              :class="producto.activo ? 'activo' : 'inactivo'"
            >
              {{ producto.activo ? 'Activo' : 'Oculto' }}
            </span>

          </div>


          <!-- INFORMACIÓN -->

          <div class="info-producto">

            <span class="tipo">
              {{ producto.tipo }}
            </span>

            <h3>
              {{ producto.nombre }}
            </h3>

            <p class="descripcion">
              {{ producto.descripcion || 'Sin descripción' }}
            </p>


            <div class="acciones">

              <button
                class="btn-editar"
                @click="editarProducto(producto)"
              >
                ✏️ Editar
              </button>


              <button
                class="btn-eliminar"
                @click="eliminarProducto(producto.id)"
              >
                🗑️ Eliminar
              </button>

            </div>

          </div>

        </article>

      </div>

    </div>


    <!-- ===================================== -->
    <!-- MODAL -->
    <!-- ===================================== -->

    <div
      v-if="mostrarModal"
      class="fondo-modal"
      @click.self="cerrarModal"
    >

      <div class="modal">

        <!-- CABECERA -->

        <div class="modal-header">

          <div>

            <span class="modal-categoria">
              PRODUCTO
            </span>

            <h3>
              {{ editando ? 'Editar producto' : 'Agregar producto' }}
            </h3>

          </div>


          <button
            class="btn-cerrar-modal"
            @click="cerrarModal"
          >
            ✕
          </button>

        </div>


        <!-- FORMULARIO -->

        <form
          class="formulario"
          @submit.prevent="guardarProducto"
        >

          <!-- NOMBRE -->

          <div class="campo">

            <label>
              Nombre del producto *
            </label>

            <input
              v-model="formulario.nombre"
              type="text"
              placeholder="Ejemplo: Arroz 1 kg"
              required
            >

          </div>


          <!-- TIPO -->

          <div class="campo">

            <label>
              Tipo de venta *
            </label>

            <select
              v-model="formulario.tipo"
              required
            >

              <option value="">
                Selecciona una opción
              </option>

              <option value="Mayoreo">
                Mayoreo
              </option>

              <option value="Menudeo">
                Menudeo
              </option>

              <option value="Mayoreo y menudeo">
                Mayoreo y menudeo
              </option>

            </select>

          </div>


          <!-- DESCRIPCIÓN -->

          <div class="campo">

            <label>
              Descripción
            </label>

            <textarea
              v-model="formulario.descripcion"
              rows="4"
              placeholder="Descripción del producto..."
            ></textarea>

          </div>


          <!-- IMAGEN -->

          <div class="campo">

            <label>
              Imagen del producto
            </label>

            <div class="subir-imagen">

              <input
                id="imagenProducto"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                @change="seleccionarImagen"
              >

              <label
                for="imagenProducto"
                class="selector-imagen"
              >

                <span class="icono-subir">
                  📷
                </span>

                <strong>
                  Seleccionar imagen
                </strong>

                <small>
                  PNG, JPG o WEBP
                </small>

              </label>

            </div>

          </div>


          <!-- PREVISUALIZACIÓN -->

          <div
            v-if="formulario.imagen"
            class="preview"
          >

            <p>
              Vista previa
            </p>

            <img
              :src="formulario.imagen"
              alt="Vista previa"
            >

            <button
              type="button"
              class="quitar-imagen"
              @click="formulario.imagen = ''"
            >
              Quitar imagen
            </button>

          </div>


          <!-- ESTADO -->

          <div class="campo estado-campo">

            <div>

              <label>
                Mostrar producto
              </label>

              <p>
                El producto será visible para los clientes.
              </p>

            </div>


            <label class="switch">

              <input
                v-model="formulario.activo"
                type="checkbox"
              >

              <span class="slider"></span>

            </label>

          </div>


          <!-- BOTONES -->

          <div class="acciones-modal">

            <button
              type="button"
              class="btn-cancelar"
              @click="cerrarModal"
            >
              Cancelar
            </button>


            <button
              type="submit"
              class="btn-guardar"
            >
              {{ editando ? 'Guardar cambios' : 'Agregar producto' }}
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- ===================================== -->
    <!-- MENSAJE -->
    <!-- ===================================== -->

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

import {
  ref,
  onMounted
} from 'vue'


// ============================================
// VARIABLES
// ============================================

const productos = ref([])

const mostrarModal = ref(false)

const editando = ref(false)

const productoEditandoId = ref(null)

const mensaje = ref('')


const formulario = ref({

  nombre: '',

  tipo: '',

  descripcion: '',

  imagen: '',

  activo: true

})


// ============================================
// CARGAR PRODUCTOS
// ============================================

onMounted(() => {

  const productosGuardados =
    localStorage.getItem('megaMexProductos')


  if (productosGuardados) {

    try {

      productos.value =
        JSON.parse(productosGuardados)

    }
    catch {

      productos.value = []

    }

  }

})


// ============================================
// GUARDAR EN LOCALSTORAGE
// ============================================

const guardarLocalStorage = () => {

  localStorage.setItem(
    'megaMexProductos',
    JSON.stringify(productos.value)
  )

}


// ============================================
// NUEVO PRODUCTO
// ============================================

const abrirNuevoProducto = () => {

  editando.value = false

  productoEditandoId.value = null


  formulario.value = {

    nombre: '',

    tipo: '',

    descripcion: '',

    imagen: '',

    activo: true

  }


  mostrarModal.value = true

}


// ============================================
// CERRAR MODAL
// ============================================

const cerrarModal = () => {

  mostrarModal.value = false

}


// ============================================
// SELECCIONAR IMAGEN
// ============================================

const seleccionarImagen = (event) => {

  const archivo =
    event.target.files[0]


  if (!archivo) {

    return

  }


  if (!archivo.type.startsWith('image/')) {

    mostrarMensaje(
      'Selecciona un archivo de imagen válido.'
    )

    return

  }


  const lector =
    new FileReader()


  lector.onload = (e) => {

    formulario.value.imagen =
      e.target.result

  }


  lector.readAsDataURL(archivo)

}


// ============================================
// GUARDAR PRODUCTO
// ============================================

const guardarProducto = () => {

  if (
    !formulario.value.nombre.trim() ||
    !formulario.value.tipo
  ) {

    mostrarMensaje(
      'Completa los campos obligatorios.'
    )

    return

  }


  // ==========================================
  // EDITANDO
  // ==========================================

  if (editando.value) {

    const indice =
      productos.value.findIndex(
        producto =>
          producto.id === productoEditandoId.value
      )


    if (indice !== -1) {

      productos.value[indice] = {

        ...productos.value[indice],

        nombre:
          formulario.value.nombre.trim(),

        tipo:
          formulario.value.tipo,

        descripcion:
          formulario.value.descripcion.trim(),

        imagen:
          formulario.value.imagen,

        activo:
          formulario.value.activo

      }

    }


    guardarLocalStorage()

    mostrarModal.value = false

    mostrarMensaje(
      'Producto actualizado correctamente.'
    )


    return

  }


  // ==========================================
  // NUEVO PRODUCTO
  // ==========================================

  const nuevoProducto = {

    id:
      Date.now(),

    nombre:
      formulario.value.nombre.trim(),

    tipo:
      formulario.value.tipo,

    descripcion:
      formulario.value.descripcion.trim(),

    imagen:
      formulario.value.imagen,

    activo:
      formulario.value.activo

  }


  productos.value.unshift(
    nuevoProducto
  )


  guardarLocalStorage()

  mostrarModal.value = false


  mostrarMensaje(
    'Producto agregado correctamente.'
  )

}


// ============================================
// EDITAR PRODUCTO
// ============================================

const editarProducto = (producto) => {

  editando.value = true

  productoEditandoId.value =
    producto.id


  formulario.value = {

    nombre:
      producto.nombre,

    tipo:
      producto.tipo,

    descripcion:
      producto.descripcion,

    imagen:
      producto.imagen,

    activo:
      producto.activo

  }


  mostrarModal.value = true

}


// ============================================
// ELIMINAR PRODUCTO
// ============================================

const eliminarProducto = (id) => {

  const producto =
    productos.value.find(
      producto =>
        producto.id === id
    )


  if (!producto) {

    return

  }


  const confirmar =
    window.confirm(
      `¿Seguro que deseas eliminar "${producto.nombre}"?`
    )


  if (!confirmar) {

    return

  }


  productos.value =
    productos.value.filter(
      producto =>
        producto.id !== id
    )


  guardarLocalStorage()


  mostrarMensaje(
    'Producto eliminado correctamente.'
  )

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

/* ========================================== */
/* PÁGINA */
/* ========================================== */

.pagina-productos {
  margin-top: 30px;
}


/* ========================================== */
/* ENCABEZADO */
/* ========================================== */

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

  color: #14935f;

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


/* ========================================== */
/* AGREGAR */
/* ========================================== */

.btn-agregar,
.btn-primer-producto {

  padding: 13px 20px;

  border: none;

  border-radius: 12px;

  background: #006bc5;

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition: 0.25s;

}


.btn-agregar:hover,
.btn-primer-producto:hover {

  background: #00549c;

  transform:
    translateY(-2px);

}


/* ========================================== */
/* VACÍO */
/* ========================================== */

.sin-productos {

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

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);

}


.icono-vacio {

  width: 100px;

  height: 100px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 28px;

  background: #e9f9f0;

  font-size: 50px;

}


.sin-productos h3 {

  margin:
    20px 0 8px;

  color: #202938;

}


.sin-productos p {

  margin:
    0 0 22px;

  color: #858d98;

}


/* ========================================== */
/* CONTENEDOR */
/* ========================================== */

.contenedor-productos {

  margin-top: 22px;

  padding: 28px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);

}


.barra-lista {

  margin-bottom: 25px;

}


.barra-lista h3 {

  margin: 0;

  color: #202938;

}


.barra-lista p {

  margin:
    5px 0 0;

  color: #8a929d;

  font-size: 13px;

}


/* ========================================== */
/* GRID */
/* ========================================== */

.grid-productos {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;

}


/* ========================================== */
/* TARJETA */
/* ========================================== */

.tarjeta-producto {

  overflow: hidden;

  border:
    1px solid #edf0f3;

  border-radius: 18px;

  background: white;

  transition: 0.3s;

}


.tarjeta-producto:hover {

  transform:
    translateY(-5px);

  box-shadow:
    0 12px 28px
    rgba(0, 0, 0, 0.09);

}


/* ========================================== */
/* IMAGEN */
/* ========================================== */

.imagen-producto {

  position: relative;

  height: 220px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f7f9fb;

}


.imagen-producto img {

  width: 100%;

  height: 100%;

  padding: 15px;

  object-fit: contain;

}


.sin-imagen {

  font-size: 65px;

}


/* ========================================== */
/* ESTADO */
/* ========================================== */

.estado-producto {

  position: absolute;

  top: 12px;

  right: 12px;

  padding:
    6px 10px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: bold;

}


.estado-producto.activo {

  background: #dcf8e9;

  color: #168b56;

}


.estado-producto.inactivo {

  background: #eceff3;

  color: #737b85;

}


/* ========================================== */
/* INFO */
/* ========================================== */

.info-producto {

  padding: 20px;

}


.tipo {

  color: #006bc5;

  font-size: 10px;

  font-weight: bold;

  text-transform: uppercase;

}


.info-producto h3 {

  margin:
    7px 0;

  color: #202938;

}


.descripcion {

  min-height: 40px;

  margin: 0;

  color: #7b838e;

  font-size: 13px;

  line-height: 1.5;

}


/* ========================================== */
/* ACCIONES */
/* ========================================== */

.acciones {

  margin-top: 20px;

  display: flex;

  gap: 10px;

}


.btn-editar,
.btn-eliminar {

  flex: 1;

  padding: 10px;

  border: none;

  border-radius: 9px;

  cursor: pointer;

  font-weight: bold;

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


/* ========================================== */
/* MODAL */
/* ========================================== */

.fondo-modal {

  position: fixed;

  z-index: 5000;

  inset: 0;

  padding: 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    rgba(20, 28, 40, 0.55);

  backdrop-filter:
    blur(4px);

}


.modal {

  width: 100%;

  max-width: 650px;

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border-radius: 22px;

  box-shadow:
    0 25px 60px
    rgba(0, 0, 0, 0.25);

}


.modal-header {

  padding: 25px 28px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  border-bottom:
    1px solid #edf0f3;

}


.modal-header h3 {

  margin:
    5px 0 0;

  color: #202938;

  font-size: 22px;

}


.modal-categoria {

  color: #006bc5;

  font-size: 10px;

  font-weight: bold;

}


.btn-cerrar-modal {

  width: 38px;

  height: 38px;

  border: none;

  border-radius: 10px;

  background: #f2f4f6;

  cursor: pointer;

  font-size: 18px;

}


/* ========================================== */
/* FORMULARIO */
/* ========================================== */

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

  color: #343c48;

  font-size: 13px;

  font-weight: bold;

}


.campo input,
.campo select,
.campo textarea {

  width: 100%;

  padding:
    13px 14px;

  border:
    1px solid #dfe4ea;

  border-radius: 10px;

  outline: none;

  font-family: inherit;

  font-size: 14px;

}


.campo textarea {

  resize: vertical;

}


.campo input:focus,
.campo select:focus,
.campo textarea:focus {

  border-color: #006bc5;

  box-shadow:
    0 0 0 3px
    rgba(0, 107, 197, 0.10);

}


/* ========================================== */
/* SUBIR IMAGEN */
/* ========================================== */

.subir-imagen input {

  display: none;

}


.selector-imagen {

  padding: 25px;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 5px;

  border:
    2px dashed #cad3dc;

  border-radius: 14px;

  background: #f9fbfd;

  cursor: pointer;

  text-align: center;

}


.selector-imagen:hover {

  border-color: #006bc5;

  background: #f2f9ff;

}


.icono-subir {

  font-size: 35px;

}


.selector-imagen small {

  color: #8b939e;

}


/* ========================================== */
/* PREVIEW */
/* ========================================== */

.preview {

  margin-bottom: 20px;

  padding: 15px;

  border-radius: 14px;

  background: #f7f9fb;

  text-align: center;

}


.preview p {

  margin:
    0 0 10px;

  color: #626b76;

  font-size: 12px;

  font-weight: bold;

}


.preview img {

  width: 100%;

  max-height: 250px;

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


/* ========================================== */
/* SWITCH */
/* ========================================== */

.estado-campo {

  flex-direction: row;

  justify-content: space-between;

  align-items: center;

  padding: 15px;

  border-radius: 12px;

  background: #f8fafc;

}


.estado-campo p {

  margin:
    4px 0 0;

  color: #8b939e;

  font-size: 12px;

}


.switch {

  position: relative;

  width: 48px;

  height: 25px;

}


.switch input {

  display: none;

}


.slider {

  position: absolute;

  inset: 0;

  border-radius: 30px;

  background: #c8ced5;

  cursor: pointer;

  transition: 0.3s;

}


.slider::before {

  content: '';

  position: absolute;

  width: 19px;

  height: 19px;

  top: 3px;

  left: 4px;

  border-radius: 50%;

  background: white;

  transition: 0.3s;

}


.switch input:checked + .slider {

  background: #16a36a;

}


.switch input:checked + .slider::before {

  transform:
    translateX(21px);

}


/* ========================================== */
/* BOTONES MODAL */
/* ========================================== */

.acciones-modal {

  padding-top: 20px;

  display: flex;

  justify-content: flex-end;

  gap: 12px;

  border-top:
    1px solid #edf0f3;

}


.btn-cancelar,
.btn-guardar {

  padding:
    12px 20px;

  border: none;

  border-radius: 10px;

  cursor: pointer;

  font-weight: bold;

}


.btn-cancelar {

  background: #edf0f3;

  color: #555e69;

}


.btn-guardar {

  background: #006bc5;

  color: white;

}


.btn-guardar:hover {

  background: #00539a;

}


/* ========================================== */
/* MENSAJE */
/* ========================================== */

.mensaje {

  position: fixed;

  z-index: 9999;

  right: 30px;

  bottom: 30px;

  padding:
    16px 20px;

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


/* ========================================== */
/* TABLET */
/* ========================================== */

@media (max-width: 1100px) {

  .grid-productos {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


/* ========================================== */
/* CELULAR */
/* ========================================== */

@media (max-width: 700px) {

  .encabezado {

    flex-direction: column;

    align-items: flex-start;

  }


  .btn-agregar {

    width: 100%;

  }


  .grid-productos {

    grid-template-columns:
      1fr;

  }


  .acciones-modal {

    flex-direction: column;

  }


  .btn-cancelar,
  .btn-guardar {

    width: 100%;

  }

}

</style>