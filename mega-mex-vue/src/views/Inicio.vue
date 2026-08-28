<template>

  <!-- PORTADA -->
  <section class="hero">

    <div class="hero-contenido">

      <div class="hero-texto">

        <span class="etiqueta">
          ABARROTES MEGA-MEX
        </span>

        <h1>
          Todo lo que necesitas
          <span>en un solo lugar.</span>
        </h1>

        <p>
          Encuentra una gran variedad de productos
          de abarrotes por mayoreo y menudeo.
          Conoce nuestras promociones y novedades.
        </p>


        <div class="hero-botones">

          <RouterLink
            class="boton boton-azul"
            to="/productos"
          >
            Ver productos
          </RouterLink>

          <RouterLink
            class="boton boton-promocion"
            to="/promociones"
          >
            Ver promociones
          </RouterLink>

        </div>

      </div>


      <!-- LOGO GRANDE -->

      <div class="hero-logo">

        <div class="circulo-logo">

          <img
            src="/logo-mega-mex.png"
            alt="Mega-Mex"
          />

        </div>

      </div>

    </div>

  </section>



  <!-- CATEGORÍAS -->

  <section class="seccion">

    <div class="contenedor">

      <div class="titulo-seccion">

        <span>
          CONOCE MEGA-MEX
        </span>

        <h2>
          ¿Qué estás buscando?
        </h2>

        <p>
          Explora las diferentes secciones de nuestro sitio.
        </p>

      </div>


      <div class="categorias">


        <RouterLink
          to="/productos"
          class="tarjeta"
        >

          <div class="icono">
            📦
          </div>

          <h3>
            Productos
          </h3>

          <p>
            Consulta nuestro catálogo
            por mayoreo y menudeo.
          </p>

          <span class="ver-mas">
            Ver productos →
          </span>

        </RouterLink>



        <RouterLink
          to="/promociones"
          class="tarjeta"
        >

          <div class="icono amarillo">
            🏷️
          </div>

          <h3>
            Promociones
          </h3>

          <p>
            Descubre ofertas y
            promociones especiales.
          </p>

          <span class="ver-mas">
            Ver promociones →
          </span>

        </RouterLink>



        <RouterLink
          to="/empresa"
          class="tarjeta"
        >

          <div class="icono rojo">
            🏪
          </div>

          <h3>
            Mega-Mex
          </h3>

          <p>
            Conoce nuestra empresa,
            historia y valores.
          </p>

          <span class="ver-mas">
            Conocer más →
          </span>

        </RouterLink>

      </div>

    </div>

  </section>



  <!-- MAYOREO -->

  <section class="mayoreo">

    <div class="contenedor mayoreo-contenido">

      <div>

        <span class="etiqueta-blanca">
          VENTAS POR MAYOREO
        </span>

        <h2>
          Productos para tu negocio
        </h2>

        <p>
          Encuentra presentaciones por caja,
          paquete o mayoreo para surtir tu negocio.
        </p>

        <RouterLink
          class="boton boton-blanco"
          to="/productos"
        >
          Conocer productos
        </RouterLink>

      </div>


      <div class="mayoreo-icono">
        📦
      </div>

    </div>

  </section>



  <!-- PROMOCIONES -->

  <section class="seccion promociones-inicio">

    <div class="contenedor">

      <div class="titulo-seccion">

        <span>
          OFERTAS
        </span>

        <h2>
          Promociones Mega-Mex
        </h2>

        <p>
          No te pierdas nuestras promociones.
        </p>

      </div>


      <div class="promociones-grid">


        <div class="promo promo-azul">

          <span>
            PROMOCIÓN
          </span>

          <h3>
            Productos seleccionados
          </h3>

          <p>
            Consulta nuestras promociones vigentes.
          </p>

        </div>


        <div class="promo promo-rojo">

          <span>
            MAYOREO
          </span>

          <h3>
            Precio especial
          </h3>

          <p>
            Promociones especiales para mayoreo.
          </p>

        </div>


        <div class="promo promo-amarillo">

          <span>
            NOVEDADES
          </span>

          <h3>
            Nuevos productos
          </h3>

          <p>
            Conoce lo nuevo que tenemos para ti.
          </p>

        </div>


      </div>

    </div>

  </section>

</template>