// Cubre: mayúsculas, minúsculas, tildes (á é í ó ú), diéresis (ü), ñ y espacio.
// Rechaza: dígitos, símbolos, emojis y cualquier otro carácter.
const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/;

/**
 * Valida el formulario de usuario (crear y editar).
 * @param {{ nombre: string, apellido: string, email?: string }} valores
 * @param {boolean} modoEdicion - si es true, omite la validación del email
 * @returns {{ nombre?: string, apellido?: string, email?: string }}
 */
export function validarUsuario(valores, modoEdicion = false) {
  const errores = {};

  // --- nombre ---
  if (!valores.nombre.trim()) {
    errores.nombre = "el nombre es obligatorio";
  } else if (valores.nombre.trim().length < 2) {
    errores.nombre = "el nombre debe tener al menos 2 caracteres";
  } else if (!SOLO_LETRAS.test(valores.nombre.trim())) {
    errores.nombre = "el nombre no acepta números ni caracteres especiales";
  }

  // --- apellido ---
  if (!valores.apellido.trim()) {
    errores.apellido = "el apellido es obligatorio";
  } else if (valores.apellido.trim().length < 2) {
    errores.apellido = "el apellido debe tener al menos 2 caracteres";
  } else if (!SOLO_LETRAS.test(valores.apellido.trim())) {
    errores.apellido = "el apellido no acepta números ni caracteres especiales";
  }

  // --- email (solo al crear) ---
  if (!modoEdicion) {
    if (!valores.email?.trim()) {
      errores.email = "el email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
      errores.email = "email inválido";
    }
  }

  return errores;
}