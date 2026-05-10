import { useEffect, useState } from "react";

function useAsistenciaAlumno() {
  const [asistencia, setAsistencia] = useState([]);
  const [promedioGlobal, setPromedioGlobal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔴 simulación (luego va API)
    const data = [
      { asignatura: "Matemáticas", presentes: 18, ausentes: 2, porcentaje: 90 },
      { asignatura: "Lenguaje", presentes: 20, ausentes: 0, porcentaje: 100 },
      { asignatura: "Historia", presentes: 15, ausentes: 5, porcentaje: 75 },
    ];

    setAsistencia(data);

    const promedio =
      Math.round(
        data.reduce((acc, a) => acc + a.porcentaje, 0) / data.length,
      ) || 0;

    setPromedioGlobal(promedio);
    setLoading(false);
  }, []);

  const getTipo = (p) => {
    if (p >= 90) return "success";
    if (p >= 75) return "warning";
    return "danger";
  };

  return {
    asistencia,
    promedioGlobal,
    getTipo,
    loading,
  };
}

export default useAsistenciaAlumno;
