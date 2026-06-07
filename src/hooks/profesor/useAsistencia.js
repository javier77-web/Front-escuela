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

  useEffect(() => {
    if (!idAsignatura) return;

    const cargar = async () => {
      setLoading(true);
      setGuardado(false);
      try {
        const res = await getAsistenciasPorAsignaturaYFecha(idAsignatura, fecha);
        const data = Array.isArray(res.data) ? res.data : [];

        if (data.length > 0) {
          setLista(
            data.map((a) => ({
              id: a.usuario.firebaseuid,
              nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
              estado: a.estado,
              idAsistencia: a.idAsistencia ?? a.id_asistencia,
            }))
          );
        } else {
          // 204 No Content o lista vacía — no hay asistencia para esta fecha aún
          setLista([]);
        }
      } catch (err) {
        console.error("Error al cargar asistencia:", err.response?.data ?? err.message);
        setLista([]);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [idAsignatura, fecha]);

  const cambiarEstado = (uid, nuevoEstado) => {
    setLista((prev) =>
      prev.map((a) => (a.id === uid ? { ...a, estado: nuevoEstado } : a))
    );
    setGuardado(false);
  };

  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length / lista.length) * 100
    ) || 0;

  const guardar = async (alumnos = []) => {
    // alumnos: [{ firebaseuid, nombre, apellido }] — lista completa del curso
    // Se usa cuando la fecha no tiene registros previos
    const listaAGuardar = lista.length > 0 ? lista : alumnos.map((a) => ({
      id: a.firebaseuid,
      nombre: `${a.nombre} ${a.apellido}`,
      estado: "ausente",
      idAsistencia: null,
    }));

    if (listaAGuardar.length === 0) return;

    if (listaAGuardar.some((a) => a.idAsistencia)) {
      alert("Ya se pasó asistencia para esta fecha.");
      return;
    }

    try {
      const resultados = await Promise.allSettled(
        listaAGuardar.map((a) =>
          registrarAsistencia({
            fecha,
            estado: a.estado,
            idAsignatura: idAsignatura,
            usuario: { firebaseuid: a.id },
          })
        )
      );

      const errores = resultados.filter((r) => r.status === "rejected");
      if (errores.length > 0) {
        console.error("Algunas asistencias fallaron:", errores);
        alert("Algunas asistencias no pudieron guardarse.");
        return;
      }
      setGuardado(true);
    } catch (err) {
      console.error("Error al guardar asistencia:", err.response?.data ?? err.message);
    }
  };

  return { lista, setLista, fecha, setFecha, cambiarEstado, porcentaje, guardar, guardado, loading };
}

export default useAsistencia;
