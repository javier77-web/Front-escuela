import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getAsignaturas } from "../../api/gestionAcademica/asignaturaService";

// Carga las asignaturas del profesor autenticado.
// Si el backend expone /asignaturas/profesor/:uid en el futuro,
// reemplazar getAsignaturas() por ese endpoint filtrado.
function useCursosProfesor() {
    const { user } = useContext(AuthContext);
    const [asignaturas, setAsignaturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const cargar = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getAsignaturas();
            setAsignaturas(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("No se pudieron cargar las clases.");
            console.error("Error al cargar asignaturas:", err.response?.data ?? err.message);
        } finally {
            setLoading(false);
        }
        };

        cargar();
    }, [user]);

    return { asignaturas, loading, error };
}

export default useCursosProfesor;
