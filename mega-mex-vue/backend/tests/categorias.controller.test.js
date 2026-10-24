// tests/categorias.controller.test.js
// Pruebas unitarias del controlador de categorías (con mocks)

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ─────────────────────────────────────────────
// MOCK DEL POOL DE POSTGRESQL
// ─────────────────────────────────────────────
vi.mock('../src/config/db.js', () => ({
  default: {
    query: vi.fn()
  }
}))

import pool from '../src/config/db.js'
import { listarCategorias } from '../src/controllers/categorias.controller.js'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function crearResMock () {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  }
}

function crearReqMock () {
  return {} // listarCategorias no usa req
}

beforeEach(() => {
  vi.clearAllMocks()
})


// listarCategorias()


describe('listarCategorias()', () => {
  it('devuelve las categorías activas cuando la BD responde bien', async () => {
    const categoriasFalsas = [
      { id: 1, nombre: 'Abarrotes', descripcion: null, activo: true },
      { id: 2, nombre: 'Lácteos',   descripcion: null, activo: true },
      { id: 3, nombre: 'Bebidas',   descripcion: null, activo: true }
    ]
    pool.query.mockResolvedValueOnce({ rows: categoriasFalsas })

    const req = crearReqMock()
    const res = crearResMock()

    await listarCategorias(req, res)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      total: 3,
      categorias: categoriasFalsas
    })
  })

  it('devuelve total: 0 y array vacío cuando no hay categorías activas', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock()
    const res = crearResMock()

    await listarCategorias(req, res)

    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      total: 0,
      categorias: []
    })
  })

  it('devuelve 500 si la BD falla', async () => {
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock()
    const res = crearResMock()

    await listarCategorias(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al obtener las categorías.'
    })
  })

  it('usa un SELECT con WHERE activo = true', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock()
    const res = crearResMock()

    await listarCategorias(req, res)

    // Inspeccionamos el SQL que se envió al pool
    const sqlEnviado = pool.query.mock.calls[0][0]
    expect(sqlEnviado).toContain('FROM categorias')
    expect(sqlEnviado).toContain('WHERE activo = true')
    expect(sqlEnviado).toContain('ORDER BY nombre ASC')
  })
})