// validar formulario de crear usuario (admin)
export function validarUsuario(valores, modoEdicion = false) {
  let errores = {};

  if (!valores.nombre.trim()) {
    errores.nombre = "el nombre es obligatorio";
  }

  if (!valores.apellido.trim()) {
    errores.apellido = "el apellido es obligatorio";
  }

  // solo valida email al crear
  if (!modoEdicion) {
    if (!valores.email) {
      errores.email = "el email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
      errores.email = "email invalido";
    }
  }

  return errores;
}
