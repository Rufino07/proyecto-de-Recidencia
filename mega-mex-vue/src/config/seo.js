// =====================================================
// CONFIGURACIÓN SEO GLOBAL
// =====================================================
// Centraliza datos del sitio para meta tags.
// En desarrollo usa localhost. En producción, cambiar
// solo SITIO.url por el dominio real.
// =====================================================

export const SITIO = {
  // URL base del sitio (cambiar en producción)
  url: 'https://localhost:5173',

  // Nombre del sitio
  nombre: 'Mega-Mex',

  // Descripción por defecto (para meta description)
  descripcion: 'Mega-Mex - Abarrotes, productos, promociones y novedades para tu hogar. Encuentra todo lo que necesitas en un solo lugar.',

  // Imagen por defecto para compartir en redes (Open Graph)
  imagenPorDefecto: '/logo-mega-mex.png',

  // Idioma
  idioma: 'es-MX',

  // Twitter handle (opcional)
  twitter: '@megamex',

  // Tipo de contenido por defecto
  tipo: 'website'
}

// =====================================================
// META TAGS POR VISTA
// =====================================================
// Cada ruta tiene su propio título, descripción y si
// debe ser indexada por buscadores.
// =====================================================

export const META_POR_VISTA = {
  // ==========================================
  // PÚBLICAS — SEO completo
  // ==========================================

  login: {
    titulo: 'Iniciar sesión',
    descripcion: 'Accede a tu cuenta de Mega-Mex para consultar productos, promociones y novedades.',
    indexar: true
  },

  registro: {
    titulo: 'Crear cuenta',
    descripcion: 'Regístrate en Mega-Mex para acceder a productos, promociones y novedades exclusivas.',
    indexar: true
  },

  // ==========================================
  // PÚBLICAS — no indexar (útiles solo para el usuario)
  // ==========================================

  'olvide-password': {
    titulo: 'Recuperar contraseña',
    descripcion: 'Recupera el acceso a tu cuenta de Mega-Mex.',
    indexar: false
  },

  'reset-password': {
    titulo: 'Restablecer contraseña',
    descripcion: 'Crea una nueva contraseña para tu cuenta de Mega-Mex.',
    indexar: false
  },

  'verificar-email': {
    titulo: 'Verificar correo',
    descripcion: 'Verifica tu correo electrónico para activar tu cuenta de Mega-Mex.',
    indexar: false
  },

  // ==========================================
  // CLIENTE — requieren login, no indexar
  // ==========================================

  inicio: {
    titulo: 'Inicio',
    descripcion: 'Bienvenido a Mega-Mex. Consulta productos, promociones y novedades.',
    indexar: false
  },

  productos: {
    titulo: 'Productos',
    descripcion: 'Explora nuestro catálogo de productos en Mega-Mex.',
    indexar: false
  },

  promociones: {
    titulo: 'Promociones',
    descripcion: 'Descubre las promociones y ofertas vigentes en Mega-Mex.',
    indexar: false
  },

  empresa: {
    titulo: 'Empresa',
    descripcion: 'Conoce más sobre Mega-Mex: historia, misión y visión.',
    indexar: false
  },

  marketing: {
    titulo: 'Marketing',
    descripcion: 'Flyers, materiales y contenido de marketing de Mega-Mex.',
    indexar: false
  },

  contacto: {
    titulo: 'Contacto',
    descripcion: 'Ponte en contacto con Mega-Mex. Sucursales, teléfonos y más.',
    indexar: false
  },

  redes: {
    titulo: 'Redes sociales',
    descripcion: 'Síguenos en nuestras redes sociales oficiales.',
    indexar: false
  },

  // ==========================================
  // ADMIN — no indexar
  // ==========================================

  admin: {
    titulo: 'Panel de administración',
    descripcion: 'Panel de administración de Mega-Mex.',
    indexar: false
  },

  'admin-flyers': {
    titulo: 'Administrar flyers',
    descripcion: 'Gestión de flyers.',
    indexar: false
  },

  'admin-promociones': {
    titulo: 'Administrar promociones',
    descripcion: 'Gestión de promociones.',
    indexar: false
  },

  'admin-productos': {
    titulo: 'Administrar productos',
    descripcion: 'Gestión de productos.',
    indexar: false
  },

  'admin-sucursales': {
    titulo: 'Administrar sucursales',
    descripcion: 'Gestión de sucursales.',
    indexar: false
  },

  'admin-redes': {
    titulo: 'Administrar redes',
    descripcion: 'Gestión de redes sociales.',
    indexar: false
  },

  'admin-contacto': {
    titulo: 'Administrar contacto',
    descripcion: 'Gestión de información de contacto.',
    indexar: false
  },

  'admin-usuarios': {
    titulo: 'Administrar usuarios',
    descripcion: 'Gestión de usuarios.',
    indexar: false
  }
}

// =====================================================
// TÍTULO POR DEFECTO (para rutas no listadas)
// =====================================================

export const TITULO_POR_DEFECTO = 'Mega-Mex - Abarrotes y más'