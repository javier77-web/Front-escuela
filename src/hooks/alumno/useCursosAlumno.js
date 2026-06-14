import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAsignaturasPorCurso, getAsignaturaPorId } from "../../api/gestionAcademica/asignaturaService";
import { getUsuarioPorUid } from "../../api/gestionUsuario/usuariosApi";

function useCursosAlumno(habilitado = true) {
  const { perfil } = useContext(AuthContext);

  const { data: cursos = [], isLoading: loading, isError } = useQuery({
    queryKey: ["asignaturas-alumno", perfil?.cursoId],
    queryFn: async () => {
      const { data } = await getAsignaturasPorCurso(perfil.cursoId);
      const asignaturas = Array.isArray(data) ? data : [];

      const enriquecidas = await Promise.allSettled(
        asignaturas.map(async (asignatura) => {
          try {
            const { data: detalle } = await getAsignaturaPorId(asignatura.id_asignatura);

            const profesorUid = detalle.profesor_uid ?? detalle.profesorUid;
            if (!profesorUid) return { ...asignatura, profesor: null };

            const { data: profesor } = await getUsuarioPorUid(profesorUid);

            return {
              ...asignatura,
              profesor: `${profesor.nombre} ${profesor.apellido}`,
            };
          } catch {
            return { ...asignatura, profesor: null };
          }
        })
      );

      return enriquecidas.map((r) =>
        r.status === "fulfilled" ? r.value : { profesor: null }
      );
    },
    enabled: !!perfil?.cursoId && habilitado,
    staleTime: 5 * 60 * 1000,
  });

  const error = isError ? "No se pudieron cargar los cursos." : null;

  return { cursos, loading, error };
}

export default useCursosAlumno;