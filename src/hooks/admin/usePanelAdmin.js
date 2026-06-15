import useReportes from "./useReportes";
import useCursos from "./useCursos";

function usePanelAdmin(habilitado, nombre) {
    const { totalAlumnos, totalProfesores, isLoading: loadingReportes } = useReportes(habilitado);
    const { cursos, isLoading: loadingCursos } = useCursos(habilitado);

    const cards = [
        { titulo: "total alumnos", valor: loadingReportes ? "..." : `${totalAlumnos} registrados` },
        { titulo: "profesores", valor: loadingReportes ? "..." : `${totalProfesores} activos` },
        { titulo: "cursos", valor: loadingCursos ? "..." : `${cursos.length} secciones` },
    ];

    return {
        saludo: `panel de control: ${nombre}`,
        cards,
        extra: null,
    };
}

export default usePanelAdmin;