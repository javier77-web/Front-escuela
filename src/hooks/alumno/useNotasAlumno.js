import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getEvaluacionesPorAsignatura } from "../../api/gestionAcademica/evaluacionService";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

//Actualicé el hook ya que cambiaba la estrcutura en las cards,
//Se supone quedó casi listo para luego cambiar el mock por el fetch a la api
function useNotasAlumno() {
  const { user } = useContext(AuthContext);

  const {
    data: notas = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["notas-alumno", user?.uid],
    queryFn: async () => {
      // 1. Obtener todas las asignaturas
      const { data: asignaturas } = await getAsignaturas();

      // 2. Por cada asignatura obtener sus evaluaciones en paralelo
      const resultados = await Promise.allSettled(
        asignaturas.map(async (asignatura) => {
          const { data: evaluaciones } = await getEvaluacionesPorAsignatura(
            asignatura.id_asignatura,
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
        }),
      );

      return resultados
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value)
        .filter((a) => a.notas.length > 0); // omite asignaturas sin notas
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const promedioGeneral = notas.length
    ? (
        notas.reduce((acc, asignatura) => acc + asignatura.promedio, 0) /
        notas.length
      ).toFixed(1)
    : "0.0";

  const error = isError ? "no se pudieron cargar las notas." : null;

  return {
    notas,
    promedioGeneral,
    loading,
    error,
  };
}

export default useNotasAlumno;
