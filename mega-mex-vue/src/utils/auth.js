// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

// true  = trabajamos temporalmente solo con Vue
// false = utilizará Node.js + Express
//
// Cuando hagamos el backend solamente cambiaremos
// este valor a false.
const USAR_MODO_PRUEBA = true


// URL que tendrá nuestro backend
const API_URL = 'http://localhost:3000/api'


// =====================================================
// CLAVES DE LOCALSTORAGE
// =====================================================

const CLAVE_SESION = 'sesionMegaMex'

const CLAVE_USUARIOS = 'usuariosRegistradosMegaMex'


// =====================================================
// USUARIOS TEMPORALES
// =====================================================
//
// Estos usuarios solamente existen mientras
// estamos desarrollando el frontend.
//
// Cuando conectemos PostgreSQL se eliminarán.
// =====================================================

const usuariosDemo = [

  {
    id: 1,

    nombre: 'Administrador Mega-Mex',

    correo: 'admin@megamex.com',

    password: 'Admin123',

    rol: 'admin'
  },

  {
    id: 2,

    nombre: 'Cliente Mega-Mex',

    correo: 'cliente@megamex.com',

    password: 'Cliente123',

    rol: 'cliente'
  }

]


// =====================================================
// SIMULAR RESPUESTA DEL SERVIDOR
// =====================================================

const esperar = (ms) => {

  return new Promise(
    resolve => setTimeout(resolve, ms)
  )

}


// =====================================================
// OBTENER USUARIOS REGISTRADOS
// =====================================================

const obtenerUsuariosRegistrados = () => {

  const datos =
    localStorage.getItem(CLAVE_USUARIOS)


  if (!datos) {

    return []

  }


  try {

    const usuarios =
      JSON.parse(datos)


    return Array.isArray(usuarios)
      ? usuarios
      : []

  }

  catch {

    localStorage.removeItem(CLAVE_USUARIOS)

    return []

  }

}


// =====================================================
// GUARDAR USUARIOS REGISTRADOS
// =====================================================

const guardarUsuariosRegistrados = (usuarios) => {

  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuarios)
  )

}


// =====================================================
// GUARDAR SESIÓN
// =====================================================

const guardarSesion = (sesion) => {

  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(sesion)
  )

}


// =====================================================
// INICIAR SESIÓN
// =====================================================

export const iniciarSesion = async (
  correo,
  password
) => {

  // Limpiar correo
  const correoLimpio =
    correo.trim().toLowerCase()


  // ===================================================
  // MODO DE PRUEBA
  // ===================================================

  if (USAR_MODO_PRUEBA) {

    // Simular que estamos consultando un servidor
    await esperar(500)


    // Obtener usuarios creados desde Registro.vue
    const usuariosRegistrados =
      obtenerUsuariosRegistrados()


    // Juntar usuarios de prueba + registrados
    const todosLosUsuarios = [

      ...usuariosDemo,

      ...usuariosRegistrados

    ]


    // Buscar usuario
    const usuario =
      todosLosUsuarios.find(

        item =>

          item.correo.toLowerCase()
            === correoLimpio

          &&

          item.password
            === password

      )


    // Si no existe
    if (!usuario) {

      throw new Error(
        'Correo o contraseña incorrectos.'
      )

    }


    // =================================================
    // USUARIO QUE GUARDAREMOS EN LA SESIÓN
    // =================================================
    //
    // No guardamos la contraseña dentro de la sesión.
    // =================================================

    const usuarioSeguro = {

      id:
        usuario.id,

      nombre:
        usuario.nombre,

      correo:
        usuario.correo,

      rol:
        usuario.rol

    }


    // =================================================
    // CREAR SESIÓN TEMPORAL
    // =================================================

    const sesion = {

      token:
        'token-temporal-frontend',

      usuario:
        usuarioSeguro

    }


    // Guardar sesión
    guardarSesion(sesion)


    // Devolver sesión a Login.vue
    return sesion

  }


  // ===================================================
  // FUTURO BACKEND NODE.JS + EXPRESS
  // ===================================================

  const respuesta =
    await fetch(
      `${API_URL}/auth/login`,
      {

        method:
          'POST',

        headers: {

          'Content-Type':
            'application/json'

        },

        body:
          JSON.stringify({

            correo:
              correoLimpio,

            password:
              password

          })

      }
    )


  // ===================================================
  // LEER RESPUESTA
  // ===================================================

  const datos =
    await respuesta.json()


  // ===================================================
  // ERROR DEL BACKEND
  // ===================================================

  if (!respuesta.ok) {

    throw new Error(

      datos.mensaje ||

      'No fue posible iniciar sesión.'

    )

  }


  // ===================================================
  // GUARDAR SESIÓN REAL
  // ===================================================

  guardarSesion(datos)


  return datos

}


// =====================================================
// REGISTRAR NUEVO USUARIO
// =====================================================

export const registrarUsuario = async ({
  nombre,
  correo,
  password
}) => {

  const nombreLimpio =
    nombre.trim()


  const correoLimpio =
    correo.trim().toLowerCase()


  // ===================================================
  // MODO FRONTEND
  // ===================================================

  if (USAR_MODO_PRUEBA) {

    await esperar(500)


    // =================================================
    // OBTENER USUARIOS EXISTENTES
    // =================================================

    const usuariosRegistrados =
      obtenerUsuariosRegistrados()


    // =================================================
    // REVISAR USUARIOS DEMO
    // =================================================

    const existeDemo =
      usuariosDemo.some(

        usuario =>

          usuario.correo.toLowerCase()
            === correoLimpio

      )


    // =================================================
    // REVISAR USUARIOS REGISTRADOS
    // =================================================

    const existeRegistrado =
      usuariosRegistrados.some(

        usuario =>

          usuario.correo.toLowerCase()
            === correoLimpio

      )


    // =================================================
    // CORREO REPETIDO
    // =================================================

    if (
      existeDemo ||
      existeRegistrado
    ) {

      throw new Error(
        'Ya existe una cuenta con este correo.'
      )

    }


    // =================================================
    // CREAR USUARIO
    // =================================================

    const nuevoUsuario = {

      id:
        Date.now(),

      nombre:
        nombreLimpio,

      correo:
        correoLimpio,

      password:
        password,

      // Todos los usuarios que se registran
      // desde la página serán clientes.
      //
      // Nunca podrán registrarse como admin.
      rol:
        'cliente'

    }


    // =================================================
    // AGREGAR USUARIO
    // =================================================

    usuariosRegistrados.push(
      nuevoUsuario
    )


    // =================================================
    // GUARDAR
    // =================================================

    guardarUsuariosRegistrados(
      usuariosRegistrados
    )


    // =================================================
    // RESPUESTA
    // =================================================

    return {

      mensaje:
        'Usuario registrado correctamente.',

      usuario: {

        id:
          nuevoUsuario.id,

        nombre:
          nuevoUsuario.nombre,

        correo:
          nuevoUsuario.correo,

        rol:
          nuevoUsuario.rol

      }

    }

  }


  // ===================================================
  // FUTURO BACKEND
  // ===================================================

  const respuesta =
    await fetch(
      `${API_URL}/auth/registro`,
      {

        method:
          'POST',

        headers: {

          'Content-Type':
            'application/json'

        },

        body:
          JSON.stringify({

            nombre:
              nombreLimpio,

            correo:
              correoLimpio,

            password:
              password

          })

      }
    )


  const datos =
    await respuesta.json()


  if (!respuesta.ok) {

    throw new Error(

      datos.mensaje ||

      'No fue posible crear la cuenta.'

    )

  }


  return datos

}


// =====================================================
// OBTENER SESIÓN
// =====================================================

export const obtenerSesion = () => {

  const datos =
    localStorage.getItem(CLAVE_SESION)


  if (!datos) {

    return null

  }


  try {

    return JSON.parse(datos)

  }

  catch {

    localStorage.removeItem(CLAVE_SESION)

    return null

  }

}


// =====================================================
// OBTENER USUARIO ACTUAL
// =====================================================

export const obtenerUsuario = () => {

  const sesion =
    obtenerSesion()


  return sesion?.usuario || null

}


// =====================================================
// OBTENER TOKEN
// =====================================================

export const obtenerToken = () => {

  const sesion =
    obtenerSesion()


  return sesion?.token || null

}


// =====================================================
// SABER SI HAY UNA SESIÓN
// =====================================================

export const estaAutenticado = () => {

  return !!obtenerUsuario()

}


// =====================================================
// VERIFICAR ROL
// =====================================================

export const tieneRol = (rol) => {

  const usuario =
    obtenerUsuario()


  return usuario?.rol === rol

}


// =====================================================
// VERIFICAR ADMINISTRADOR
// =====================================================

export const esAdministrador = () => {

  return tieneRol('admin')

}


// =====================================================
// VERIFICAR CLIENTE
// =====================================================

export const esCliente = () => {

  return tieneRol('cliente')

}


// =====================================================
// CERRAR SESIÓN
// =====================================================

export const cerrarSesion = () => {

  localStorage.removeItem(
    CLAVE_SESION
  )

}