import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

// Carga las asignaturas del profesor autenticado.
// Si el backend expone /asignaturas/profesor/:uid en el futuro,
// reemplazar getAsignaturas() por ese endpoint filtrado.
function useCursosProfesor() {
  const { user } = useContext(AuthContext);

  const {
    data: asignaturas = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["asignaturas", user?.uid],
    queryFn: async () => {
      const { data } = await getAsignaturas();
      const todas = Array.isArray(data) ? data : [];
      // filtra solo las asignaturas asignadas a este profesor
      return todas.filter((a) => a.profesor_uid === user.uid);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const error = isError ? "No se pudieron cargar las clases." : null;

  return { asignaturas, loading, error };
}

export default useCursosProfesor;
