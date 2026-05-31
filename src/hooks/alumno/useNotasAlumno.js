import { useState, useEffect } from "react";

//Actualicé el hook ya que cambiaba la estrcutura en las cards,
//Se supone quedó casi listo para luego cambiar el mock por el fetch a la api

function useNotasAlumno() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNotas = async () => {
      try {
        // Simulación de latencia de red
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock temporal hasta conectar la API
        const data = [
          { asignatura: "Matemáticas", notas: [6.5, 5.8, 7.0] },
          { asignatura: "Lenguaje", notas: [5.5, 6.2, 6.8] },
          { asignatura: "Historia", notas: [7.0, 6.5, 6.9] },
          { asignatura: "Ciencias", notas: [4.5, 5.0, 5.5] },
          { asignatura: "Inglés", notas: [6.8, 7.0, 6.5] },
        ];

        const conPromedio = data.map((asignatura) => ({
          ...asignatura,
          promedio:
            asignatura.notas.reduce((acc, nota) => acc + nota, 0) /
            asignatura.notas.length,
        }));

        setNotas(conPromedio);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarNotas();
  }, []);

  const promedioGeneral = notas.length
    ? (
        notas.reduce((acc, asignatura) => acc + asignatura.promedio, 0) /
        notas.length
      ).toFixed(1)
    : "0.0";

  return {
    notas,
    promedioGeneral,
    loading,
  };
}

export default useNotasAlumno;