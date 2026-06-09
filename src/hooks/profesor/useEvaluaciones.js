import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEvaluacionesPorAsignatura,
  crearEvaluacion,
  getAlumnosEnRiesgo,
} from "../../api/gestionAcademica/evaluacionService";

function useEvaluacionesProfesor(idAsignatura) {
  const queryClient = useQueryClient();
  const [enRiesgo, setEnRiesgo] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ titulo: "", tipo: "prueba", fecha: "" });

  const { data: evaluaciones = [], isLoading: loading } = useQuery({
    queryKey: ["evaluaciones", idAsignatura],
    queryFn: async () => {
      const { data } = await getEvaluacionesPorAsignatura(idAsignatura);
      return Array.isArray(data) ? data : [];
    },
    enabled: !!idAsignatura,
    staleTime: 5 * 60 * 1000,
  });

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
      const datosEvaluacion = { ...form, asignatura_id: idAsignatura };
      await crearEvaluacion(datosEvaluacion);
      setForm({ titulo: "", tipo: "prueba", fecha: "" });
      // refresca la lista de evaluaciones
      await queryClient.invalidateQueries({ queryKey: ["evaluaciones", idAsignatura] });
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
      console.error(
        "Error al cargar alumnos en riesgo:",
        err.response?.data ?? err.message,
      );
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
