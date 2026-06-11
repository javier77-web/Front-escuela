import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAsistenciasPorAsignaturaYFecha,
  registrarAsistencia,
  getUsuariosPorCurso,
} from "../../api/gestionUsuario/asistenciaService";

function useAsistencia(idAsignatura) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const cursoId = location.state?.cursoId;

  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [guardado, setGuardado] = useState(false);
  const [listaLocal, setListaLocal] = useState([]);

  // Limpiar estado local cada vez que cambia la fecha
  useEffect(() => {
    setListaLocal([]);
    setGuardado(false);
  }, [fecha]);

  const { data: lista = [], isLoading: loading } = useQuery({
    queryKey: ["asistencia-clase", idAsignatura, fecha],
    enabled: !!idAsignatura && !!cursoId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await getAsistenciasPorAsignaturaYFecha(idAsignatura, fecha)
        .catch((err) => {
          if (err.response?.status === 404) return { data: [] };
          throw err;
        });

      const data = Array.isArray(res.data) ? res.data : [];

      if (data.length === 0) {
        const alumnosRes = await getUsuariosPorCurso(cursoId);
        const alumnos = Array.isArray(alumnosRes.data) ? alumnosRes.data : [];
        return alumnos.map((a) => ({
          id: a.firebaseuid,
          nombre: `${a.nombre} ${a.apellido}`,
          estado: "ausente",
          idAsistencia: null,
        }));
      }

      return data.map((a) => ({
        id: a.usuario?.firebaseuid ?? a.firebaseuid,
        nombre: a.usuario
          ? `${a.usuario.nombre} ${a.usuario.apellido}`
          : a.nombreCompleto,
        estado: a.estado,
        idAsistencia: a.idAsistencia ?? a.id_asistencia,
      }));
    },
  });

  const listaActiva = listaLocal.length > 0 ? listaLocal : lista;

  const cambiarEstado = (uid, nuevoEstado) => {
    const base = listaLocal.length > 0 ? listaLocal : lista;
    setListaLocal(
      base.map((a) => (a.id === uid ? { ...a, estado: nuevoEstado } : a))
    );
    setGuardado(false);
  };

  const porcentaje =
    Math.round(
      (listaActiva.filter((a) => a.estado === "presente").length /
        listaActiva.length) *
        100
    ) || 0;

  const yaFuePasada =
    lista.length > 0 && lista.every((a) => a.idAsistencia != null);

  const guardar = async () => {
    if (listaActiva.length === 0) return;

    if (yaFuePasada) {
      alert("Ya se pasó asistencia para esta fecha.");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    if (fecha > hoy) {
      alert("No se puede registrar asistencia para una fecha futura.");
      return;
    }

    try {
      const resultados = await Promise.allSettled(
        listaActiva.map((a) =>
          registrarAsistencia({
            fecha,
            estado: a.estado,
            idAsignatura,
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
      await queryClient.refetchQueries({
        queryKey: ["asistencia-clase", idAsignatura, fecha],
      });
      setListaLocal([]);
    } catch (err) {
      console.error("Error al guardar asistencia:", err.response?.data ?? err.message);
      alert("Error al guardar la asistencia.");
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
    yaFuePasada,
  };
}

export default useAsistencia;