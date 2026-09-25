<template>
  <main class="empresa-pagina">
    <section class="empresa-portada">
      <div class="contenedor empresa-portada-grid">
        <div class="empresa-portada-contenido">
          <span class="empresa-etiqueta">INFORMACIÓN DE LA EMPRESA</span>

          <h1>
            Conoce quiénes somos
          </h1>

          <p>
            Mega-Mex es una empresa de abarrotes comprometida con ofrecer
            variedad, atención cercana y opciones para cada compra.
          </p>

          <div class="empresa-acento" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <figure class="empresa-foto-principal">
          <img
            src="/Tienda_mega33.png"
            alt="Tienda Mega-Mex"
          />
          <figcaption>Tienda Mega-Mex</figcaption>
        </figure>
      </div>
    </section>

    <section class="contenedor empresa-folleto">
      <div class="empresa-ficha">
        <span class="empresa-ficha-numero">01</span>
        <span class="empresa-ficha-etiqueta">NUESTRA EMPRESA</span>

        <h2>
          Información de Mega-Mex
        </h2>

        <p>
          Mega-Mex nace para atender las compras diarias de las familias y
          negocios de Heroica Ciudad de Tlaxiaco, Oaxaca, con una experiencia
          práctica, amable y confiable.
        </p>

        <p class="empresa-ficha-detalle">
          Nuestro objetivo es acercar productos de uso diario a la comunidad,
          brindando una experiencia de compra sencilla, ordenada y con el
          respaldo de un equipo dispuesto a servir.
        </p>

        <div class="empresa-datos">
          <div>
            <strong>Ubicación</strong>
            <span>Tlaxiaco, Oaxaca</span>
          </div>
          <div>
            <strong>Atención</strong>
            <span>Mayoreo y menudeo</span>
          </div>
        </div>
      </div>

      <div class="empresa-contenido">
        <div class="empresa-bloque">
          <span class="empresa-bloque-numero">02</span>
          <div>
            <h3>Misión</h3>
            <p>
              Facilitar el acceso a productos de abarrotes con una atención
              honesta, ágil y cercana para nuestra comunidad.
            </p>
          </div>
        </div>

        <div class="empresa-bloque">
          <span class="empresa-bloque-numero">03</span>
          <div>
            <h3>Visión</h3>
            <p>
              Ser una tienda de referencia en la región por la confianza de
              nuestros clientes y la calidad de nuestro servicio.
            </p>
          </div>
        </div>

        <div class="empresa-valores">
          <span class="empresa-ficha-etiqueta">04 · NUESTROS VALORES</span>

          <h3>
            Lo que nos define
          </h3>

          <div class="empresa-valores-lista">
            <article>
              <strong>Servicio al cliente</strong>
              <p>Atendemos con amabilidad y buscamos resolver cada necesidad.</p>
            </article>

            <article>
              <strong>Respeto</strong>
              <p>Valoramos a nuestros clientes, colaboradores y comunidad.</p>
            </article>

            <article>
              <strong>Búsqueda de excelencia</strong>
              <p>Mejoramos continuamente nuestros productos y nuestro servicio.</p>
            </article>

            <article>
              <strong>Transparencia</strong>
              <p>Trabajamos con claridad, honestidad y responsabilidad.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="empresa-cierre">
      <div class="contenedor empresa-cierre-contenido">
        <p>Tu compra diaria, con el trato que mereces.</p>
        <RouterLink to="/contacto" class="boton boton-azul">
          Ponte en contacto
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
