import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAsignaturasPorCurso } from "../../api/gestionAcademica/asignaturaService";

// Carga todas las asignaturas disponibles para el alumno.
// Si el backend expone un endpoint filtrado por alumno en el futuro,
// reemplazar getAsignaturas() por ese llamado.
function useCursosAlumno(habilitado=true) {
  const { perfil } = useContext(AuthContext);
  const {data: cursos = [],isLoading: loading,isError,} 
  = useQuery({
    queryKey: ["asignaturas", perfil?.cursoId],
    queryFn: async () => {
      const { data } = await getAsignaturasPorCurso(perfil.cursoId);

      return Array.isArray(data) ? data : [];
    },
    enabled: !!perfil?.cursoId && habilitado,
    staleTime: 5 * 60 * 1000,
  });

  const error = isError ? "No se pudieron cargar los cursos." : null;

  return { cursos, loading, error };
}

export default useCursosAlumno;
