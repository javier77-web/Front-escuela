// validar formulario de crear usuario (admin)
export function validarUsuario(valores) {
  let errores = {};

  if (!valores.nombre.trim()) {
    errores.nombre = "el nombre es obligatorio";
  }

  if (!valores.apellido.trim()) {
    errores.apellido = "el apellido es obligatorio";
  }

  if (!valores.email) {
    errores.email = "el email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
    errores.email = "email invalido";
  }

  return errores;
}
