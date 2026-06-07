import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getEvaluacionesPorAsignatura } from "../../api/gestionAcademica/evaluacionService";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

//Actualicé el hook ya que cambiaba la estrcutura en las cards,
//Se supone quedó casi listo para luego cambiar el mock por el fetch a la api
function useNotasAlumno() {
  const { user } = useContext(AuthContext);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Obtener todas las asignaturas
        const { data: asignaturas } = await getAsignaturas();

        // 2. Por cada asignatura obtener sus evaluaciones en paralelo
        const resultados = await Promise.allSettled(
          asignaturas.map(async (asignatura) => {
            const { data: evaluaciones } = await getEvaluacionesPorAsignatura(
              asignatura.id_asignatura
            );
            const notasValidas = evaluaciones
              .map((e) => parseFloat(e.nota))
              .filter((n) => !isNaN(n));

            return {
              asignatura: asignatura.nombre,
              notas: notasValidas,
              promedio:
                notasValidas.length > 0
                  ? notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length
                  : 0,
            };
          })
        );

        const lista = resultados
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value)
          .filter((a) => a.notas.length > 0); // omite asignaturas sin notas

        setNotas(lista);
      } catch (err) {
        setError("No se pudieron cargar las notas.");
        console.error("Error al cargar notas:", err.response?.data ?? err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [user]);

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
    error
  };
}

export default useNotasAlumno;