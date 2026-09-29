<template>
  <main class="pagina-verificar">

    <div class="fondo-luz luz-1"></div>
    <div class="fondo-luz luz-2"></div>

    <section class="verificar-card">

      <div class="icono-grande">
        <span v-if="estado === 'cargando'">⏳</span>
        <span v-else-if="estado === 'exito'">✅</span>
        <span v-else-if="estado === 'error'">⚠️</span>
        <span v-else>📧</span>
      </div>

      <h1 v-if="estado === 'cargando'">
        Verificando tu correo...
      </h1>
      <h1 v-else-if="estado === 'exito'">
        ¡Correo verificado!
      </h1>
      <h1 v-else-if="estado === 'error'">
        No se pudo verificar
      </h1>
      <h1 v-else>
        Verificación de correo
      </h1>

      <p class="mensaje" :class="claseMensaje">
        {{ mensaje }}
      </p>

      <div
        v-if="estado === 'exito'"
        class="acciones"
      >
        <button
          type="button"
          class="btn-primario"
          @click="irLogin"
        >
          Ir a iniciar sesión →
        </button>
      </div>

      <div
        v-else-if="estado === 'error'"
        class="acciones"
      >
        <button
          type="button"
          class="btn-secundario"
          @click="irLogin"
        >
          Ir a iniciar sesión
        </button>
      </div>

      <div
        v-else-if="estado === 'sinToken'"
        class="acciones"
      >
        <button
          type="button"
          class="btn-primario"
          @click="irLogin"
        >
          Volver al login
        </button>
      </div>

    </section>

  </main>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { verificarEmail } from '../utils/auth'

const router = useRouter()
const route = useRoute()

// ============================================
// ESTADO
// ============================================

// 'cargando' | 'exito' | 'error' | 'sinToken'
const estado = ref('cargando')
const mensaje = ref('Estamos validando tu enlace de verificación...')

// ============================================
// CLASE DEL MENSAJE (color según estado)
// ============================================

const claseMensaje = computed(() => {
  if (estado.value === 'exito') return 'texto-exito'
  if (estado.value === 'error') return 'texto-error'
  return ''
})

// ============================================
// AL MONTAR: LEER TOKEN Y VERIFICAR
// ============================================

onMounted(async () => {
  const token = route.query.token

  // Sin token → mensaje de error
  if (!token) {
    estado.value = 'sinToken'
    mensaje.value =
      'El enlace no contiene un token de verificación. ' +
      'Asegúrate de abrir el enlace completo que recibiste en tu correo.'
    return
  }

  // Llamar al backend
  try {
    const datos = await verificarEmail(token)

    estado.value = 'exito'
    mensaje.value =
      datos.mensaje ||
      '¡Tu correo fue verificado correctamente! Ya puedes iniciar sesión.'

  } catch (err) {
    estado.value = 'error'
    mensaje.value =
      err.message ||
      'El enlace es inválido o ha expirado. Solicita uno nuevo.'
  }
})

// ============================================
// IR AL LOGIN
// ============================================

const irLogin = () => {
  router.replace('/login')
}

</script>


<style scoped>

* {
  box-sizing: border-box;
}

.pagina-verificar {
  position: fixed;
  inset: 0;
  z-index: 99999;
  min-height: 100vh;
  padding: 25px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #004b92, #006bc5, #0da0e8);
  font-family: Arial, Helvetica, sans-serif;
}

.fondo-luz {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.09);
  pointer-events: none;
}

.luz-1 {
  width: 430px;
  height: 430px;
  top: -180px;
  left: -100px;
  animation: flotar1 9s ease-in-out infinite;
}

.luz-2 {
  width: 330px;
  height: 330px;
  right: -100px;
  bottom: -100px;
  animation: flotar2 11s ease-in-out infinite;
}

@keyframes flotar1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, 45px); }
}

@keyframes flotar2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-35px, -45px) scale(1.12); }
}

.verificar-card {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 520px;
  padding: 50px 45px;
  text-align: center;
  border-radius: 28px;
  background: white;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  animation: aparecerCard 0.5s ease;
}

@keyframes aparecerCard {
  from { opacity: 0; transform: translateY(25px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.icono-grande {
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: #eaf5ff;
  font-size: 45px;
  animation: iconoFlotar 2.5s ease-in-out infinite;
}

@keyframes iconoFlotar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

h1 {
  margin: 0 0 15px;
  color: #1f2937;
  font-size: 26px;
}

.mensaje {
  margin: 0 0 30px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
}

.texto-exito {
  color: #16a34a;
}

.texto-error {
  color: #dc2626;
}

.acciones {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primario {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #006bc5, #0b96e1);
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.25s ease;
}

.btn-primario:hover {
  box-shadow: 0 9px 22px rgba(0, 107, 197, 0.28);
  transform: translateY(-1px);
}

.btn-secundario {
  width: 100%;
  height: 52px;
  border: 1px solid #d7dde4;
  border-radius: 12px;
  background: white;
  color: #006bc5;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.25s ease;
}

.btn-secundario:hover {
  border-color: #006bc5;
  background: #f0f7ff;
}

@media (max-width: 500px) {
  .pagina-verificar {
    padding: 12px;
  }

  .verificar-card {
    padding: 40px 25px;
    border-radius: 22px;
  }

  .icono-grande {
    width: 75px;
    height: 75px;
    font-size: 38px;
  }

  h1 {
    font-size: 22px;
  }

  .mensaje {
    font-size: 14px;
  }
}

</style>