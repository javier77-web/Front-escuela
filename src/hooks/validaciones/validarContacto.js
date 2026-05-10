// validaciones reutilizables del sistema

// funciones de validacion del formulario contacto
export function validarContacto(valores) {
  let errores = {};

  if (!valores.nombre.trim()) {
    errores.nombre = "el nombre es obligatorio";
  }

  if (!valores.correo) {
    errores.correo = "el correo es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(valores.correo)) {
    errores.correo = "correo invalido";
  }

  if (!valores.mensaje.trim()) {
    errores.mensaje = "el mensaje es obligatorio";
  }

  return errores;
}

