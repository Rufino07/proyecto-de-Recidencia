<script setup>
import { ref } from 'vue'

const mensajeEnviado = ref(false)

const enviarMensaje = () => {
  mensajeEnviado.value = true
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
            <div class="dato-icono" aria-hidden="true">↗</div>

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
                type="text"
                name="nombre"
                placeholder="Escribe tu nombre"
                autocomplete="name"
                required
              />
            </label>


            <label>
              Teléfono
              <input
                type="tel"
                name="telefono"
                placeholder="Tu número de teléfono"
                autocomplete="tel"
              />
            </label>


            <label>
              Correo
              <input
                type="email"
                name="correo"
                placeholder="Tu correo electrónico"
                autocomplete="email"
                required
              />
            </label>


            <label>
              Mensaje
              <textarea
                name="mensaje"
                rows="5"
                placeholder="¿En qué podemos ayudarte?"
                required
              ></textarea>
            </label>


            <button
              type="submit"
              class="boton boton-azul"
            >
              Enviar mensaje
            </button>

            <p
              v-if="mensajeEnviado"
              class="mensaje-enviado"
              role="status"
            >
              Gracias. Recibimos tu mensaje y pronto nos pondremos en contacto.
            </p>

          </form>

        </div>

      </div>

    </div>

  </section>
</template>