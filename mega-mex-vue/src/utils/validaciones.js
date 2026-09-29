// =====================================================
// VALIDACIONES REUTILIZABLES
// =====================================================
// Funciones para validar campos de formularios.
// Cada función devuelve un objeto:
//   { valido: true/false, mensaje: 'texto' }
// - Si "valido" es true  → el campo está bien
// - Si "valido" es false → hay error, usar "mensaje"
// =====================================================

// =====================================================
// VALIDAR CORREO ELECTRÓNICO
// =====================================================

export const validarCorreo = (correo) => {
  // 1. Vacío
  if (!correo || correo.trim() === '') {
    return {
      valido: false,
      mensaje: 'El correo es obligatorio.'
    }
  }

  const correoLimpio = correo.trim()

  // 2. Formato básico con regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!regex.test(correoLimpio)) {
    return {
      valido: false,
      mensaje: 'Ingresa un correo válido (ej: usuario@dominio.com).'
    }
  }

  // 3. Longitud razonable
  if (correoLimpio.length > 150) {
    return {
      valido: false,
      mensaje: 'El correo es demasiado largo.'
    }
  }

  // ✅ Todo bien
  return {
    valido: true,
    mensaje: 'Correo válido.'
  }
}


// =====================================================
// VALIDAR CONTRASEÑA (para REGISTRO)
// =====================================================

export const validarPassword = (password) => {
  // 1. Vacío
  if (!password || password === '') {
    return {
      valido: false,
      mensaje: 'La contraseña es obligatoria.'
    }
  }

  // 2. Mínimo 6 caracteres (igual que el backend)
  if (password.length < 6) {
    return {
      valido: false,
      mensaje: `Faltan ${6 - password.length} caracteres (mínimo 6).`
    }
  }

  // 3. Máximo razonable
  if (password.length > 100) {
    return {
      valido: false,
      mensaje: 'La contraseña es demasiado larga.'
    }
  }

  // ✅ Todo bien
  return {
    valido: true,
    mensaje: 'Contraseña válida.'
  }
}


// =====================================================
// VALIDAR CONTRASEÑA (para LOGIN — más permisivo)
// =====================================================
// En login no validamos requisitos, solo que no esté vacía.
// Porque la contraseña ya está creada.

export const validarPasswordLogin = (password) => {
  if (!password || password === '') {
    return {
      valido: false,
      mensaje: 'La contraseña es obligatoria.'
    }
  }

  return {
    valido: true,
    mensaje: 'Contraseña ingresada.'
  }
}


// =====================================================
// VALIDAR NOMBRE (para REGISTRO)
// =====================================================

export const validarNombre = (nombre) => {
  // 1. Vacío
  if (!nombre || nombre.trim() === '') {
    return {
      valido: false,
      mensaje: 'El nombre es obligatorio.'
    }
  }

  const nombreLimpio = nombre.trim()

  // 2. Mínimo 3 caracteres
  if (nombreLimpio.length < 3) {
    return {
      valido: false,
      mensaje: 'El nombre debe tener al menos 3 caracteres.'
    }
  }

  // 3. Máximo 150 (igual que la BD)
  if (nombreLimpio.length > 150) {
    return {
      valido: false,
      mensaje: 'El nombre es demasiado largo.'
    }
  }

  // 4. Solo letras, espacios y acentos
  const regex = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]+$/

  if (!regex.test(nombreLimpio)) {
    return {
      valido: false,
      mensaje: 'El nombre solo puede contener letras y espacios.'
    }
  }

  // ✅ Todo bien
  return {
    valido: true,
    mensaje: 'Nombre válido.'
  }
}


// =====================================================
// VALIDAR CONFIRMACIÓN DE CONTRASEÑA
// =====================================================

export const validarConfirmacion = (password, confirmacion) => {
  // 1. Vacío
  if (!confirmacion || confirmacion === '') {
    return {
      valido: false,
      mensaje: 'Confirma tu contraseña.'
    }
  }

  // 2. Debe coincidir
  if (password !== confirmacion) {
    return {
      valido: false,
      mensaje: 'Las contraseñas no coinciden.'
    }
  }

  // ✅ Todo bien
  return {
    valido: true,
    mensaje: 'Las contraseñas coinciden.'
  }
}


// =====================================================
// UTILIDAD: ¿Cuándo mostrar el mensaje?
// =====================================================
// Lógica: no mostrar mensajes mientras el campo está vacío
// y el usuario recién empieza a escribir.

export const debeMostrarFeedback = (valor) => {
  // Solo mostramos feedback si el usuario ya escribió algo
  return valor && valor.length > 0
}