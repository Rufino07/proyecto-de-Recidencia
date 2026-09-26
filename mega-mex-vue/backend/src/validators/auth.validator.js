// ============================================
// VALIDADORES DE AUTENTICACIÓN
// ============================================

import { body, validationResult } from 'express-validator'


// ============================================
// MIDDLEWARE: PROCESAR RESULTADOS
// ============================================

export const procesarErrores = (req, res, next) => {
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      mensaje: errores.array()[0].msg,
      errores: errores.array().map(e => ({
        campo: e.path,
        mensaje: e.msg
      }))
    })
  }

  next()
}


// ============================================
// VALIDADOR: LOGIN
// ============================================

export const validarLogin = [
  body('correo')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio.')
    .isEmail().withMessage('Ingresa un correo electrónico válido.')
    .isLength({ max: 150 }).withMessage('El correo es demasiado largo.'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6, max: 100 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),

  procesarErrores
]


// ============================================
// VALIDADOR: REGISTRO
// ============================================

export const validarRegistro = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios.'),

  body('correo')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio.')
    .isEmail().withMessage('Ingresa un correo electrónico válido.')
    .isLength({ max: 150 }).withMessage('El correo es demasiado largo.'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6, max: 100 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('La contraseña debe tener al menos una letra y un número.'),

  procesarErrores
]


// ============================================
// VALIDADOR: CONTACTO
// ============================================

export const validarMensajeContacto = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ min: 2, max: 150 })
    .withMessage('El nombre debe tener entre 2 y 150 caracteres.'),

  body('correo')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio.')
    .isEmail().withMessage('Ingresa un correo electrónico válido.')
    .isLength({ max: 150 }),

  body('telefono')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('El teléfono es demasiado largo.'),

  body('mensaje')
    .trim()
    .notEmpty().withMessage('El mensaje es obligatorio.')
    .isLength({ min: 5, max: 2000 })
    .withMessage('El mensaje debe tener entre 5 y 2000 caracteres.'),

  procesarErrores
]