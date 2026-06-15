import { useQuery } from "@tanstack/react-query";
import { getUsuariosPorCurso } from "../api/gestionUsuario/usuariosApi";

function useUsuariosCurso(cursoId) {

    const {
        data: alumnos = [],
        isLoading: loading,
        isError,
    } = useQuery({
        queryKey: ["usuariosCurso", cursoId],
        queryFn: async () => {
            const { data } = await getUsuariosPorCurso(cursoId);
            return Array.isArray(data) ? data : [];
        },
        enabled: !!cursoId,
        staleTime: 5 * 60 * 1000,
    });

    const error = isError
        ? "No se pudieron cargar los alumnos."
        : null;

    return { alumnos, loading, error };
}

export default useUsuariosCurso;