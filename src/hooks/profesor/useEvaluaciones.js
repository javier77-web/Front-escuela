import { useState } from "react";

function useEvaluacionesProfesor() {
  const [evaluaciones, setEvaluaciones] = useState([]);

  const [form, setForm] = useState({
    titulo: "",
    tipo: "prueba",
    fecha: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const agregarEvaluacion = () => {
    if (!form.titulo || !form.fecha) return;

    const nueva = {
      ...form,
      id: Date.now(),
    };

    setEvaluaciones((prev) => [...prev, nueva]);

    // reset
    setForm({
      titulo: "",
      tipo: "prueba",
      fecha: "",
    });
  };

  const getTipoBadge = (tipo) => {
    if (tipo === "prueba") return "danger";
    if (tipo === "control") return "warning";
    return "success";
  };

  return {
    evaluaciones,
    form,
    handleChange,
    agregarEvaluacion,
    getTipoBadge,
  };
}

export default useEvaluacionesProfesor;
