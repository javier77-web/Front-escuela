import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvaluacionesPorAsignatura, actualizarEvaluacion } from "../../api/gestionAcademica/evaluacionService";


function useNotasProfesor(idAsignatura) {
  const queryClient = useQueryClient();

  const { data: evaluaciones = [], isLoading: loading, isError } = useQuery({
    queryKey: ["evaluaciones", idAsignatura],
    queryFn: async () => {
      const { data } = await getEvaluacionesPorAsignatura(idAsignatura);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!idAsignatura,
    staleTime: 5 * 60 * 1000,
  });

  // actualizar nota
  const actualizarNota = async (idEvaluacion, nota) => {
    try {
      await actualizarEvaluacion(idEvaluacion, { nota });
      // refresca la lista de evaluaciones de esta asignatura
      await queryClient.invalidateQueries({ queryKey: ["evaluaciones", idAsignatura] });
    } catch (err) {
      console.error("Error al actualizar nota:", err.response?.data ?? err.message);
    }
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

  const error = isError ? "No se pudieron cargar las notas." : null;
  
  return {
    evaluaciones,
    actualizarNota,
    calcularPromedio,
    getTipo,
    loading,
    error,
  };
}

export default useNotasProfesor;
