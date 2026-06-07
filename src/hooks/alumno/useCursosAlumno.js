import { useState, useEffect } from "react";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

// Carga todas las asignaturas disponibles para el alumno.
// Si el backend expone un endpoint filtrado por alumno en el futuro,
// reemplazar getAsignaturas() por ese llamado.
function useCursosAlumno() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getAsignaturas();
            setCursos(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("No se pudieron cargar los cursos.");
            console.error("Error al cargar cursos:", err.response?.data ?? err.message);
        } finally {
            setLoading(false);
        }
        };

        cargar();
    }, []);

    return { cursos, loading, error };
}

export default useCursosAlumno;
