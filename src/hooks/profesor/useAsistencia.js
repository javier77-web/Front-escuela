import { useState, useEffect } from "react";

import {
  getAsistenciasPorAsignaturaYFecha,
  registrarAsistencia,
} from "../../api/gestionUsuario/asistenciaService";

import { getAlumnosPorAsignatura } from "../../api/gestionAcademica/asignaturaService";

function useAsistencia(idAsignatura) {
  const [lista, setLista] = useState([]);

  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [guardado, setGuardado] = useState(false);

  const [loading, setLoading] = useState(false);

  // cargar asistencia o alumnos
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

        // SI EXISTE asistencia
        if (res.data && res.data.length > 0) {
          setLista(
            res.data.map((a) => ({
              id: a.usuario.firebaseuid,
              nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
              estado: a.estado,
              id_asistencia: a.id_asistencia,
            })),
          );

          return;
        }

        // SI NO EXISTE asistencia
        // cargar alumnos de la asignatura
        const alumnosRes = await getAlumnosPorAsignatura(idAsignatura);

        setLista(
          alumnosRes.data.map((a) => ({
            id: a.firebaseuid,
            nombre: `${a.nombre} ${a.apellido}`,
            estado: "ausente",
            id_asistencia: null,
          })),
        );
      } catch (error) {
        console.error(
          "Error al cargar asistencia:",
          error.response?.data || error.message,
        );

        setLista([]);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [idAsignatura, fecha]);

  // cambiar estado alumno
  const cambiarEstado = (uid, nuevoEstado) => {
    setLista((prev) =>
      prev.map((a) =>
        a.id === uid
          ? { ...a, estado: nuevoEstado }
          : a,
      ),
    );

    setGuardado(false);
  };

  // porcentaje asistencia
  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length /
        lista.length) *
        100,
    ) || 0;

  // guardar asistencia
  const guardar = async () => {
    try {
      if (lista.length === 0) return;

      // evitar duplicados
      const yaExiste = lista.some((a) => a.id_asistencia);

      if (yaExiste) {
        alert("ya se pasó asistencia para esta fecha");
        return;
      }

      const resultados = await Promise.allSettled(
        lista.map((a) =>
          registrarAsistencia({
            fecha,
            estado: a.estado,
            id_asignatura: idAsignatura,
            usuario: {
              firebaseuid: a.id,
            },
          }),
        ),
      );

      const errores = resultados.filter(
        (r) => r.status === "rejected",
      );

      if (errores.length > 0) {
        console.error("Algunas asistencias fallaron:", errores);

        alert("algunas asistencias no pudieron guardarse");

        return;
      }

      setGuardado(true);
    } catch (error) {
      console.error(
        "Error al guardar asistencia:",
        error.response?.data || error.message,
      );
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