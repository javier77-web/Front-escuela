import { useQuery } from "@tanstack/react-query";
import { getPorEvaluacion } from "../../api/gestionAcademica/evaluacionAlumnoService";

function useEvaluacionAlumnos(evaluacionId){
    const {
        data: alumnos = [],
        isLoading: loading,
        isError,
    } = useQuery({
        queryKey: ["evaluacion-alumnos", evaluacionId],
        queryFn: async() => {
            const {data} = await getPorEvaluacion(evaluacionId);
            return Array.isArray(data) ? data : [];
        },
        enabled: !!evaluacionId,
        staleTime: 5 * 60 * 1000,
    });
    const error = isError ? "Error al cargar alumnos de la evaluación." : null;
    return { alumnos, loading, error }
}

export default useEvaluacionAlumnos;
