// Replica la validación del backend (gestión académica - Node)
// Formatos válidos: '1ro basico A', '7mo basico B', '1ro medio A', '4to medio D', etc.
const ORDINALES = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo", "8vo"];
const FORMATO_CURSO = new RegExp(
    `^(${ORDINALES.join("|")}) (basico|medio) [A-Z]$`
);

const EJEMPLOS = "'1ro basico A', '7mo basico B', '1ro medio A', '4to medio D'";

export function validarCurso(valores) {
    const errores = {};
    const nombre = valores.nombre?.trim() ?? "";

    if (!nombre) {
        errores.nombre = "el nombre es obligatorio";
    } else if (!FORMATO_CURSO.test(nombre)) {
        errores.nombre = `Formato inválido. Ejemplos: ${EJEMPLOS}`;
    }

    return errores;
}