import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAsistenciasPorAsignaturaYFecha,
  registrarAsistencia,
} from "../../api/gestionUsuario/asistenciaService";

function useAsistencia(idAsignatura, alumnosCurso = []) {
  const queryClient = useQueryClient();

  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [guardado, setGuardado] = useState(false);

  const { data: lista = [], isLoading: loading } = useQuery({
    queryKey: ["asistencia-clase", idAsignatura, fecha],
    queryFn: async () => {
      const res = await getAsistenciasPorAsignaturaYFecha(
        idAsignatura,
        fecha
      );

      const data = Array.isArray(res.data) ? res.data : [];

      // Si no hay asistencia registrada todavía,
      // construye la lista desde los alumnos del curso
      if (data.length === 0) {
        return alumnosCurso.map((a) => ({
          id: a.firebaseuid,
          nombre: `${a.nombre} ${a.apellido}`,
          estado: "ausente",
          idAsistencia: null,
        }));
      }

      return data.map((a) => ({
        id: a.usuario.firebaseuid,
        nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
        estado: a.estado,
        idAsistencia: a.idAsistencia ?? a.id_asistencia,
      }));
    },
    enabled: !!idAsignatura,
    staleTime: 5 * 60 * 1000,
  });

  // Lista editable local
  const [listaLocal, setListaLocal] = useState([]);

  const listaActiva = listaLocal.length > 0 ? listaLocal : lista;

  const cambiarEstado = (uid, nuevoEstado) => {
    const base = listaLocal.length > 0 ? listaLocal : lista;

    setListaLocal(
      base.map((a) =>
        a.id === uid
          ? { ...a, estado: nuevoEstado }
          : a
      )
    );

    setGuardado(false);
  };

  const porcentaje =
    Math.round(
      (listaActiva.filter((a) => a.estado === "presente").length /
        listaActiva.length) *
        100
    ) || 0;

  const guardar = async () => {
    if (listaActiva.length === 0) return;

    // Si ya existen registros para esa fecha no permitir volver a guardar
    if (listaActiva.some((a) => a.idAsistencia)) {
      alert("Ya se pasó asistencia para esta fecha.");
      return;
    }

    try {
      const resultados = await Promise.allSettled(
        listaActiva.map((a) =>
          registrarAsistencia({
            fecha,
            estado: a.estado,
            idAsignatura,
            usuario: {
              firebaseuid: a.id,
            },
          })
        )
      );

      const errores = resultados.filter(
        (r) => r.status === "rejected"
      );

      if (errores.length > 0) {
        console.error("Algunas asistencias fallaron:", errores);
        alert("Algunas asistencias no pudieron guardarse.");
        return;
      }

      setGuardado(true);
      setListaLocal([]);

      await queryClient.invalidateQueries({
        queryKey: ["asistencia-clase", idAsignatura, fecha],
      });
    } catch (err) {
      console.error(
        "Error al guardar asistencia:",
        err.response?.data ?? err.message
      );
    }
  };

  return {
    lista: listaActiva,
    setLista: setListaLocal,
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