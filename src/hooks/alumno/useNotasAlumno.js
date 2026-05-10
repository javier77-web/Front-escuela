import { useState, useEffect } from "react";

function useNotasAlumno() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simula backend (después aquí va fetch)
    const data = [
      {
        asignatura: "Matemáticas",
        nota1: 6.5,
        nota2: 5.8,
        nota3: 7.0,
      },
      {
        asignatura: "Lenguaje",
        nota1: 5.5,
        nota2: 6.2,
        nota3: 6.8,
      },
      {
        asignatura: "Historia",
        nota1: 7.0,
        nota2: 6.5,
        nota3: 6.9,
      },
      {
        asignatura: "Ciencias",
        nota1: 4.5,
        nota2: 5.0,
        nota3: 5.5,
      },
      {
        asignatura: "Inglés",
        nota1: 6.8,
        nota2: 7.0,
        nota3: 6.5,
      },
    ];

    // calcular promedio dentro del hook 🔥
    const conPromedio = data.map((n) => {
      const promedio = (n.nota1 + n.nota2 + n.nota3) / 3;

      return {
        ...n,
        promedio,
      };
    });

    setNotas(conPromedio);
    setLoading(false);
  }, []);

  const promedioGeneral = notas.length
    ? (notas.reduce((acc, n) => acc + n.promedio, 0) / notas.length).toFixed(1)
    : "0.0";

  return {
    notas,
    promedioGeneral,
    loading,
  };
}

export default useNotasAlumno;
