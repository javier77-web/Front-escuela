import { useState, useEffect } from "react";

function useAsistencia(cursoId) {
  // simulación backend
  const data = {
    1: [
      { id: 1, nombre: "juan perez" },
      { id: 2, nombre: "maria lopez" },
    ],
    2: [
      { id: 3, nombre: "pedro gomez" },
      { id: 4, nombre: "ana torres" },
    ],
  };

  // estado por fecha (simula BD/cache)
  const [asistenciasPorFecha, setAsistenciasPorFecha] = useState({});

  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  const [lista, setLista] = useState([]);
  const [guardado, setGuardado] = useState(false);

  // carga por fecha
  useEffect(() => {
    if (asistenciasPorFecha[fecha]) {
      setLista(asistenciasPorFecha[fecha]);
    } else {
      const base = (data[cursoId] || []).map((a) => ({
        ...a,
        estado: "presente",
      }));
      setLista(base);
    }

    setGuardado(false);
  }, [fecha, cursoId]);

  // cambiar estado
  const cambiarEstado = (alumnoId, nuevoEstado) => {
    setLista((prev) =>
      prev.map((a) => (a.id === alumnoId ? { ...a, estado: nuevoEstado } : a)),
    );
    setGuardado(false);
  };

  // porcentaje
  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length / lista.length) *
        100,
    ) || 0;

  // guardar (simulación backend)
  const guardar = () => {
    setAsistenciasPorFecha((prev) => ({
      ...prev,
      [fecha]: lista,
    }));

    setGuardado(true);
  };

  return {
    lista,
    fecha,
    setFecha,
    cambiarEstado,
    porcentaje,
    guardar,
    guardado,
  };
}

export default useAsistencia;
