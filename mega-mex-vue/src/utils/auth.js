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


// INICIAR SESIÓN
export const iniciarSesion = (correo, password) => {

  const usuario = usuariosDemo.find(
    usuario =>
      usuario.correo === correo &&
      usuario.password === password
  )


  if (!usuario) {
    return null
  }


  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  }


  localStorage.setItem(
    'usuarioMegaMex',
    JSON.stringify(sesion)
  )


  return sesion
}


// OBTENER USUARIO ACTUAL
export const obtenerUsuario = () => {

  const usuario =
    localStorage.getItem('usuarioMegaMex')


  if (!usuario) {
    return null
  }


  try {

    return JSON.parse(usuario)

  } catch (error) {

    return null

  }
}


// CERRAR SESIÓN
export const cerrarSesion = () => {

  localStorage.removeItem(
    'usuarioMegaMex'
  )

}


// SABER SI HAY SESIÓN
export const estaAutenticado = () => {

  return !!obtenerUsuario()

}


// SABER SI ES ADMINISTRADOR
export const esAdministrador = () => {

  const usuario =
    obtenerUsuario()


  return usuario?.rol === 'admin'

}