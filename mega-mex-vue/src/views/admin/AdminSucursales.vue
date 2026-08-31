<template>
  <section class="pagina-admin">

    <!-- ============================== -->
    <!-- ENCABEZADO -->
    <!-- ============================== -->

    <div class="encabezado">
      <div>
        <span class="categoria">
          EMPRESA
        </span>

        <h2>
          🏪 Administración de Sucursales
        </h2>

        <p>
          Agrega, edita o elimina las sucursales de Mega-Mex.
        </p>
      </div>

      <button
        class="btn-principal"
        @click="abrirNueva"
      >
        + Agregar sucursal
      </button>
    </div>


    <!-- ============================== -->
    <!-- SIN SUCURSALES -->
    <!-- ============================== -->

    <div
      v-if="sucursales.length === 0"
      class="vacio"
    >
      <div class="icono-vacio">
        🏪
      </div>

      <h3>
        Aún no tienes sucursales
      </h3>

      <p>
        Agrega la primera sucursal de Mega-Mex.
      </p>

      <button
        class="btn-principal"
        @click="abrirNueva"
      >
        + Agregar primera sucursal
      </button>
    </div>


    <!-- ============================== -->
    <!-- LISTA DE SUCURSALES -->
    <!-- ============================== -->

    <div
      v-else
      class="contenedor"
    >
      <div class="titulo-lista">
        <h3>
          Sucursales registradas
        </h3>

        <p>
          {{ sucursales.length }}
          {{ sucursales.length === 1 ? 'sucursal' : 'sucursales' }}
        </p>
      </div>


      <div class="grid">

        <article
          v-for="sucursal in sucursales"
          :key="sucursal.id"
          class="tarjeta"
        >

          <div class="cabecera-tarjeta">

            <div class="icono-sucursal">
              🏪
            </div>

            <span
              class="estado"
              :class="sucursal.activa ? 'activo' : 'inactivo'"
            >
              {{ sucursal.activa ? 'Activa' : 'Oculta' }}
            </span>

          </div>


          <div class="info">

            <span class="mini-titulo">
              SUCURSAL
            </span>

            <h3>
              {{ sucursal.nombre }}
            </h3>


            <div class="dato">
              <span>📍</span>

              <p>
                {{ sucursal.direccion || 'Sin dirección' }}
              </p>
            </div>


            <div class="dato">
              <span>📞</span>

              <p>
                {{ sucursal.telefono || 'Sin teléfono' }}
              </p>
            </div>


            <div class="dato">
              <span>🕐</span>

              <p>
                {{ sucursal.horario || 'Sin horario' }}
              </p>
            </div>


            <div class="acciones">

              <button
                class="btn-editar"
                @click="editarSucursal(sucursal)"
              >
                ✏️ Editar
              </button>

              <button
                class="btn-eliminar"
                @click="eliminarSucursal(sucursal)"
              >
                🗑️ Eliminar
              </button>

            </div>

          </div>

        </article>

      </div>
    </div>


    <!-- ============================== -->
    <!-- MODAL -->
    <!-- ============================== -->

    <div
      v-if="mostrarModal"
      class="fondo-modal"
      @click.self="cerrarModal"
    >

      <div class="modal">

        <!-- HEADER MODAL -->

        <div class="modal-header">

          <div>
            <span class="categoria">
              SUCURSAL
            </span>

            <h3>
              {{ editando ? 'Editar sucursal' : 'Agregar sucursal' }}
            </h3>
          </div>

          <button
            class="btn-cerrar"
            @click="cerrarModal"
          >
            ✕
          </button>

        </div>


        <!-- FORMULARIO -->

        <form
          class="formulario"
          @submit.prevent="guardarSucursal"
        >

          <!-- NOMBRE -->

          <div class="campo">
            <label>
              Nombre de la sucursal *
            </label>

            <input
              v-model="form.nombre"
              type="text"
              placeholder="Ejemplo: Mega-Mex Yucudaa"
              required
            >
          </div>


          <!-- DIRECCIÓN -->

          <div class="campo">
            <label>
              Dirección *
            </label>

            <textarea
              v-model="form.direccion"
              rows="3"
              placeholder="Escribe la dirección de la sucursal"
              required
            ></textarea>
          </div>


          <!-- TELÉFONO -->

          <div class="campo">
            <label>
              Teléfono
            </label>

            <input
              v-model="form.telefono"
              type="text"
              placeholder="Ejemplo: 953 000 0000"
            >
          </div>


          <!-- HORARIO -->

          <div class="campo">
            <label>
              Horario
            </label>

            <input
              v-model="form.horario"
              type="text"
              placeholder="Ejemplo: Lunes a domingo 8:00 AM - 9:00 PM"
            >
          </div>


          <!-- GOOGLE MAPS -->

          <div class="campo">
            <label>
              Enlace de Google Maps
            </label>

            <input
              v-model="form.mapa"
              type="text"
              placeholder="Pega aquí el enlace de Google Maps"
            >
          </div>


          <!-- ESTADO -->

          <div class="estado-form">

            <div>
              <strong>
                Mostrar sucursal
              </strong>

              <p>
                La sucursal será visible para los usuarios.
              </p>
            </div>

            <label class="switch">

              <input
                v-model="form.activa"
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
              class="btn-principal"
            >
              {{ editando ? 'Guardar cambios' : 'Agregar sucursal' }}
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- ============================== -->
    <!-- MENSAJE -->
    <!-- ============================== -->

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

const sucursales = ref([])

const mostrarModal = ref(false)

const editando = ref(false)

const idEditando = ref(null)

const mensaje = ref('')


const form = ref({
  nombre: '',
  direccion: '',
  telefono: '',
  horario: '',
  mapa: '',
  activa: true
})


// ============================================
// CARGAR SUCURSALES
// ============================================

onMounted(() => {

  const datos =
    localStorage.getItem('megaMexSucursales')


  if (datos) {

    try {

      sucursales.value =
        JSON.parse(datos)

    } catch {

      sucursales.value = []

    }

  }

})


// ============================================
// GUARDAR EN LOCALSTORAGE
// ============================================

const guardarLocal = () => {

  localStorage.setItem(
    'megaMexSucursales',
    JSON.stringify(sucursales.value)
  )

}


// ============================================
// NUEVA SUCURSAL
// ============================================

const abrirNueva = () => {

  editando.value = false

  idEditando.value = null


  form.value = {
    nombre: '',
    direccion: '',
    telefono: '',
    horario: '',
    mapa: '',
    activa: true
  }


  mostrarModal.value = true

}


// ============================================
// EDITAR
// ============================================

const editarSucursal = (sucursal) => {

  editando.value = true

  idEditando.value = sucursal.id


  form.value = {
    nombre: sucursal.nombre,
    direccion: sucursal.direccion,
    telefono: sucursal.telefono,
    horario: sucursal.horario,
    mapa: sucursal.mapa,
    activa: sucursal.activa
  }


  mostrarModal.value = true

}


// ============================================
// GUARDAR
// ============================================

const guardarSucursal = () => {

  if (
    !form.value.nombre.trim() ||
    !form.value.direccion.trim()
  ) {

    mostrarMensaje(
      'Completa los campos obligatorios.'
    )

    return

  }


  // EDITAR
  if (editando.value) {

    const indice =
      sucursales.value.findIndex(
        item =>
          item.id === idEditando.value
      )


    if (indice !== -1) {

      sucursales.value[indice] = {

        id: idEditando.value,

        nombre:
          form.value.nombre.trim(),

        direccion:
          form.value.direccion.trim(),

        telefono:
          form.value.telefono.trim(),

        horario:
          form.value.horario.trim(),

        mapa:
          form.value.mapa.trim(),

        activa:
          form.value.activa

      }

    }


    guardarLocal()

    cerrarModal()

    mostrarMensaje(
      'Sucursal actualizada correctamente.'
    )

    return

  }


  // NUEVA
  const nuevaSucursal = {

    id: Date.now(),

    nombre:
      form.value.nombre.trim(),

    direccion:
      form.value.direccion.trim(),

    telefono:
      form.value.telefono.trim(),

    horario:
      form.value.horario.trim(),

    mapa:
      form.value.mapa.trim(),

    activa:
      form.value.activa

  }


  sucursales.value.unshift(
    nuevaSucursal
  )


  guardarLocal()

  cerrarModal()

  mostrarMensaje(
    'Sucursal agregada correctamente.'
  )

}


// ============================================
// ELIMINAR
// ============================================

const eliminarSucursal = (sucursal) => {

  const confirmar =
    window.confirm(
      `¿Seguro que deseas eliminar "${sucursal.nombre}"?`
    )


  if (!confirmar) {

    return

  }


  sucursales.value =
    sucursales.value.filter(
      item =>
        item.id !== sucursal.id
    )


  guardarLocal()


  mostrarMensaje(
    'Sucursal eliminada correctamente.'
  )

}


// ============================================
// CERRAR MODAL
// ============================================

const cerrarModal = () => {

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

/* ========================================== */
/* PÁGINA */
/* ========================================== */

.pagina-admin {
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


.categoria,
.mini-titulo {
  color: #7847b7;

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
/* BOTÓN PRINCIPAL */
/* ========================================== */

.btn-principal {
  padding: 13px 20px;

  border: none;

  border-radius: 12px;

  background: #006bc5;

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition: 0.25s;
}


.btn-principal:hover {
  background: #00549c;

  transform: translateY(-2px);
}


/* ========================================== */
/* VACÍO */
/* ========================================== */

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

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);
}


.icono-vacio {
  width: 100px;

  height: 100px;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #f2eaff;

  border-radius: 28px;

  font-size: 50px;
}


.vacio h3 {
  margin: 20px 0 7px;

  color: #202938;
}


.vacio p {
  margin: 0 0 20px;

  color: #858d98;
}


/* ========================================== */
/* CONTENEDOR */
/* ========================================== */

.contenedor {
  margin-top: 22px;

  padding: 28px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);
}


.titulo-lista h3 {
  margin: 0;

  color: #202938;
}


.titulo-lista p {
  margin: 5px 0 25px;

  color: #858d98;
}


/* ========================================== */
/* GRID */
/* ========================================== */

.grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;
}


/* ========================================== */
/* TARJETAS */
/* ========================================== */

.tarjeta {
  overflow: hidden;

  border:
    1px solid #edf0f3;

  border-radius: 18px;

  background: white;

  transition: 0.3s;
}


.tarjeta:hover {
  transform: translateY(-5px);

  box-shadow:
    0 12px 28px
    rgba(0, 0, 0, 0.09);
}


.cabecera-tarjeta {
  position: relative;

  height: 140px;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    linear-gradient(
      135deg,
      #f8f3ff,
      #eee5ff
    );
}


.icono-sucursal {
  width: 75px;

  height: 75px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 22px;

  background: white;

  font-size: 38px;

  box-shadow:
    0 7px 20px
    rgba(0, 0, 0, 0.08);
}


/* ========================================== */
/* ESTADO */
/* ========================================== */

.estado {
  position: absolute;

  top: 12px;

  right: 12px;

  padding: 6px 10px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: bold;
}


.estado.activo {
  background: #dcf8e9;

  color: #168b56;
}


.estado.inactivo {
  background: #eceff3;

  color: #737b85;
}


/* ========================================== */
/* INFORMACIÓN */
/* ========================================== */

.info {
  padding: 20px;
}


.info h3 {
  margin: 7px 0 18px;

  color: #202938;

  font-size: 18px;
}


.dato {
  margin-bottom: 10px;

  display: flex;

  align-items: flex-start;

  gap: 8px;
}


.dato p {
  margin: 0;

  color: #727b87;

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

  backdrop-filter: blur(4px);
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
  margin: 5px 0 0;

  color: #202938;

  font-size: 22px;
}


.btn-cerrar {
  width: 38px;

  height: 38px;

  border: none;

  border-radius: 10px;

  background: #f1f3f5;

  color: #555;

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
.campo textarea {
  width: 100%;

  padding: 13px 14px;

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
.campo textarea:focus {
  border-color: #006bc5;

  box-shadow:
    0 0 0 3px
    rgba(0, 107, 197, 0.10);
}


/* ========================================== */
/* ESTADO FORMULARIO */
/* ========================================== */

.estado-form {
  margin-bottom: 20px;

  padding: 15px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  background: #f8fafc;

  border-radius: 12px;
}


.estado-form strong {
  color: #343c48;
}


.estado-form p {
  margin: 4px 0 0;

  color: #858d98;

  font-size: 12px;
}


/* ========================================== */
/* SWITCH */
/* ========================================== */

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
  transform: translateX(21px);
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


.btn-cancelar {
  padding: 12px 20px;

  border: none;

  border-radius: 10px;

  background: #edf0f3;

  color: #555e69;

  cursor: pointer;

  font-weight: bold;
}


/* ========================================== */
/* MENSAJE */
/* ========================================== */

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

  transform: translateY(20px);
}


/* ========================================== */
/* TABLET */
/* ========================================== */

@media (max-width: 1100px) {

  .grid {
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


  .btn-principal {
    width: 100%;
  }


  .grid {
    grid-template-columns: 1fr;
  }


  .acciones-modal {
    flex-direction: column;
  }


  .btn-cancelar,
  .acciones-modal .btn-principal {
    width: 100%;
  }

}

</style>