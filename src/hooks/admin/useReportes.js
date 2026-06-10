import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getUsuarios } from "../../api/gestionUsuario/usuariosApi";

function useReportes() {
  const { user } = useContext(AuthContext);

  const {
    data: usuarios = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reportes-usuarios"],
    queryFn: async () => {
      const { data } = await getUsuarios();
      return data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const totalAlumnos = usuarios.filter(
    (u) => u.rol?.nombre?.toLowerCase() === "alumno",
  ).length;

  const totalProfesores = usuarios.filter(
    (u) => u.rol?.nombre?.toLowerCase() === "profesor",
  ).length;

  return { totalAlumnos, totalProfesores, isLoading, isError };
}

export default useReportes;
