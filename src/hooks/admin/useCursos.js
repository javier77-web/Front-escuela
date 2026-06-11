import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import {
  getCursos,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} from "../../api/gestionAcademica/cursoService";

function useCursos() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: cursos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      const { data } = await getCursos();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const agregarCurso = async ({ nombre }) => {
    await crearCurso({ nombre });
    await queryClient.invalidateQueries({ queryKey: ["cursos"] });
  };

  const editarCurso = async (id, { nombre }) => {
    await actualizarCurso(id, { nombre });
    await queryClient.invalidateQueries({ queryKey: ["cursos"] });
  };

  const borrarCurso = async (id) => {
    await eliminarCurso(id);
    await queryClient.invalidateQueries({ queryKey: ["cursos"] });
  };

  const error = isError ? "No se pudieron cargar los cursos." : null;

  return { cursos, isLoading, error, agregarCurso, editarCurso, borrarCurso };
}

export default useCursos;
