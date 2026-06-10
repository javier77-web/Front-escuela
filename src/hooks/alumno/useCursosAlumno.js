import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

// Carga todas las asignaturas disponibles para el alumno.
// Si el backend expone un endpoint filtrado por alumno en el futuro,
// reemplazar getAsignaturas() por ese llamado.
function useCursosAlumno() {
  const { user } = useContext(AuthContext);

  const {
    data: cursos = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["asignaturas", user?.uid],
    queryFn: async () => {
      const { data } = await getAsignaturas();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const error = isError ? "No se pudieron cargar los cursos." : null;

  return { cursos, loading, error };
}

export default useCursosAlumno;
