import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getAsistenciasPorUsuario } from "../../api/gestionUsuario/asistenciaService";
import { getAsignaturaPorId } from "../../api/gestionAcademica/asignaturaService";

function useAsistenciaAlumno() {
  const { user } = useContext(AuthContext);
  const [asistencia, setAsistencia] = useState([]);
  const [promedioGlobal, setPromedioGlobal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const cargar = async () => {
      try {
        const { data } = await getAsistenciasPorUsuario(user.uid);

        // agrupa por id_asignatura
        const agrupado = {};
        data.forEach((a) => {
          const key = a.idAsignatura;
          if (!agrupado[key]) {
            agrupado[key] = {
              id: key,
              asignatura: `Asignatura ${key}`, // opción A — sin nombre real
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

        // calcula porcentaje por asignatura
        const lista = Object.values(agrupado).map((a) => ({
          ...a,
          porcentaje:
            Math.round((a.presentes / (a.presentes + a.ausentes)) * 100) || 0,
        }));

        setAsistencia(lista);

        const promedio =
          Math.round(
            lista.reduce((acc, a) => acc + a.porcentaje, 0) / lista.length,
          ) || 0;

        setPromedioGlobal(promedio);
      } catch (error) {
        console.error("Error al cargar asistencia:", error.message);
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

  return { asistencia, promedioGlobal, getTipo, loading };
}

export default useAsistenciaAlumno;
