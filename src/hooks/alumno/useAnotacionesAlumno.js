import { useState, useMemo, useEffect } from "react";

function useAnotacionesAlumno() {
  const [filtro, setFiltro] = useState("todas");
  const [anotaciones, setAnotaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔌 simulación backend
  useEffect(() => {
    const data = [
      {
        id: 1,
        tipo: "positiva",
        asignatura: "Matemáticas",
        descripcion: "Excelente participación en clases",
        fecha: "2024-04-10",
        profesor: "Prof. García",
      },
      {
        id: 2,
        tipo: "negativa",
        asignatura: "Historia",
        descripcion: "No entregó tarea a tiempo",
        fecha: "2024-04-08",
        profesor: "Prof. López",
      },
      {
        id: 3,
        tipo: "positiva",
        asignatura: "Inglés",
        descripcion: "Ayudó a sus compañeros",
        fecha: "2024-04-05",
        profesor: "Prof. Smith",
      },
      {
        id: 4,
        tipo: "negativa",
        asignatura: "Ciencias",
        descripcion: "Llegó tarde",
        fecha: "2024-04-03",
        profesor: "Prof. Rodríguez",
      },
    ];

    setTimeout(() => {
      setAnotaciones(data);
      setLoading(false);
    }, 500);
  }, []);

  // filtrado
  const filtradas = useMemo(() => {
    return anotaciones.filter((a) =>
      filtro === "todas" ? true : a.tipo === filtro,
    );
  }, [filtro, anotaciones]);

  // resumen
  const positivas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "positiva").length,
    [anotaciones],
  );

  const negativas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "negativa").length,
    [anotaciones],
  );

  const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

  return {
    filtro,
    setFiltro,
    filtradas,
    positivas,
    negativas,
    getTipoBadge,
    loading,
  };
}

export default useAnotacionesAlumno;
