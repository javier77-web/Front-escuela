import { useState, useEffect } from "react";
import { getEvaluacionesPorAsignatura, crearEvaluacion, getAlumnosEnRiesgo } from "../../api/gestionAcademica/evaluacionService";

function useEvaluacionesProfesor(idAsignatura) {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [enRiesgo, setEnRiesgo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    tipo: "prueba",
    fecha: "",
  });

  // Carga evaluaciones existentes de la asignatura
  useEffect(() => {
    if (!idAsignatura) return;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getEvaluacionesPorAsignatura(idAsignatura);
        setEvaluaciones(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar las evaluaciones.");
        console.error(err.response?.data ?? err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [idAsignatura]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const agregarEvaluacion = async () => {
    if (!form.titulo || !form.fecha) return;
    setError(null);
    try {
      const payload = { ...form, asignatura_id: idAsignatura };
      const { data } = await crearEvaluacion(payload);
      setEvaluaciones((prev) => [...prev, data]);
      setForm({ titulo: "", tipo: "prueba", fecha: "" });
    } catch (err) {
      setError("No se pudo crear la evaluación.");
      console.error(err.response?.data ?? err.message);
    }
  };

  const cargarEnRiesgo = async (notaLimite) => {
    if (!idAsignatura) return;
    try {
      const { data } = await getAlumnosEnRiesgo(idAsignatura, notaLimite);
      setEnRiesgo(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar alumnos en riesgo:", err.response?.data ?? err.message);
    }
  };

  const getTipoBadge = (tipo) => {
    if (tipo === "prueba") return "danger";
    if (tipo === "control") return "warning";
    return "success";
  };

  return {
    evaluaciones,
    enRiesgo,
    loading,
    error,
    form,
    handleChange,
    agregarEvaluacion,
    cargarEnRiesgo,
    getTipoBadge,
  };
}

export default useEvaluacionesProfesor;
