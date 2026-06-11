import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getNotasAlumno } from "../../api/gestionAcademica/evaluacionAlumnoService";

function useNotasAlumno() {
  const { user } = useContext(AuthContext);

  const {
    data: notas = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["notas-alumno", user?.uid],
    queryFn: async () => {
      const { data } = await getNotasAlumno(user.uid);

      const agrupadas = {};

      data.forEach((registro) => {
        const asignatura = registro.evaluacion?.asignatura?.nombre;

        if (!asignatura) return;

        const nota = parseFloat(registro.nota);

        if (isNaN(nota)) return;

        if (!agrupadas[asignatura]) {
          agrupadas[asignatura] = [];
        }

        agrupadas[asignatura].push(nota);
      });

      return Object.entries(agrupadas).map(([asignatura, notas]) => ({
        asignatura,
        notas,
        promedio:
          notas.length > 0
            ? notas.reduce((acc, n) => acc + n, 0) / notas.length
            : 0,
      }));
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const promedioGeneral = notas.length
    ? (
        notas.reduce((acc, asignatura) => acc + asignatura.promedio, 0) /
        notas.length
      ).toFixed(1)
    : "0.0";

  return {
    notas,
    promedioGeneral,
    loading,
    error: isError ? "No se pudieron cargar las notas." : null,
  };
}

export default useNotasAlumno;