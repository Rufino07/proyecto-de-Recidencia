// =====================================================
// COMPOSABLE useSeo
// =====================================================
// Actualiza dinámicamente los meta tags del <head>
// cuando el usuario navega entre vistas.
//
// Hay DOS formas de usarlo:
//
// 1. Desde una vista (composable):
//      import { useSeo } from '../composables/useSeo'
//      useSeo('login')
//
// 2. Desde el router (función pura):
//      import { aplicarSeo } from '../composables/useSeo'
//      router.afterEach((to) => {
//        aplicarSeo(to.name, to.path)
//      })
//
// El nombre debe coincidir con una clave de META_POR_VISTA
// en config/seo.js
// =====================================================

import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import {
  SITIO,
  META_POR_VISTA,
  TITULO_POR_DEFECTO
} from '../config/seo'

// =====================================================
// UTILIDAD: crear o actualizar una meta tag
// =====================================================

function setMetaTag(atributo, nombre, contenido) {
  if (!contenido) return

  let etiqueta = document.head.querySelector(
    `meta[${atributo}="${nombre}"]`
  )

  if (!etiqueta) {
    etiqueta = document.createElement('meta')
    etiqueta.setAttribute(atributo, nombre)
    document.head.appendChild(etiqueta)
  }

  etiqueta.setAttribute('content', contenido)
}

// =====================================================
// UTILIDAD: eliminar una meta tag si existe
// =====================================================

function removeMetaTag(atributo, nombre) {
  const etiqueta = document.head.querySelector(
    `meta[${atributo}="${nombre}"]`
  )
  if (etiqueta) {
    etiqueta.remove()
  }
}

// =====================================================
// UTILIDAD: construir URL absoluta
// =====================================================

function urlAbsoluta(ruta) {
  return `${SITIO.url}${ruta}`
}

// =====================================================
// FUNCIÓN PURA: aplicar SEO
// =====================================================
// Esta es la lógica central. Se puede llamar desde
// cualquier lugar (router, vista, etc.) sin depender
// de useRoute().
// =====================================================

export function aplicarSeo(nombreVista, rutaActual) {
  // ==========================================
  // 1. OBTENER CONFIGURACIÓN DE LA VISTA
  // ==========================================

  const clave = nombreVista || 'default'
  const ruta = rutaActual || '/'

  const config = META_POR_VISTA[clave] || {
    titulo: TITULO_POR_DEFECTO,
    descripcion: SITIO.descripcion,
    indexar: false
  }

  // ==========================================
  // 2. TÍTULO DE LA PESTAÑA
  // ==========================================

  const tituloCompleto = config.titulo
    ? `${config.titulo} | ${SITIO.nombre}`
    : TITULO_POR_DEFECTO

  document.title = tituloCompleto

  // ==========================================
  // 3. META DESCRIPTION
  // ==========================================

  setMetaTag('name', 'description', config.descripcion)

  // ==========================================
  // 4. META ROBOTS
  // ==========================================

  if (config.indexar) {
    setMetaTag('name', 'robots', 'index, follow')
  } else {
    setMetaTag('name', 'robots', 'noindex, nofollow')
  }

  // ==========================================
  // 5. OPEN GRAPH
  // ==========================================

  const urlActual = urlAbsoluta(ruta)

  setMetaTag('property', 'og:site_name', SITIO.nombre)
  setMetaTag('property', 'og:title', tituloCompleto)
  setMetaTag('property', 'og:description', config.descripcion)
  setMetaTag('property', 'og:image', urlAbsoluta(SITIO.imagenPorDefecto))
  setMetaTag('property', 'og:url', urlActual)
  setMetaTag('property', 'og:type', SITIO.tipo)
  setMetaTag('property', 'og:locale', SITIO.idioma)

  // ==========================================
  // 6. TWITTER CARD
  // ==========================================

  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', tituloCompleto)
  setMetaTag('name', 'twitter:description', config.descripcion)
  setMetaTag('name', 'twitter:image', urlAbsoluta(SITIO.imagenPorDefecto))

  if (SITIO.twitter) {
    setMetaTag('name', 'twitter:site', SITIO.twitter)
  }

  // ==========================================
  // 7. LOG EN DESARROLLO
  // ==========================================

  if (import.meta.env.DEV) {
    console.log(`🔍 SEO aplicado a "${clave}":`, {
      titulo: tituloCompleto,
      indexar: config.indexar
    })
  }
}

// =====================================================
// COMPOSABLE: useSeo (para usar dentro de una vista)
// =====================================================
// Útil si quieres forzar SEO en una vista específica
// ignorando el nombre de la ruta. En la mayoría de los
// casos NO lo necesitas, porque el router ya lo aplica.
// =====================================================

export function useSeo(nombreVista) {
  const route = useRoute()

  watchEffect(() => {
    const clave = nombreVista || route.name
    aplicarSeo(clave, route.path)
  })
}

// =====================================================
// EXPORT DEFAULT
// =====================================================

export default useSeo