import { useState } from "react";

function useNotasProfesor() {
  const [alumnos, setAlumnos] = useState([
    { nombre: "juan", notas: [6.5, 5.8, 7.0] },
    { nombre: "maria", notas: [5.5, 6.2, 6.8] },
    { nombre: "pedro", notas: [7.0, 6.5, 6.9] },
  ]);

  // actualizar nota
  const actualizarNota = (i, j, valor) => {
    const nuevos = [...alumnos];
    nuevos[i].notas[j] = parseFloat(valor) || 0;
    setAlumnos(nuevos);
  };

  // promedio (number)
  const calcularPromedio = (notas) =>
    notas.reduce((acc, n) => acc + n, 0) / notas.length || 0;

  // color del badge
  const getTipo = (promedio) => {
    if (promedio >= 6) return "success";
    if (promedio >= 4) return "warning";
    return "danger";
  };

  return {
    alumnos,
    actualizarNota,
    calcularPromedio,
    getTipo,
  };
}

export default useNotasProfesor;
