import useCursosAlumno from "./useCursosAlumno";
import useNotasAlumno from "./useNotasAlumno";
import useAsistenciaAlumno from "./useAsistenciaAlumno";

function usePanelAlumno(habilitado, nombre) {
    const { cursos, loading: loadingCursos } = useCursosAlumno(habilitado);
    const { promedioGeneral, loading: loadingNotas } = useNotasAlumno(habilitado);
    const { promedioGlobal, loading: loadingAsistencia } = useAsistenciaAlumno(habilitado);

    const cards = [
        { titulo: "cursos", valor: loadingCursos ? "..." : `${cursos.length} inscritos` },
        { titulo: "promedio", valor: loadingNotas ? "..." : promedioGeneral },
        { titulo: "asistencia", valor: loadingAsistencia ? "..." : `${promedioGlobal}%` },
    ];

    return {
        saludo: `bienvenido, ${nombre}`,
        cards,
        extra: null,
    };
}

export default usePanelAlumno;