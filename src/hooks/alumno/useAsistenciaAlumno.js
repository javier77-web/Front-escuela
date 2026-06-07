import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getAsistenciasUsuario } from "../../api/gestionUsuario/asistenciaService";
import { getAsignaturaPorId } from "../../api/gestionAcademica/asignaturaService";

function useAsistenciaAlumno() {
  const { user } = useContext(AuthContext);
  const [asistencia, setAsistencia] = useState([]);
  const [promedioGlobal, setPromedioGlobal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getAsistenciasUsuario(user.uid);

        // El back devuelve DTO: { firebaseuid, totalRegistros, asistencias[] }
        const registros = data.asistencias ?? [];

        if (registros.length === 0) {
          setAsistencia([]);
          setPromedioGlobal(0);
          return;
        }

        // Agrupa por id_asignatura (confirmado en BD)
        const agrupado = {};
        registros.forEach((a) => {
          const key = a.idAsignatura ?? a.id_asignatura;
          if (!agrupado[key]) {
            agrupado[key] = { id: key, asignatura: `Asignatura ${key}`, presentes: 0, ausentes: 0 };
          }
          if (a.estado?.toLowerCase() === "presente") {
            agrupado[key].presentes += 1;
          } else {
            agrupado[key].ausentes += 1;
          }
        });

        // Resuelve nombres de asignatura en paralelo
        await Promise.allSettled(
          Object.keys(agrupado).map(async (id) => {
            try {
              const res = await getAsignaturaPorId(id);
              agrupado[id].asignatura = res.data?.nombre ?? `Asignatura ${id}`;
            } catch {
              // fallback silencioso
            }
          })
        );

        const lista = Object.values(agrupado).map((a) => ({
          ...a,
          porcentaje:
            Math.round((a.presentes / (a.presentes + a.ausentes)) * 100) || 0,
        }));

        setAsistencia(lista);
        setPromedioGlobal(
          Math.round(lista.reduce((acc, a) => acc + a.porcentaje, 0) / lista.length) || 0
        );
      } catch (err) {
        const status = err.response?.status;
        if (status === 404) setError("Usuario no encontrado en el sistema.");
        else if (status === 400) setError("La solicitud tiene datos inválidos.");
        else setError("No se pudo cargar la asistencia. Intenta más tarde.");
        console.error("Error al cargar asistencia:", err.response?.data ?? err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [user]);

  const getTipo = (p) => {
    if (p >= 90) return "success";
    if (p >= 75) return "warning";
    return "danger";
  };

  return { asistencia, promedioGlobal, getTipo, loading, error };
}

export default useAsistenciaAlumno;
