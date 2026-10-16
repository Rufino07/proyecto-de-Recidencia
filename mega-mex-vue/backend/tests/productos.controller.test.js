// tests/productos.controller.test.js
// Pruebas unitarias del controlador de productos (con mocks)

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
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto
} from '../src/controllers/productos.controller.js'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function crearResMock () {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  }
}

function crearReqMock (body = {}, params = {}) {
  return { body, params }
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ═════════════════════════════════════════════
// listarProductos()
// ═════════════════════════════════════════════

describe('listarProductos()', () => {
  it('devuelve un array de productos cuando la BD responde bien', async () => {
    const productosFalsos = [
      { id: 1, nombre: 'Arroz', tipo: 'Menudeo', categoria: 'Abarrotes' },
      { id: 2, nombre: 'Leche', tipo: 'Mayoreo', categoria: 'Lácteos' }
    ]
    pool.query.mockResolvedValueOnce({ rows: productosFalsos })

    const req = crearReqMock()
    const res = crearResMock()

    await listarProductos(req, res)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      total: 2,
      productos: productosFalsos
    })
  })

  it('devuelve total: 0 cuando no hay productos', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock()
    const res = crearResMock()

    await listarProductos(req, res)

    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      total: 0,
      productos: []
    })
  })

  it('devuelve 500 si la BD falla', async () => {
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock()
    const res = crearResMock()

    await listarProductos(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al obtener los productos.'
    })
  })
})

// ═════════════════════════════════════════════
// obtenerProducto()
// ═════════════════════════════════════════════

describe('obtenerProducto()', () => {
  it('devuelve el producto si existe', async () => {
    const productoFalso = { id: 1, nombre: 'Arroz', tipo: 'Menudeo' }
    pool.query.mockResolvedValueOnce({ rows: [productoFalso] })

    const req = crearReqMock({}, { id: '1' })
    const res = crearResMock()

    await obtenerProducto(req, res)

    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      producto: productoFalso
    })
  })

  it('devuelve 404 si el producto no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock({}, { id: '999' })
    const res = crearResMock()

    await obtenerProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Producto no encontrado.'
    })
  })

  it('devuelve 500 si la BD falla', async () => {
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock({}, { id: '1' })
    const res = crearResMock()

    await obtenerProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al obtener el producto.'
    })
  })
})

// ═════════════════════════════════════════════
// crearProducto()
// ═════════════════════════════════════════════

describe('crearProducto()', () => {
  it('devuelve 400 si falta el nombre', async () => {
    const req = crearReqMock({ tipo: 'Menudeo' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre y el tipo son obligatorios.'
    })
    expect(pool.query).not.toHaveBeenCalled()
  })

  it('devuelve 400 si falta el tipo', async () => {
    const req = crearReqMock({ nombre: 'Arroz' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre y el tipo son obligatorios.'
    })
  })

  it('devuelve 400 si el nombre no es string', async () => {
    const req = crearReqMock({ nombre: 12345, tipo: 'Menudeo' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre debe ser texto.'
    })
  })

  it('devuelve 400 si el nombre tiene menos de 2 caracteres', async () => {
    const req = crearReqMock({ nombre: 'A', tipo: 'Menudeo' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre debe tener al menos 2 caracteres.'
    })
  })

  it('devuelve 400 si el nombre supera los 200 caracteres', async () => {
    const nombreLargo = 'A'.repeat(201)
    const req = crearReqMock({ nombre: nombreLargo, tipo: 'Menudeo' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre no puede superar los 200 caracteres.'
    })
  })

  it('devuelve 400 si el tipo no es válido', async () => {
    const req = crearReqMock({ nombre: 'Arroz', tipo: 'Inventado' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
    })
  })

  it('devuelve 400 si la descripción supera los 1000 caracteres', async () => {
    const descripcionLarga = 'A'.repeat(1001)
    const req = crearReqMock({
      nombre: 'Arroz',
      tipo: 'Menudeo',
      descripcion: descripcionLarga
    })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'La descripción no puede superar los 1000 caracteres.'
    })
  })

  it('crea el producto y devuelve 201 con datos válidos', async () => {
    const productoInsertado = {
      id: 11,
      nombre: 'Arroz',
      tipo: 'Menudeo',
      descripcion: null,
      imagen: null,
      categoria_id: null,
      activo: true
    }
    pool.query.mockResolvedValueOnce({ rows: [productoInsertado] })

    const req = crearReqMock({
      nombre: '  Arroz  ',
      tipo: 'Menudeo'
    })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      mensaje: 'Producto creado correctamente.',
      producto: productoInsertado
    })
  })

  it('devuelve 500 si la BD falla al insertar', async () => {
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock({ nombre: 'Arroz', tipo: 'Menudeo' })
    const res = crearResMock()

    await crearProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al crear el producto.'
    })
  })
})

// ═════════════════════════════════════════════
// editarProducto()
// ═════════════════════════════════════════════

describe('editarProducto()', () => {
  it('devuelve 404 si el producto no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock({ nombre: 'Arroz' }, { id: '999' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Producto no encontrado.'
    })
  })

  it('devuelve 400 si el nombre nuevo no es string', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

    const req = crearReqMock({ nombre: 999 }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre debe ser texto.'
    })
  })

  it('devuelve 400 si el nombre nuevo es muy corto', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

    const req = crearReqMock({ nombre: 'A' }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre debe tener al menos 2 caracteres.'
    })
  })

  it('devuelve 400 si el nombre nuevo supera los 200 caracteres', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

    const req = crearReqMock({ nombre: 'A'.repeat(201) }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El nombre no puede superar los 200 caracteres.'
    })
  })

  it('devuelve 400 si el tipo nuevo no es válido', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

    const req = crearReqMock({ tipo: 'Inventado' }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'El tipo debe ser: Mayoreo, Menudeo o Mayoreo y menudeo.'
    })
  })

  it('devuelve 400 si la descripción nueva supera los 1000 caracteres', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

    const req = crearReqMock(
      { descripcion: 'A'.repeat(1001) },
      { id: '1' }
    )
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'La descripción no puede superar los 1000 caracteres.'
    })
  })

  it('actualiza el producto y devuelve ok: true', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })
    const productoActualizado = {
      id: 1,
      nombre: 'Arroz Premium',
      tipo: 'Mayoreo',
      descripcion: null,
      imagen: null,
      categoria_id: null,
      activo: true
    }
    pool.query.mockResolvedValueOnce({ rows: [productoActualizado] })

    const req = crearReqMock(
      { nombre: 'Arroz Premium', tipo: 'Mayoreo' },
      { id: '1' }
    )
    const res = crearResMock()

    await editarProducto(req, res)

    expect(pool.query).toHaveBeenCalledTimes(2)
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      mensaje: 'Producto actualizado correctamente.',
      producto: productoActualizado
    })
  })

  it('devuelve 500 si la BD falla durante la actualización', async () => {
    // SELECT id → sí encuentra el producto
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })
    // UPDATE → falla
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock({ nombre: 'Arroz' }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al actualizar el producto.'
    })
  })

  // ─────────────────────────────────────────────
  // Cubre la rama del ternario cuando activo NO es booleano
  // ─────────────────────────────────────────────
  it('actualiza solo el nombre sin tocar activo (rama null del ternario)', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })
    const productoActualizado = {
      id: 1,
      nombre: 'Arroz Editado',
      tipo: 'Menudeo',
      descripcion: null,
      imagen: null,
      categoria_id: null,
      activo: true
    }
    pool.query.mockResolvedValueOnce({ rows: [productoActualizado] })

    // OJO: no enviamos 'activo' → el ternario cae en null
    const req = crearReqMock({ nombre: 'Arroz Editado' }, { id: '1' })
    const res = crearResMock()

    await editarProducto(req, res)

    // Verificamos que el 6º parámetro del UPDATE fue null
    const parametrosDelUpdate = pool.query.mock.calls[1][1]
    expect(parametrosDelUpdate[5]).toBe(null)

    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      mensaje: 'Producto actualizado correctamente.',
      producto: productoActualizado
    })
  })
})

// ═════════════════════════════════════════════
// eliminarProducto()
// ═════════════════════════════════════════════

describe('eliminarProducto()', () => {
  it('devuelve 404 si el producto no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const req = crearReqMock({}, { id: '999' })
    const res = crearResMock()

    await eliminarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Producto no encontrado.'
    })
  })

  it('elimina el producto y devuelve ok: true', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, nombre: 'Arroz' }]
    })

    const req = crearReqMock({}, { id: '1' })
    const res = crearResMock()

    await eliminarProducto(req, res)

    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      mensaje: 'Producto eliminado correctamente.',
      producto: { id: 1, nombre: 'Arroz' }
    })
  })

  it('devuelve 500 si la BD falla al eliminar', async () => {
    pool.query.mockRejectedValueOnce(new Error('BD caída'))

    const req = crearReqMock({}, { id: '1' })
    const res = crearResMock()

    await eliminarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      mensaje: 'Error al eliminar el producto.'
    })
  })
})