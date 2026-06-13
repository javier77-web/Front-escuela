import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getPorEvaluacion,
    crearEvaluacionAlumno,
    actualizarNota,
} from "../../api/gestionAcademica/evaluacionAlumnoService";

// Combina los alumnos del curso con sus notas para una evaluación específica.
// Solo hace fetch cuando "habilitado" es true (ej: cuando el profesor expande la evaluación).
function useNotasEvaluacion(idEvaluacion, alumnosCurso) {
    console.log({
        idEvaluacion
    });
    const queryClient = useQueryClient();

    const { data: relaciones = [], isLoading, isError } = useQuery({
        queryKey: ["evaluacion-alumnos", idEvaluacion],
        queryFn: async () => {
            console.log("ENTRANDO AL QUERY");

            const response = await getPorEvaluacion(idEvaluacion);

            console.log("RESPUESTA", response.data);

            return Array.isArray(response.data)
                ? response.data
                : [];
        },
        enabled: !!idEvaluacion,
        staleTime: 60 * 1000,
    });

    const filas = alumnosCurso.map((alumno) => {
        const relacion = relaciones.find(
            (r) => (r.usuario?.firebaseuid ?? r.firebaseuid) === alumno.firebaseuid,
        );

        console.log({
            alumnoFirebaseuid: alumno.firebaseuid,
            relacionesFirebaseuid: relaciones.map(r => r.firebaseuid),
            relacionEncontrada: relacion
        });

        return {
            firebaseuid: alumno.firebaseuid,
            nombre: `${alumno.nombre} ${alumno.apellido}`,
            nota: relacion?.nota != null ? parseFloat(relacion.nota) : null,
            tieneRelacion: !!relacion,
        };
    });

    const guardarNota = async (firebaseuid, nota) => {
        const fila = filas.find((f) => f.firebaseuid === firebaseuid);

        if (fila?.tieneRelacion) {
            await actualizarNota(idEvaluacion, firebaseuid, { nota });
        } else {
            await crearEvaluacionAlumno({
            nota,
            evaluacion_id: idEvaluacion,
            firebaseuid,
            });
        }

        await queryClient.invalidateQueries({
            queryKey: ["evaluacion-alumnos", idEvaluacion],
        });
    };

    const error = isError
        ? "No se pudieron cargar las notas de esta evaluación."
        : null;

    return { filas, loading: isLoading, error, guardarNota };
}

export default useNotasEvaluacion;