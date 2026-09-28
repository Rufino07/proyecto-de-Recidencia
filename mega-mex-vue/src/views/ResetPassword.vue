<template>
  <div class="reset-password">
    <div class="card">
      <h1>🔒 Nueva contraseña</h1>

      <!-- Token inválido -->
      <div v-if="!token" class="error-bloque">
        <p class="icono">⚠️</p>
        <p>Enlace inválido.</p>
        <p class="nota">
          El enlace no contiene un token válido. Solicita uno nuevo.
        </p>
        <router-link to="/olvide-password" class="boton">
          Solicitar nuevo enlace
        </router-link>
      </div>

      <!-- Formulario -->
      <form v-else-if="!exito" @submit.prevent="enviar">
        <p class="subtitulo">
          Escribe tu nueva contraseña. Debe tener al menos 8 caracteres.
        </p>

        <div class="campo">
          <label for="password">Nueva contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            :disabled="cargando"
          />
        </div>

        <div class="campo">
          <label for="password2">Confirmar contraseña</label>
          <input
            id="password2"
            v-model="password2"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            :disabled="cargando"
          />
        </div>

        <button type="submit" :disabled="cargando">
          {{ cargando ? 'Guardando...' : 'Guardar contraseña' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <!-- Éxito -->
      <div v-else class="exito">
        <p class="icono">✅</p>
        <p>{{ mensajeExito }}</p>
        <router-link to="/login" class="boton">
          Ir a iniciar sesión
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resetPassword } from '../utils/auth.js'

const route = useRoute()
const router = useRouter()

const token = ref('')
const password = ref('')
const password2 = ref('')
const cargando = ref(false)
const error = ref('')
const exito = ref(false)
const mensajeExito = ref('')

onMounted(() => {
  token.value = route.query.token || ''
})

const enviar = async () => {
  error.value = ''

  // Validar que las contraseñas coincidan
  if (password.value !== password2.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  if (password.value.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres.'
    return
  }

  cargando.value = true

  try {
    const respuesta = await resetPassword(token.value, password.value)

    if (respuesta.ok) {
      exito.value = true
      mensajeExito.value = respuesta.mensaje

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      error.value = respuesta.mensaje || 'Error al cambiar la contraseña.'
    }
  } catch (err) {
    error.value = 'Error de conexión. Intenta de nuevo.'
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.reset-password {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
}

h1 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
  text-align: center;
}

.subtitulo {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin-bottom: 25px;
  line-height: 1.5;
}

.campo {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #444;
  font-weight: 500;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

input:disabled {
  background: #f5f5f5;
}

button,
.boton {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  text-align: center;
  text-decoration: none;
  display: block;
  box-sizing: border-box;
}

button:hover:not(:disabled),
.boton:hover {
  background: #5568d3;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}

.error-bloque {
  text-align: center;
  padding: 20px;
}

.error-bloque .icono,
.exito .icono {
  font-size: 48px;
  margin: 0 0 15px 0;
}

.exito {
  text-align: center;
}

.exito p {
  color: #333;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.nota {
  font-size: 13px;
  color: #888;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
