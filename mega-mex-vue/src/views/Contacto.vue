<template>
  <section class="contacto-pagina">

    <div class="contenedor">

      <div class="titulo-seccion">
        <span>CONTACTO</span>

        <h1>
          Estamos para ayudarte
        </h1>

        <p>
          Comunícate con Mega-Mex para solicitar información
          sobre productos, promociones y disponibilidad.
        </p>
      </div>


      <div class="contacto-grid">

        <!-- INFORMACIÓN -->
        <div class="contacto-info">

          <h2>
            Información de contacto
          </h2>

          <div class="dato-contacto">
            <div class="dato-icono">📍</div>

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
              <strong>Teléfono</strong>

              <p>
                Agrega aquí el número de Mega-Mex
              </p>
            </div>
          </div>


          <div class="dato-contacto">
            <div class="dato-icono">✉️</div>

            <div>
              <strong>Correo electrónico</strong>

              <p>
                Agrega aquí el correo de la empresa
              </p>
            </div>
          </div>


          <div class="dato-contacto">
            <div class="dato-icono">🕐</div>

            <div>
              <strong>Horario de atención</strong>

              <p>
                Agrega aquí los horarios reales
              </p>
            </div>
          </div>


          <a
            href="https://www.facebook.com/profile.php?id=100064149665664"
            target="_blank"
            rel="noopener noreferrer"
            class="boton boton-azul"
          >
            Visitar Facebook
          </a>

        </div>


        <!-- FORMULARIO -->
        <div class="formulario-contacto">

          <h2>
            Envíanos un mensaje
          </h2>

          <form>

            <label>
              Nombre
              <input
                type="text"
                placeholder="Escribe tu nombre"
              />
            </label>


            <label>
              Teléfono
              <input
                type="tel"
                placeholder="Tu número de teléfono"
              />
            </label>


            <label>
              Correo
              <input
                type="email"
                placeholder="Tu correo electrónico"
              />
            </label>


            <label>
              Mensaje
              <textarea
                rows="5"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </label>


            <button
              type="submit"
              class="boton boton-azul"
            >
              Enviar mensaje
            </button>

          </form>

        </div>

      </div>

    </div>

  </section>
</template>