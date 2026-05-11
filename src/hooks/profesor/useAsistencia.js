import { useState, useEffect } from "react";
import {
  getAsistenciasPorAsignaturaYFecha,
  registrarAsistencia,
} from "../../api/gestionUsuario/asistenciaService";

function useAsistencia(idAsignatura) {
  const [lista, setLista] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [guardado, setGuardado] = useState(false);
  const [loading, setLoading] = useState(false);

  // carga asistencia por asignatura y fecha
  useEffect(() => {
    if (!idAsignatura) return;

    const cargar = async () => {
      setLoading(true);
      setGuardado(false);
      try {
        const res = await getAsistenciasPorAsignaturaYFecha(
          idAsignatura,
          fecha,
        );

        // 204 = no hay datos para esa fecha
        if (!res.data || res.status === 204) {
          setLista([]);
          return;
        }

        setLista(
          res.data.map((a) => ({
            id: a.usuario.firebaseuid,
            nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
            estado: a.estado,
            id_asistencia: a.id_asistencia,
          })),
        );
      } catch (error) {
        setLista([]);
        console.error("Error al cargar asistencia:", error.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [idAsignatura, fecha]);

  const cambiarEstado = (uid, nuevoEstado) => {
    setLista((prev) =>
      prev.map((a) => (a.id === uid ? { ...a, estado: nuevoEstado } : a)),
    );
    setGuardado(false);
  };

  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length / lista.length) *
        100,
    ) || 0;

  // guarda todas las asistencias de la lista
  const guardar = async () => {
    try {
      if (lista.length === 0) return;

      const yaExiste = lista.some((a) => a.id_asistencia);

      if (yaExiste) {
        alert("ya se pasó asistencia para esta fecha");
        return;
      }

      await Promise.all(
        lista.map((a) =>
          registrarAsistencia({
            fecha,
            estado: a.estado,
            id_asignatura: idAsignatura,
            usuario: { firebaseuid: a.id },
          }),
        ),
      );
      setGuardado(true);
    } catch (error) {
      console.error("Error al guardar asistencia:", error.message);
    }
  };

  return {
    lista,
    fecha,
    setFecha,
    cambiarEstado,
    porcentaje,
    guardar,
    guardado,
    loading,
  };
}

export default useAsistencia;
