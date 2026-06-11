import { useState, useEffect } from "react";
import axios from "axios";

function useEvaluacionAlumnos(evaluacionId) {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!evaluacionId) return;

        const fetchAlumnos = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(
                    `http://localhost:8082/api/evaluacion_alumno/${evaluacionId}`
                );
                setAlumnos(res.data);
            } catch (err) {
                setError("Error al cargar alumnos de la evaluación");
            } finally {
                setLoading(false);
            }
        };

        fetchAlumnos();
    }, [evaluacionId]);

    return { alumnos, loading, error };
}

export default useEvaluacionAlumnos;
