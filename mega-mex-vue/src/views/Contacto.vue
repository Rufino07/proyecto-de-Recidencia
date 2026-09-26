<script setup>
import { ref, reactive } from 'vue'

// ============================================
// CONFIGURACIÓN API
// ============================================

const API_URL = 'http://localhost:3000/api'


// ============================================
// ESTADO
// ============================================

const enviando = ref(false)
const mensajeEnviado = ref(false)
const error = ref('')


// ============================================
// FORMULARIO
// ============================================

const formulario = reactive({
  nombre: '',
  telefono: '',
  correo: '',
  mensaje: ''
})


// ============================================
// ENVIAR MENSAJE
// ============================================

const enviarMensaje = async () => {

  error.value = ''
  mensajeEnviado.value = false

  // Validaciones básicas
  if (
    !formulario.nombre.trim() ||
    !formulario.correo.trim() ||
    !formulario.mensaje.trim()
  ) {
    error.value = 'Completa los campos obligatorios.'
    return
  }

  enviando.value = true

  try {

    const respuesta = await fetch(`${API_URL}/contacto`, {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        nombre: formulario.nombre.trim(),
        telefono: formulario.telefono.trim(),
        correo: formulario.correo.trim(),
        mensaje: formulario.mensaje.trim()
      })

    })

    const datos = await respuesta.json()

    if (!datos.ok) {
      throw new Error(datos.mensaje || 'Error al enviar el mensaje')
    }

    // Éxito
    mensajeEnviado.value = true

    // Limpiar formulario
    formulario.nombre = ''
    formulario.telefono = ''
    formulario.correo = ''
    formulario.mensaje = ''

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      mensajeEnviado.value = false
    }, 5000)

  }

  catch (err) {

    console.error('Error enviando mensaje:', err)

    error.value = err.message || 'No se pudo enviar el mensaje. Intenta de nuevo.'

  }

  finally {

    enviando.value = false

  }

}
</script>


<template>
  <section class="contacto-pagina">

    <div class="contenedor">

      <div class="titulo-seccion">
        <span class="contacto-etiqueta">ATENCIÓN MEGA-MEX</span>

        <h1>
          Hablemos de lo que necesitas
        </h1>

        <p>
          Estamos listos para orientarte sobre productos, promociones
          y disponibilidad en nuestra tienda.
        </p>
      </div>


      <div class="contacto-grid">

        <!-- INFORMACIÓN -->
        <div class="contacto-info">

          <div class="contacto-info-encabezado">
            <span class="contacto-indicador">Estamos aquí para ayudarte</span>

            <h2>
              Información de contacto
            </h2>

            <p class="contacto-intro">
              Visítanos o escríbenos por Facebook. Nuestro equipo te ayudará
              a encontrar lo que necesitas para tu hogar o negocio.
            </p>
          </div>

          <div class="dato-contacto">
            <div class="dato-icono" aria-hidden="true">⌖</div>

            <div>
              <strong>Ubicación</strong>

              <p>
                Heroica Ciudad de Tlaxiaco, Oaxaca
              </p>
            </div>
          </div>


          <div class="dato-contacto">
            <div class="dato-icono">📞</div>

            <div>
              <strong>Atención en línea</strong>

              <p>
                Resolvemos tus dudas y consultas a través de Facebook.
              </p>
            </div>
          </div>


          <div class="dato-contacto">
            <div class="dato-icono" aria-hidden="true">✉</div>

            <div>
              <strong>Compra con confianza</strong>

              <p>
                Pregunta por promociones, marcas y disponibilidad antes de visitarnos.
              </p>
            </div>
          </div>


          <div class="dato-contacto">
            <div class="dato-icono" aria-hidden="true">◷</div>

            <div>
              <strong>Servicio cercano</strong>

              <p>
                Abarrotes por mayoreo y menudeo para la comunidad de Tlaxiaco.
              </p>
            </div>
          </div>


          <a
            href="https://www.facebook.com/profile.php?id=100064149665664"
            target="_blank"
            rel="noopener noreferrer"
            class="boton boton-azul"
          >
            <span aria-hidden="true">f</span>
            Visitar página de Facebook
          </a>

        </div>


        <!-- FORMULARIO -->
        <div class="formulario-contacto">

          <div class="formulario-encabezado">
            <span class="contacto-indicador">Respuesta personalizada</span>

            <h2>
              Envíanos un mensaje
            </h2>

            <p>
              Completa el formulario y cuéntanos cómo podemos ayudarte.
            </p>
          </div>

          <form @submit.prevent="enviarMensaje">

            <label>
              Nombre completo
              <input
                v-model="formulario.nombre"
                type="text"
                name="nombre"
                placeholder="Escribe tu nombre"
                autocomplete="name"
                :disabled="enviando"
                required
              />
            </label>


            <label>
              Teléfono
              <input
                v-model="formulario.telefono"
                type="tel"
                name="telefono"
                placeholder="Tu número de teléfono"
                autocomplete="tel"
                :disabled="enviando"
              />
            </label>


            <label>
              Correo
              <input
                v-model="formulario.correo"
                type="email"
                name="correo"
                placeholder="Tu correo electrónico"
                autocomplete="email"
                :disabled="enviando"
                required
              />
            </label>


            <label>
              Mensaje
              <textarea
                v-model="formulario.mensaje"
                name="mensaje"
                rows="5"
                placeholder="¿En qué podemos ayudarte?"
                :disabled="enviando"
                required
              ></textarea>
            </label>


            <button
              type="submit"
              class="boton boton-azul"
              :disabled="enviando"
            >
              {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
            </button>

            <p
              v-if="mensajeEnviado"
              class="mensaje-enviado"
              role="status"
            >
              ✅ Gracias. Recibimos tu mensaje y pronto nos pondremos en contacto.
            </p>

            <p
              v-if="error"
              class="mensaje-error"
              role="alert"
            >
              ⚠️ {{ error }}
            </p>

          </form>

        </div>

      </div>

    </div>

  </section>
</template>


<style scoped>
/* Variables de color para mantener consistencia */
.contacto-pagina {
  --azul-principal: #004aad;
  --azul-hover: #003380;
  --gris-fondo: #f8f9fa;
  --gris-texto: #4a5568;
  --gris-borde: #e2e8f0;
  
  background-color: var(--gris-fondo);
  padding: 4rem 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
}

.contenedor {
  max-width: 1200px;
  margin: 0 auto;
}

/* Título de la sección */
.titulo-seccion {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
}

.contacto-etiqueta {
  display: inline-block;
  color: var(--azul-principal);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.titulo-seccion h1 {
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.titulo-seccion p {
  color: var(--gris-texto);
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Grid principal */
.contacto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Sección de Información */
.contacto-info {
  padding: 3rem;
  background-color: #ffffff;
}

.contacto-indicador {
  display: block;
  color: var(--azul-principal);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.contacto-info h2, .formulario-contacto h2 {
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 1rem;
}

.contacto-intro, .formulario-encabezado p {
  color: var(--gris-texto);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.dato-contacto {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.dato-icono {
  background-color: #eef2ff;
  color: var(--azul-principal);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.dato-contacto strong {
  display: block;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.dato-contacto p {
  color: var(--gris-texto);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Botones */
.boton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  margin-top: 1rem;
}

.boton-azul {
  background-color: var(--azul-principal);
  color: #ffffff;
}

.boton-azul:hover:not(:disabled) {
  background-color: var(--azul-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
}

.boton-azul:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sección del Formulario */
.formulario-contacto {
  padding: 3rem;
  background-color: #f8fafc;
  border-left: 1px solid var(--gris-borde);
}

.formulario-contacto form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.formulario-contacto label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
  color: #1a202c;
  font-size: 0.95rem;
}

.formulario-contacto input,
.formulario-contacto textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gris-borde);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
}

.formulario-contacto input:focus,
.formulario-contacto textarea:focus {
  outline: none;
  border-color: var(--azul-principal);
  box-shadow: 0 0 0 3px rgba(0, 74, 173, 0.1);
}

.formulario-contacto input:disabled,
.formulario-contacto textarea:disabled {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

.formulario-contacto button {
  margin-top: 0.5rem;
  width: 100%;
}

.mensaje-enviado {
  background-color: #def7ec;
  color: #03543f;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
  border: 1px solid #bcf0da;
}

.mensaje-error {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
  border: 1px solid #fecaca;
}

/* Responsive */
@media (max-width: 900px) {
  .contacto-grid {
    grid-template-columns: 1fr;
  }
  
  .formulario-contacto {
    border-left: none;
    border-top: 1px solid var(--gris-borde);
  }
}

@media (max-width: 600px) {
  .contacto-pagina {
    padding: 2rem 1rem;
  }
  
  .titulo-seccion h1 {
    font-size: 2rem;
  }
  
  .contacto-info, .formulario-contacto {
    padding: 2rem 1.5rem;
  }
}
</style>