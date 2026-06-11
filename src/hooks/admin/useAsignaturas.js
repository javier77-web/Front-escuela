import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import {
  getAsignaturas,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura,
  asignarCursosAsignatura,
} from "../../api/gestionAcademica/asignaturaService";
import api from "../../api/axiosConfig";

function useAsignaturas() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: asignaturas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["asignaturas-admin"],
    queryFn: async () => {
      const { data } = await getAsignaturas();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const agregarAsignatura = async ({ nombre, curso_id }) => {
    await crearAsignatura({ nombre, curso_id });
    await queryClient.invalidateQueries({ queryKey: ["asignaturas-admin"] });
  };

  const editarAsignatura = async (id, { nombre, curso_id }) => {
    await actualizarAsignatura(id, { nombre, curso_id });
    await queryClient.invalidateQueries({ queryKey: ["asignaturas-admin"] });
  };

  const borrarAsignatura = async (id) => {
    await eliminarAsignatura(id);
    await queryClient.invalidateQueries({ queryKey: ["asignaturas-admin"] });
  };

  const asignarProfesor = async (idAsignatura, profesorUid) => {
    await api.put(`/api/academica/asignaturas/${idAsignatura}/profesor`, {
      profesor_uid: profesorUid,
    });
    await queryClient.invalidateQueries({ queryKey: ["asignaturas-admin"] });
  };

  // agrega este método dentro del hook
  const asignarCursos = async (idAsignatura, cursoIds) => {
    await asignarCursosAsignatura(idAsignatura, cursoIds);
    await queryClient.invalidateQueries({ queryKey: ["asignaturas-admin"] });
  };

  const error = isError ? "No se pudieron cargar las asignaturas." : null;

  return {
    asignaturas,
    isLoading,
    error,
    agregarAsignatura,
    editarAsignatura,
    borrarAsignatura,
    asignarProfesor,
    asignarCursos,
  };
}

export default useAsignaturas;
