// tests/auth.middleware.test.js
// Pruebas unitarias del middleware de autenticación JWT (con mocks)

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ─────────────────────────────────────────────
// MOCK DE jsonwebtoken
// ─────────────────────────────────────────────
// Reemplazamos jwt.verify() para controlar su comportamiento
// en cada test (válido, expirado, inválido).
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn()
  }
}))

// ─────────────────────────────────────────────
// MOCK DE dotenv (para que no lea el .env real)
// ─────────────────────────────────────────────
vi.mock('dotenv', () => ({
  default: {
    config: vi.fn()
  }
}))

import jwt from 'jsonwebtoken'
import {
  verificarToken,
  verificarAdmin,
  verificarCliente
} from '../src/middlewares/auth.middleware.js'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function crearResMock () {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  }
}

function crearReqMock (cookies = {}, usuario = undefined) {
  const req = { cookies }
  if (usuario !== undefined) req.usuario = usuario
  return req
}

beforeEach(() => {
  vi.clearAllMocks()
  // Simulamos que existe la variable de entorno JWT_SECRET
  process.env.JWT_SECRET = 'secreto-de-prueba'
})

// ═════════════════════════════════════════════
// verificarToken()
// ═════════════════════════════════════════════

describe('verificarToken()', () => {
  it('devuelve 401 SESION_REQUERIDA si no hay cookie token', () => {
    const req = crearReqMock({}) // sin cookies
    const res = crearResMock()
    const next = vi.fn()

    verificarToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      codigo: 'SESION_REQUERIDA',
      mensaje: 'No hay sesión activa.'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('devuelve 401 SESION_REQUERIDA si req.cookies es undefined', () => {
    const req = { } // sin la propiedad cookies
    const res = crearResMock()
    const next = vi.fn()

    verificarToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      codigo: 'SESION_REQUERIDA',
      mensaje: 'No hay sesión activa.'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('llama a next() y guarda req.usuario con token válido', () => {
    const usuarioDecodificado = { id: 1, correo: 'a@a.com', rol: 'admin' }
    jwt.verify.mockReturnValueOnce(usuarioDecodificado)

    const req = crearReqMock({ token: 'token-valido' })
    const res = crearResMock()
    const next = vi.fn()

    verificarToken(req, res, next)

    expect(jwt.verify).toHaveBeenCalledWith('token-valido', 'secreto-de-prueba')
    expect(req.usuario).toEqual(usuarioDecodificado)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  it('devuelve 401 SESION_EXPIRADA si el token expiró', () => {
    const errorExpirado = new Error('jwt expired')
    errorExpirado.name = 'TokenExpiredError'
    jwt.verify.mockImplementationOnce(() => { throw errorExpirado })

    const req = crearReqMock({ token: 'token-expirado' })
    const res = crearResMock()
    const next = vi.fn()

    verificarToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      codigo: 'SESION_EXPIRADA',
      mensaje: 'Tu sesión ha expirado. Inicia sesión de nuevo.'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('devuelve 401 SESION_INVALIDA si el token es inválido', () => {
    const errorInvalido = new Error('invalid token')
    errorInvalido.name = 'JsonWebTokenError'
    jwt.verify.mockImplementationOnce(() => { throw errorInvalido })

    const req = crearReqMock({ token: 'token-invalido' })
    const res = crearResMock()
    const next = vi.fn()

    verificarToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      codigo: 'SESION_INVALIDA',
      mensaje: 'Sesión inválida.'
    })
    expect(next).not.toHaveBeenCalled()
  })
})

// ═════════════════════════════════════════════
// verificarAdmin()
// ═════════════════════════════════════════════

describe('verificarAdmin()', () => {
  it('devuelve 403 si no hay usuario en el request', () => {
    const req = crearReqMock()
    const res = crearResMock()
    const next = vi.fn()

    verificarAdmin(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Acceso denegado. Se requiere rol de administrador.'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('devuelve 403 si el usuario es cliente (no admin)', () => {
    const req = crearReqMock({}, { id: 10, rol: 'cliente' })
    const res = crearResMock()
    const next = vi.fn()

    verificarAdmin(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  it('llama a next() si el usuario es admin', () => {
    const req = crearReqMock({}, { id: 1, rol: 'admin' })
    const res = crearResMock()
    const next = vi.fn()

    verificarAdmin(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })
})

// ═════════════════════════════════════════════
// verificarCliente()
// ═════════════════════════════════════════════

describe('verificarCliente()', () => {
  it('devuelve 401 SESION_REQUERIDA si no hay usuario', () => {
    const req = crearReqMock()
    const res = crearResMock()
    const next = vi.fn()

    verificarCliente(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      codigo: 'SESION_REQUERIDA',
      mensaje: 'No autenticado.'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('llama a next() si hay usuario (cliente o admin)', () => {
    const req = crearReqMock({}, { id: 10, rol: 'cliente' })
    const res = crearResMock()
    const next = vi.fn()

    verificarCliente(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })
})