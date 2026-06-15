import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAsistenciasUsuario } from "../../api/gestionUsuario/asistenciaService";
import { getAsignaturaPorId } from "../../api/gestionAcademica/asignaturaService";

function useAsistenciaAlumno(habilitado = true) {
  const { user } = useContext(AuthContext);

  const {
    data,
    isLoading: loading,
    isError,
    error: errorQuery,
  } = useQuery({
    queryKey: ["asistencia", user?.uid],
    queryFn: async () => {
      const { data } = await getAsistenciasUsuario(user.uid);
      const registros = data.asistencias ?? [];

      if (registros.length === 0) return { lista: [], promedioGlobal: 0 };

      // agrupa por id_asignatura
      const agrupado = {};
      registros.forEach((a) => {
        const key = a.idAsignatura ?? a.id_asignatura;
        if (!agrupado[key]) {
          agrupado[key] = {
            id: key,
            asignatura: `Asignatura ${key}`,
            presentes: 0,
            ausentes: 0,
          };
        }
        if (a.estado?.toLowerCase() === "presente") {
          agrupado[key].presentes += 1;
        } else {
          agrupado[key].ausentes += 1;
        }
      });

      // resuelve nombres en paralelo
      await Promise.allSettled(
        Object.keys(agrupado).map(async (id) => {
          try {
            const res = await getAsignaturaPorId(id);
            agrupado[id].asignatura = res.data?.nombre ?? `Asignatura ${id}`;
          } catch {
            // fallback silencioso
          }
        }),
      );

      const lista = Object.values(agrupado).map((a) => ({
        ...a,
        porcentaje:
          Math.round((a.presentes / (a.presentes + a.ausentes)) * 100) || 0,
      }));

      const promedioGlobal =
        Math.round(
          lista.reduce((acc, a) => acc + a.porcentaje, 0) / lista.length,
        ) || 0;

      return { lista, promedioGlobal };
    },
    enabled: !!user && habilitado,
    staleTime: 5 * 60 * 1000,
  });

  // manejo de error con los status codes que tenías
  let error = null;
  if (isError) {
    const status = errorQuery?.response?.status;
    if (status === 404) error = "Usuario no encontrado en el sistema.";
    else if (status === 400) error = "La solicitud tiene datos inválidos.";
    else error = "No se pudo cargar la asistencia. Intenta más tarde.";
  }

  const getTipo = (p) => {
    if (p >= 90) return "success";
    if (p >= 75) return "warning";
    return "danger";
  };

  return {
    asistencia: data?.lista ?? [],
    promedioGlobal: data?.promedioGlobal ?? 0,
    getTipo,
    loading,
    error,
  };
}

export default useAsistenciaAlumno;
