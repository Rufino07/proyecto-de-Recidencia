<template>
  <div class="pagina-admin">

    <!-- ===================================== -->
    <!-- FONDOS DECORATIVOS -->
    <!-- ===================================== -->

    <div class="fondo-luz luz-1"></div>
    <div class="fondo-luz luz-2"></div>


    <!-- ===================================== -->
    <!-- CONTENEDOR PRINCIPAL -->
    <!-- ===================================== -->

    <section class="panel">


      <!-- ===================================== -->
      <!-- ENCABEZADO -->
      <!-- ===================================== -->

      <header class="encabezado-admin">

        <div class="titulo-bloque">

          <div class="icono-admin">
            🛡️
          </div>

          <div class="texto-bloque">

            <h1>
              Gestión de usuarios
            </h1>

            <p>
              Administra roles, activa o desactiva cuentas
              y consulta los usuarios registrados.
            </p>

          </div>

        </div>

        <div class="contador-usuarios">

          <span class="contador-numero">
            {{ usuariosFiltrados.length }}
          </span>

          <span class="contador-etiqueta">
            {{ usuariosFiltrados.length === 1 ? 'usuario' : 'usuarios' }}
          </span>

        </div>

      </header>


      <!-- ===================================== -->
      <!-- FILTROS -->
      <!-- ===================================== -->

      <section class="barra-filtros">

        <div class="campo-busqueda">

          <span class="icono-input">🔍</span>

          <input
            v-model="buscar"
            type="text"
            placeholder="Buscar por nombre o correo..."
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            :disabled="cargando"
          >

          <button
            v-if="buscar"
            type="button"
            class="btn-limpiar"
            title="Limpiar búsqueda"
            @click="buscar = ''"
          >
            ✕
          </button>

        </div>

        <div class="campo-select">

          <label for="filtro-rol">
            Rol
          </label>

          <select
            id="filtro-rol"
            v-model="filtroRol"
            :disabled="cargando"
          >
            <option value="">Todos</option>
            <option value="admin">Administrador</option>
            <option value="cliente">Cliente</option>
          </select>

        </div>

        <div class="campo-select">

          <label for="filtro-estado">
            Estado
          </label>

          <select
            id="filtro-estado"
            v-model="filtroEstado"
            :disabled="cargando"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>

        </div>

      </section>


      <!-- ===================================== -->
      <!-- MENSAJE DE ERROR -->
      <!-- ===================================== -->

      <Transition name="mensaje">
        <div v-if="error" class="mensaje-error">
          <span>⚠️</span>
          {{ error }}
        </div>
      </Transition>

      <!-- ===================================== -->
      <!-- MENSAJE DE ÉXITO -->
      <!-- ===================================== -->

      <Transition name="mensaje">
        <div v-if="mensajeExito" class="mensaje-info">
          <span>✅</span>
          {{ mensajeExito }}
        </div>
      </Transition>


      <!-- ===================================== -->
      <!-- ESTADO: CARGANDO -->
      <!-- ===================================== -->

      <div v-if="cargando" class="estado-cargando">

        <div class="loader-grande"></div>

        <p>Cargando usuarios...</p>

      </div>


      <!-- ===================================== -->
      <!-- ESTADO: SIN RESULTADOS -->
      <!-- ===================================== -->

      <div
        v-else-if="usuariosFiltrados.length === 0"
        class="estado-vacio"
      >

        <span class="emoji-vacio">
          {{ usuarios.length === 0 ? '📭' : '🔍' }}
        </span>

        <h3>
          {{ usuarios.length === 0
            ? 'No hay usuarios registrados'
            : 'No se encontraron coincidencias' }}
        </h3>

        <p>
          {{ usuarios.length === 0
            ? 'Cuando alguien se registre, aparecerá aquí.'
            : 'Prueba con otros filtros o términos de búsqueda.' }}
        </p>

        <button
          v-if="usuarios.length > 0"
          type="button"
          class="btn-limpiar-filtros"
          @click="limpiarFiltros"
        >
          Limpiar filtros
        </button>

      </div>


      <!-- ===================================== -->
      <!-- TABLA DE USUARIOS -->
      <!-- ===================================== -->

      <div v-else class="tabla-contenedor">

        <table class="tabla-usuarios">

          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Registro</th>
              <th class="col-acciones">Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="usuario in usuariosFiltrados"
              :key="usuario.id"
              :class="{
                'fila-inactiva': !usuario.activo,
                'fila-propia': usuario.id === usuarioActualId
              }"
            >

              <!-- USUARIO (AVATAR + NOMBRE + CORREO) -->
              <td>
                <div class="celda-usuario">

                  <div
                    class="avatar"
                    :class="`avatar-${usuario.rol}`"
                  >
                    {{ inicialUsuario(usuario.nombre) }}
                  </div>

                  <div class="datos-usuario">

                    <div class="nombre-linea">

                      <span class="nombre">
                        {{ usuario.nombre }}
                      </span>

                      <span
                        v-if="usuario.id === usuarioActualId"
                        class="badge-tu"
                      >
                        Tú
                      </span>

                    </div>

                    <span class="correo">
                      {{ usuario.correo }}
                    </span>

                  </div>

                </div>
              </td>

              <!-- ROL -->
              <td>
                <span
                  class="badge-rol"
                  :class="`badge-${usuario.rol}`"
                >
                  {{ usuario.rol === 'admin' ? '🔐 Admin' : '👤 Cliente' }}
                </span>
              </td>

              <!-- ESTADO -->
              <td>
                <span
                  class="badge-estado"
                  :class="usuario.activo ? 'estado-activo' : 'estado-inactivo'"
                >
                  <span class="punto"></span>
                  {{ usuario.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>

              <!-- FECHA DE REGISTRO -->
              <td class="celda-fecha">
                {{ formatearFecha(usuario.creado_en) }}
              </td>

              <!-- ACCIONES -->
              <td class="col-acciones">
                <div class="grupo-acciones">

                  <!-- CAMBIAR ROL -->
                  <!-- Solo se muestra para degradar a un admin a cliente.
                       NUNCA se muestra "Hacer admin" porque solo puede
                       existir 1 administrador en el sistema. -->
                  <button
                    v-if="usuario.rol === 'admin' && usuario.id !== usuarioActualId"
                    type="button"
                    class="btn-accion btn-rol"
                    :disabled="procesando === usuario.id"
                    title="Convertir en cliente"
                    @click="toggleRol(usuario)"
                  >
                    <span v-if="procesando === usuario.id" class="loader-chico"></span>
                    <span v-else>👤</span>
                    <span class="texto-accion">Hacer cliente</span>
                  </button>

                  <!-- ACTIVAR / DESACTIVAR -->
                  <button
                    type="button"
                    class="btn-accion"
                    :class="usuario.activo ? 'btn-desactivar' : 'btn-activar'"
                    :disabled="procesando === usuario.id || usuario.id === usuarioActualId"
                    :title="usuario.id === usuarioActualId
                      ? 'No puedes desactivar tu propia cuenta'
                      : (usuario.activo ? 'Desactivar usuario' : 'Activar usuario')"
                    @click="toggleEstado(usuario)"
                  >
                    <span v-if="procesando === usuario.id" class="loader-chico"></span>
                    <span v-else>{{ usuario.activo ? '🚫' : '✅' }}</span>
                    <span class="texto-accion">
                      {{ usuario.activo ? 'Desactivar' : 'Activar' }}
                    </span>
                  </button>

                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>


    </section>


    <!-- ===================================== -->
    <!-- MODAL DE CONFIRMACIÓN -->
    <!-- ===================================== -->

    <Transition name="modal">

      <div
        v-if="confirmacion.visible"
        class="modal-fondo"
        @click.self="cerrarConfirmacion"
      >

        <div class="modal-caja">

          <div class="modal-icono">
            {{ confirmacion.icono }}
          </div>

          <h3 class="modal-titulo">
            {{ confirmacion.titulo }}
          </h3>

          <p class="modal-mensaje">
            {{ confirmacion.mensaje }}
          </p>

          <div class="modal-acciones">

            <button
              type="button"
              class="btn-modal btn-cancelar"
              :disabled="procesando !== null"
              @click="cerrarConfirmacion"
            >
              Cancelar
            </button>

            <button
              type="button"
              class="btn-modal"
              :class="confirmacion.peligro ? 'btn-peligro' : 'btn-confirmar'"
              :disabled="procesando !== null"
              @click="confirmacion.onConfirmar"
            >
              <span v-if="procesando !== null" class="loader-chico"></span>
              <span v-else>{{ confirmacion.textoConfirmar }}</span>
            </button>

          </div>

        </div>

      </div>

    </Transition>


  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../utils/api'

// ============================================
// ROUTER
// ============================================

const router = useRouter()

// ============================================
// ESTADO
// ============================================

const usuarios = ref([])
const cargando = ref(false)
const error = ref('')
const mensajeExito = ref('')
const procesando = ref(null)   // id del usuario que se está procesando

// ============================================
// FILTROS
// ============================================

const buscar = ref('')
const filtroRol = ref('')
const filtroEstado = ref('')

// ============================================
// USUARIO ACTUAL (para no permitir auto-modificarse)
// ============================================

const usuarioActualId = ref(null)

// ============================================
// MODAL DE CONFIRMACIÓN
// ============================================

const confirmacion = ref({
  visible: false,
  icono: '',
  titulo: '',
  mensaje: '',
  textoConfirmar: 'Confirmar',
  peligro: false,
  onConfirmar: () => {}
})

// ============================================
// COMPUTED: USUARIOS FILTRADOS (en cliente)
// ============================================

const usuariosFiltrados = computed(() => {
  const texto = buscar.value.trim().toLowerCase()
  const rol = filtroRol.value
  const estado = filtroEstado.value

  return usuarios.value.filter(u => {
    // Búsqueda por nombre o correo
    if (texto) {
      const coincideNombre = u.nombre.toLowerCase().includes(texto)
      const coincideCorreo = u.correo.toLowerCase().includes(texto)
      if (!coincideNombre && !coincideCorreo) return false
    }

    // Filtro por rol
    if (rol && u.rol !== rol) return false

    // Filtro por estado
    if (estado !== '') {
      const activoBool = estado === 'true'
      if (u.activo !== activoBool) return false
    }

    return true
  })
})

// ============================================
// MOUNT
// ============================================

onMounted(() => {
  cargarUsuarioActual()
  cargarUsuarios()
})

// ============================================
// CARGAR USUARIO ACTUAL DESDE localStorage
// ============================================

const cargarUsuarioActual = () => {
  try {
    const guardado = localStorage.getItem('usuarioMegaMex')
    if (guardado) {
      const u = JSON.parse(guardado)
      usuarioActualId.value = u.id
    }
  } catch {
    // Si falla, simplemente no marcamos al usuario actual
  }
}

// ============================================
// CARGAR LISTA DE USUARIOS
// ============================================

const cargarUsuarios = async () => {
  cargando.value = true
  error.value = ''

  try {
    const res = await apiFetch('/usuarios')
    const datos = await res.json()

    if (!res.ok || !datos.ok) {
      throw new Error(datos.mensaje || 'No se pudieron cargar los usuarios.')
    }

    usuarios.value = datos.usuarios || []

  } catch (err) {
    error.value = err.message || 'Error al cargar los usuarios.'
  } finally {
    cargando.value = false
  }
}

// ============================================
// LIMPIAR FILTROS
// ============================================

const limpiarFiltros = () => {
  buscar.value = ''
  filtroRol.value = ''
  filtroEstado.value = ''
}

// ============================================
// INICIAL DEL NOMBRE (para el avatar)
// ============================================

const inicialUsuario = (nombre) => {
  if (!nombre) return '?'
  return nombre.trim().charAt(0).toUpperCase()
}

// ============================================
// FORMATEAR FECHA
// ============================================

const formatearFecha = (fechaISO) => {
  if (!fechaISO) return '—'

  try {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return '—'
  }
}

// ============================================
// MOSTRAR MENSAJE DE ÉXITO TEMPORAL
// ============================================

const mostrarExito = (texto) => {
  mensajeExito.value = texto
  setTimeout(() => {
    mensajeExito.value = ''
  }, 3000)
}

// ============================================
// CAMBIAR ROL (abre modal de confirmación)
// Solo se usa para degradar admin → cliente
// ============================================

const toggleRol = (usuario) => {
  if (usuario.id === usuarioActualId.value) return

  // Solo permitimos degradar: admin → cliente
  const nuevoRol = 'cliente'
  const esSubir = false

  confirmacion.value = {
    visible: true,
    icono: '👤',
    titulo: 'Quitar permisos de admin',
    mensaje: `¿Seguro que quieres quitar los permisos de administrador a ${usuario.nombre}?`,
    textoConfirmar: 'Sí, hacer cliente',
    peligro: true,
    onConfirmar: () => ejecutarCambioRol(usuario, nuevoRol)
  }
}

// ============================================
// EJECUTAR CAMBIO DE ROL
// ============================================

const ejecutarCambioRol = async (usuario, nuevoRol) => {
  procesando.value = usuario.id
  error.value = ''

  try {
    const res = await apiFetch(`/usuarios/${usuario.id}/rol`, {
      method: 'PUT',
      body: JSON.stringify({ rol: nuevoRol })
    })

    const datos = await res.json()

    if (!res.ok || !datos.ok) {
      throw new Error(datos.mensaje || 'No se pudo cambiar el rol.')
    }

    // Actualizar en la lista local
    const idx = usuarios.value.findIndex(u => u.id === usuario.id)
    if (idx !== -1) {
      usuarios.value[idx] = datos.usuario
    }

    mostrarExito(`${usuario.nombre} ahora es cliente.`)

    cerrarConfirmacion()

  } catch (err) {
    error.value = err.message || 'Error al cambiar el rol.'
    cerrarConfirmacion()
  } finally {
    procesando.value = null
  }
}

// ============================================
// CAMBIAR ESTADO (abre modal)
// ============================================

const toggleEstado = (usuario) => {
  if (usuario.id === usuarioActualId.value) return

  const nuevoEstado = !usuario.activo

  confirmacion.value = {
    visible: true,
    icono: nuevoEstado ? '✅' : '🚫',
    titulo: nuevoEstado ? 'Activar usuario' : 'Desactivar usuario',
    mensaje: nuevoEstado
      ? `¿Reactivar la cuenta de ${usuario.nombre}? Podrá volver a iniciar sesión.`
      : `¿Desactivar la cuenta de ${usuario.nombre}? No podrá iniciar sesión hasta que la reactives.`,
    textoConfirmar: nuevoEstado ? 'Sí, activar' : 'Sí, desactivar',
    peligro: !nuevoEstado,
    onConfirmar: () => ejecutarCambioEstado(usuario, nuevoEstado)
  }
}

// ============================================
// EJECUTAR CAMBIO DE ESTADO
// ============================================

const ejecutarCambioEstado = async (usuario, nuevoEstado) => {
  procesando.value = usuario.id
  error.value = ''

  try {
    const res = await apiFetch(`/usuarios/${usuario.id}/estado`, {
      method: 'PUT',
      body: JSON.stringify({ activo: nuevoEstado })
    })

    const datos = await res.json()

    if (!res.ok || !datos.ok) {
      throw new Error(datos.mensaje || 'No se pudo cambiar el estado.')
    }

    const idx = usuarios.value.findIndex(u => u.id === usuario.id)
    if (idx !== -1) {
      usuarios.value[idx] = datos.usuario
    }

    mostrarExito(
      nuevoEstado
        ? `${usuario.nombre} ha sido activado.`
        : `${usuario.nombre} ha sido desactivado.`
    )

    cerrarConfirmacion()

  } catch (err) {
    error.value = err.message || 'Error al cambiar el estado.'
    cerrarConfirmacion()
  } finally {
    procesando.value = null
  }
}

// ============================================
// CERRAR MODAL
// ============================================

const cerrarConfirmacion = () => {
  confirmacion.value.visible = false
}
</script>


<style scoped>

/* ========================================== */
/* PÁGINA */
/* ========================================== */

.pagina-admin {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
  overflow-x: hidden;
  background: linear-gradient(180deg, #f5f9fd 0%, #eaf3fb 100%);
  font-family: Arial, Helvetica, sans-serif;
}

.fondo-luz {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 107, 197, 0.05);
  pointer-events: none;
}

.luz-1 {
  width: 480px;
  height: 480px;
  top: -200px;
  right: -180px;
}

.luz-2 {
  width: 340px;
  height: 340px;
  bottom: -140px;
  left: -120px;
}


/* ========================================== */
/* PANEL PRINCIPAL */
/* ========================================== */

.panel {
  position: relative;
  z-index: 5;
  width: min(1250px, 100%);
  margin: 0 auto;
  padding: 34px 38px 38px;
  border-radius: 26px;
  background: white;
  box-shadow: 0 25px 70px rgba(0, 40, 90, 0.10);
  border: 1px solid #e3edf7;
}


/* ========================================== */
/* ENCABEZADO */
/* ========================================== */

.encabezado-admin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eaf1f8;
  flex-wrap: wrap;
}

.titulo-bloque {
  display: flex;
  align-items: center;
  gap: 18px;
}

.icono-admin {
  width: 64px;
  height: 64px;
  min-width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #e4f3ff, #f0f8ff);
  font-size: 30px;
  box-shadow: 0 9px 20px rgba(0, 107, 197, 0.12);
}

.texto-bloque h1 {
  margin: 0 0 5px;
  color: #172033;
  font-size: 25px;
}

.texto-bloque p {
  margin: 0;
  color: #7c8798;
  font-size: 13px;
  max-width: 520px;
}

.contador-usuarios {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, #eaf6ff, #f5fbff);
  border: 1px solid #d6ecff;
}

.contador-numero {
  font-size: 28px;
  font-weight: 800;
  color: #006bc5;
  line-height: 1;
}

.contador-etiqueta {
  font-size: 11px;
  color: #5f7590;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 3px;
}


/* ========================================== */
/* BARRA DE FILTROS */
/* ========================================== */

.barra-filtros {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 200px 200px;
  gap: 16px;
  align-items: end;
}

.campo-busqueda {
  position: relative;
  display: flex;
  align-items: center;
}

.campo-busqueda .icono-input {
  position: absolute;
  left: 16px;
  z-index: 2;
  opacity: 0.65;
  font-size: 15px;
}

.campo-busqueda input {
  width: 100%;
  height: 52px;
  padding: 0 45px;
  border: 1px solid #d5dde7;
  border-radius: 14px;
  outline: none;
  background: white;
  color: #273447;
  font-size: 14px;
  transition: all 0.3s ease;
}

.campo-busqueda input:hover {
  border-color: #a8cce7;
}

.campo-busqueda input:focus {
  border-color: #006bc5;
  box-shadow: 0 0 0 4px rgba(0, 107, 197, 0.10);
}

.btn-limpiar {
  position: absolute;
  right: 12px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #eef4fa;
  color: #6a7b8f;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s ease;
}

.btn-limpiar:hover {
  background: #dbe8f5;
  color: #00498e;
}

.campo-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campo-select label {
  color: #5a6678;
  font-size: 12px;
  font-weight: 700;
  padding-left: 4px;
}

.campo-select select {
  height: 52px;
  padding: 0 14px;
  border: 1px solid #d5dde7;
  border-radius: 14px;
  outline: none;
  background: white;
  color: #273447;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease;
}

.campo-select select:hover {
  border-color: #a8cce7;
}

.campo-select select:focus {
  border-color: #006bc5;
  box-shadow: 0 0 0 4px rgba(0, 107, 197, 0.10);
}


/* ========================================== */
/* MENSAJES */
/* ========================================== */

.mensaje-error,
.mensaje-info {
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.mensaje-error {
  border: 1px solid #ffcaca;
  background: #fff0f0;
  color: #c62828;
}

.mensaje-info {
  border: 1px solid #b8defa;
  background: #eef8ff;
  color: #1769aa;
}

.mensaje-enter-active,
.mensaje-leave-active {
  transition: all 0.3s ease;
}

.mensaje-enter-from,
.mensaje-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}


/* ========================================== */
/* ESTADO: CARGANDO */
/* ========================================== */

.estado-cargando {
  padding: 70px 20px;
  text-align: center;
  color: #5f7590;
}

.loader-grande {
  width: 42px;
  height: 42px;
  margin: 0 auto 18px;
  border: 3px solid rgba(0, 107, 197, 0.18);
  border-top-color: #006bc5;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}


/* ========================================== */
/* ESTADO: VACÍO */
/* ========================================== */

.estado-vacio {
  padding: 70px 20px;
  text-align: center;
  color: #7c8798;
}

.emoji-vacio {
  font-size: 46px;
  display: block;
  margin-bottom: 16px;
}

.estado-vacio h3 {
  margin: 0 0 8px;
  color: #202b3c;
  font-size: 18px;
}

.estado-vacio p {
  margin: 0 0 20px;
  font-size: 13px;
}

.btn-limpiar-filtros {
  padding: 11px 22px;
  border: 1px solid #c7ddf0;
  border-radius: 11px;
  background: white;
  color: #006bc5;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: 0.25s ease;
}

.btn-limpiar-filtros:hover {
  background: #f1f9ff;
  transform: translateY(-2px);
}


/* ========================================== */
/* TABLA */
/* ========================================== */

.tabla-contenedor {
  margin-top: 26px;
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid #e6eef6;
}

.tabla-usuarios {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: white;
}

.tabla-usuarios thead {
  background: linear-gradient(135deg, #f6fbff, #eef7ff);
}

.tabla-usuarios th {
  padding: 15px 18px;
  text-align: left;
  color: #3d4a5c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 1px solid #e3eef8;
  white-space: nowrap;
}

.tabla-usuarios th.col-acciones {
  text-align: right;
}

.tabla-usuarios td {
  padding: 16px 18px;
  color: #354052;
  border-bottom: 1px solid #f0f5fa;
  vertical-align: middle;
}

.tabla-usuarios tbody tr {
  transition: background 0.2s ease;
}

.tabla-usuarios tbody tr:hover {
  background: #fafdff;
}

.tabla-usuarios tbody tr:last-child td {
  border-bottom: none;
}

.fila-inactiva {
  opacity: 0.65;
  background: #fdfcfc;
}

.fila-inactiva:hover {
  background: #fbf7f7 !important;
}

.fila-propia {
  background: linear-gradient(90deg, #f3faff, #fafdff);
}

.fila-propia:hover {
  background: #eef8ff !important;
}


/* ========================================== */
/* CELDA USUARIO (AVATAR + DATOS) */
/* ========================================== */

.celda-usuario {
  display: flex;
  align-items: center;
  gap: 13px;
}

.avatar {
  width: 42px;
  height: 42px;
  min-width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  color: white;
  font-size: 17px;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(0, 40, 90, 0.10);
}

.avatar-admin {
  background: linear-gradient(135deg, #6c5ce7, #8e7dff);
}

.avatar-cliente {
  background: linear-gradient(135deg, #006bc5, #0796df);
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.nombre-linea {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nombre {
  color: #172033;
  font-weight: 700;
  font-size: 14px;
}

.badge-tu {
  padding: 2px 7px;
  border-radius: 6px;
  background: #e4f3ff;
  color: #006bc5;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.correo {
  color: #7c8798;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


/* ========================================== */
/* BADGES */
/* ========================================== */

.badge-rol,
.badge-estado {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.badge-admin {
  background: #ece8ff;
  color: #5b46c9;
}

.badge-cliente {
  background: #e4f3ff;
  color: #006bc5;
}

.estado-activo {
  background: #e6f7ec;
  color: #1c8543;
}

.estado-inactivo {
  background: #fdecec;
  color: #b93939;
}

.punto {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6);
}

.celda-fecha {
  color: #5f7590;
  font-size: 13px;
  white-space: nowrap;
}


/* ========================================== */
/* ACCIONES */
/* ========================================== */

.col-acciones {
  text-align: right;
}

.grupo-acciones {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn-accion {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  border: 1px solid #d5e3f0;
  border-radius: 10px;
  background: white;
  color: #354052;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.25s ease;
}

.btn-accion:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 40, 90, 0.10);
}

.btn-accion:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-rol:hover:not(:disabled) {
  border-color: #6c5ce7;
  color: #5b46c9;
  background: #f8f6ff;
}

.btn-activar:hover:not(:disabled) {
  border-color: #1c8543;
  color: #1c8543;
  background: #f2fcf6;
}

.btn-desactivar:hover:not(:disabled) {
  border-color: #c62828;
  color: #c62828;
  background: #fff5f5;
}

.loader-chico {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(0, 107, 197, 0.25);
  border-top-color: #006bc5;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

.texto-accion {
  display: inline;
}


/* ========================================== */
/* MODAL DE CONFIRMACIÓN */
/* ========================================== */

.modal-fondo {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 30, 55, 0.5);
  backdrop-filter: blur(4px);
}

.modal-caja {
  width: min(440px, 100%);
  padding: 32px 30px 26px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 30px 70px rgba(0, 20, 50, 0.35);
  text-align: center;
  animation: aparecerModal 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes aparecerModal {
  from { opacity: 0; transform: translateY(20px) scale(0.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-icono {
  width: 68px;
  height: 68px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #e4f3ff, #f0f8ff);
  font-size: 30px;
  box-shadow: 0 10px 22px rgba(0, 107, 197, 0.14);
}

.modal-titulo {
  margin: 0 0 10px;
  color: #172033;
  font-size: 20px;
}

.modal-mensaje {
  margin: 0 0 24px;
  color: #6a7b8f;
  font-size: 14px;
  line-height: 1.55;
}

.modal-acciones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-modal {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.btn-modal:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancelar {
  background: #f1f5f9;
  color: #4a5768;
}

.btn-cancelar:hover:not(:disabled) {
  background: #e5ebf1;
}

.btn-confirmar {
  background: linear-gradient(90deg, #006bc5, #0796df);
  color: white;
  box-shadow: 0 8px 18px rgba(0, 107, 197, 0.28);
}

.btn-confirmar:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(0, 107, 197, 0.35);
}

.btn-peligro {
  background: linear-gradient(90deg, #dc2f2f, #f04b4b);
  color: white;
  box-shadow: 0 8px 18px rgba(200, 40, 40, 0.28);
}

.btn-peligro:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(200, 40, 40, 0.35);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


/* ========================================== */
/* RESPONSIVE */
/* ========================================== */

@media (max-width: 900px) {

  .panel {
    padding: 26px 22px 30px;
  }

  .barra-filtros {
    grid-template-columns: 1fr;
  }

  .contador-usuarios {
    align-self: flex-start;
  }

  .texto-accion {
    display: none;
  }

  .btn-accion {
    padding: 9px 11px;
  }

}

@media (max-width: 620px) {

  .pagina-admin {
    padding: 20px 12px;
  }

  .panel {
    padding: 22px 16px 26px;
    border-radius: 20px;
  }

  .encabezado-admin {
    flex-direction: column;
    align-items: flex-start;
  }

  .texto-bloque h1 {
    font-size: 21px;
  }

  .icono-admin {
    width: 54px;
    height: 54px;
    min-width: 54px;
    font-size: 25px;
  }

  .tabla-usuarios th,
  .tabla-usuarios td {
    padding: 12px 12px;
  }

  .celda-usuario {
    gap: 10px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    min-width: 36px;
    font-size: 15px;
  }

  .correo {
    max-width: 150px;
  }

  .modal-caja {
    padding: 26px 20px 22px;
  }

  .modal-acciones {
    grid-template-columns: 1fr;
  }

}

</style>