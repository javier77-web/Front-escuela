import { useQuery } from "@tanstack/react-query";
import { getEvaluacionesPorAsignatura } from "../../api/gestionAcademica/evaluacionService";

function useNotasProfesor(idAsignatura) {
  const {
    data: evaluaciones = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["evaluaciones", idAsignatura],
    queryFn: async () => {
      const { data } = await getEvaluacionesPorAsignatura(idAsignatura);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!idAsignatura,
    staleTime: 5 * 60 * 1000,
  });

  const getTipo = (nota) => {
    if (nota >= 6) return "success";
    if (nota >= 4) return "warning";
    return "danger";
  };

  const error = isError ? "No se pudieron cargar las evaluaciones." : null;

  return { evaluaciones, getTipo, loading, error };
}

export default useNotasProfesor;