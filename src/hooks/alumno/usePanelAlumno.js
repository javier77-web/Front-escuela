import useCursosAlumno from "./useCursosAlumno";
import useNotasAlumno from "./useNotasAlumno";
import useAsistenciaAlumno from "./useAsistenciaAlumno";

function usePanelAlumno(habilitado, nombre) {
    const { cursos, loading: loadingCursos } = useCursosAlumno(habilitado);
    const { promedioGeneral, loading: loadingNotas } = useNotasAlumno(habilitado);
    const { promedioGlobal, loading: loadingAsistencia } = useAsistenciaAlumno(habilitado);

    const cards = [
        { titulo: "asignaturas", valor: loadingCursos ? "..." : `${cursos.length} inscritas` },
        { titulo: "promedio", valor: loadingNotas ? "..." : promedioGeneral },
        { titulo: "asistencia", valor: loadingAsistencia ? "..." : `${promedioGlobal}%` },
    ];

    return {
        saludo: `bienvenido alumno, ${nombre}`,
        cards,
        extra: null,
    };
}

export default usePanelAlumno;