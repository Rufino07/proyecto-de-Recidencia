<template>
  <div class="olvide-password">
    <div class="card">
      <h1>🔑 Recuperar contraseña</h1>
      <p class="subtitulo">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <!-- Formulario -->
      <form v-if="!enviado" @submit.prevent="enviar">
        <div class="campo">
          <label for="correo">Correo electrónico</label>
          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="tu@correo.com"
            required
            :disabled="cargando"
          />
        </div>

        <button type="submit" :disabled="cargando">
          {{ cargando ? 'Enviando...' : 'Enviar enlace' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <!-- Confirmación -->
      <div v-else class="exito">
        <p class="icono">✅</p>
        <p>{{ mensajeExito }}</p>
        <p class="nota">
          Revisa la <strong>consola del backend</strong> para ver el enlace
          (mientras estamos en desarrollo).
        </p>
      </div>

      <router-link to="/login" class="volver">
        ← Volver al inicio de sesión
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { forgotPassword } from '../utils/auth.js'

const correo = ref('')
const cargando = ref(false)
const enviado = ref(false)
const error = ref('')
const mensajeExito = ref('')

const enviar = async () => {
  error.value = ''
  cargando.value = true

  try {
    const respuesta = await forgotPassword(correo.value)

    if (respuesta.ok) {
      enviado.value = true
      mensajeExito.value = respuesta.mensaje
    } else {
      error.value = respuesta.mensaje || 'Error al enviar la solicitud.'
    }
  } catch (err) {
    error.value = 'Error de conexión. Intenta de nuevo.'
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.olvide-password {
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
  margin: 0 0 10px 0;
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

button {
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
}

button:hover:not(:disabled) {
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

.exito {
  text-align: center;
}

.exito .icono {
  font-size: 48px;
  margin: 0 0 15px 0;
}

.exito p {
  color: #333;
  font-size: 15px;
  line-height: 1.6;
}

.nota {
  font-size: 13px;
  color: #888;
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 6px;
}

.volver {
  display: block;
  text-align: center;
  margin-top: 25px;
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
}

.volver:hover {
  text-decoration: underline;
}
</style>