import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAnotaciones, crearAnotacion } from "../../api/gestionAcademica/anotacionService";

// Recibe la lista de alumnos del curso (de useUsuariosCurso) para:
// 1) filtrar las anotaciones que pertenecen a este curso
// 2) resolver el nombre del alumno a partir de su firebaseuid
function useAnotaciones(alumnos = []) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const idsAlumnos = alumnos.map((a) => a.firebaseuid);
  const idsKey = idsAlumnos.join(",");

  const {
    data: anotaciones = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["anotaciones-curso", idsKey],
    queryFn: async () => {
      const { data } = await getAnotaciones();
      const lista = Array.isArray(data) ? data : [];

      return lista
        .filter((a) => idsAlumnos.includes(a.usuario_receptor))
        .map((a) => {
          const alumno = alumnos.find((al) => al.firebaseuid === a.usuario_receptor);
          return {
            ...a,
            // normaliza boolean -> string (igual que en useAnotacionesAlumno)
            tipo: a.tipo === true || a.tipo === "true" ? "positiva" : "negativa",
            alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : "alumno desconocido",
          };
        });
    },
    enabled: idsAlumnos.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  const agregarAnotacion = async (form) => {
    if (!form.alumno || !form.descripcion) return;

    setGuardando(true);
    setError(null);
    try {
      const payload = {
        descripcion: form.descripcion,
        fecha: form.fecha,
        tipo: form.tipo === "positiva",
        usuario_receptor: form.alumno,
        usuario_emisor: user.uid,
      };
      await crearAnotacion(payload);

      await queryClient.invalidateQueries({
        queryKey: ["anotaciones-curso", idsKey],
      });
    } catch (err) {
      setError("No se pudo guardar la anotación.");
      console.error("Error al crear anotación:", err.response?.data ?? err.message);
    } finally {
      setGuardando(false);
    }
  };

  const errorCarga = isError ? "No se pudieron cargar las anotaciones." : null;

  return { anotaciones, agregarAnotacion, guardando, error: error ?? errorCarga, loading };
}

export default useAnotaciones;