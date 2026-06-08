import { useState, useEffect } from "react";
import { getEvaluacionesPorAsignatura, actualizarEvaluacion } from "../../api/gestionAcademica/evaluacionService";


function useNotasProfesor(idAsignatura) {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idAsignatura) return;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getEvaluacionesPorAsignatura(idAsignatura);
        setEvaluaciones(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar las notas.");
        console.error(err.response?.data ?? err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [idAsignatura]);

  // actualizar nota
  const actualizarNota = async (idEvaluacion, nota) => {
    try {
      await actualizarEvaluacion(idEvaluacion, { nota });
      setEvaluaciones((prev) =>
        prev.map((e) =>
          e.id_evaluacion === idEvaluacion ? { ...e, nota } : e
        )
      );
    } catch (err) {
      console.error("Error al actualizar nota:", err.response?.data ?? err.message);
    }
  };

  // promedio (number)
  const calcularPromedio = (notas) =>
    notas.reduce((acc, n) => acc + n, 0) / notas.length || 0;

  // color del badge
  const getTipo = (promedio) => {
    if (promedio >= 6) return "success";
    if (promedio >= 4) return "warning";
    return "danger";
  };

  return {
    evaluaciones,
    actualizarNota,
    calcularPromedio,
    getTipo,
    loading,
    error,
  };
}

export default useNotasProfesor;
