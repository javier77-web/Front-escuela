import { useEffect, useState } from "react";
import { getAsignaturasProfesor } from "../../api/gestionAcademica/asignaturaService";

function usePanelProfesor(habilitado, firebaseuid, nombre) {
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        if (!habilitado || !firebaseuid) return;

    let activo = true;

    const cargar = async () => {
        try {
            const { data } = await getAsignaturasProfesor(firebaseuid);
            if (activo) setAsignaturas(Array.isArray(data) ? data : []);
        } catch (error) {
            if (activo) setAsignaturas([]);
            console.error(
            "No se pudieron cargar las asignaturas del profesor:",
            error.response?.status ?? error.message,
            );
        }
    };

    cargar();
    return () => { activo = false; };
    }, [habilitado, firebaseuid]);

    const totalAsignaturas = asignaturas.length;
    const totalCursos = new Set(
        asignaturas.flatMap((a) => (a.cursos || []).map((c) => c.id_curso)),
    ).size;

    const cards = [
        { titulo: "Asignaturas", valor: totalAsignaturas },
        { titulo: "Cursos", valor: totalCursos },
        { titulo: "Clases Hoy", valor: totalAsignaturas },
    ];

    return {
        saludo: `bienvenido profesor, ${nombre}`,
        cards,
        extra: { asignaturas },
    };
}

export default usePanelProfesor;