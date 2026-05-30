import { useState, useEffect } from "react";
import {
  getAsistenciasPorAsignaturaYFecha,
  registrarAsistencia,
} from "../../api/gestionUsuario/asistenciaService";

import { getAlumnosPorAsignatura } from "../../api/gestionAcademica/asignaturaService";

function useAsistencia(idAsignatura) {
  const [lista, setLista] = useState([]);
  //AL usar toISOString la date se setea con año, mes, dia, hora, minutos, segundos, etc. 
  //el split ("T") divide la fecha del tiempo y después selecciono el primer espacio del array (sólo fecha)
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]); //
  const [guardado, setGuardado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idAsignatura) return;

    const cargar = async () => {
      setLoading(true);
      setGuardado(false);

      try {
        const res = await getAsistenciasPorAsignaturaYFecha(idAsignatura, fecha);

        if (res.data && res.data.length > 0) {
          // si la asistencia ya existe, la mapeo y la busco
          setLista(
            res.data.map((a) => ({
              id: a.usuario.firebaseuid,
              nombre: `${a.usuario.nombre} ${a.usuario.apellido}`,
              estado: a.estado,
              idAsistencia: a.idAsistencia, // antes era id_asistencia, pero lombok trabaja con CamelCase
            }))
          );
          return;
        }

        // si no hay asistencia debería cargar alumnos de la asignatura (api en Node aún no activa del todo, quizá falla xdxd)
        const alumnosRes = await getAlumnosPorAsignatura(idAsignatura);
        setLista(
          alumnosRes.data.map((a) => ({
            id: a.firebaseuid,
            nombre: `${a.nombre} ${a.apellido}`,
            estado: "ausente",
            idAsistencia: null,
          }))
        );
      } catch (error) {
        console.error("Error al cargar asistencia:", error.response?.data || error.message);
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

  const guardar = async () => {
    if (lista.length === 0) return;

    // este arreglo es para evitar que se pase lista dos veces el mismo dia
    if (lista.some((a) => a.idAsistencia)) {
      alert("ya se pasó asistencia para esta fecha");
      return;
    }

    try {
      const resultados = await Promise.allSettled(
        lista.map((a) =>
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
        alert("algunas asistencias no pudieron guardarse");
        return;
      }

      setGuardado(true);
    } catch (error) {
      console.error("Error al guardar asistencia:", error.response?.data || error.message);
    }
  };

  return { lista, fecha, setFecha, cambiarEstado, porcentaje, guardar, guardado, loading };
}

export default useAsistencia;