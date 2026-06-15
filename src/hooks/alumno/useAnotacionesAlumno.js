import { useState, useMemo, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getAnotacionesPorUsuario } from "../../api/gestionAcademica/anotacionService";

function useAnotacionesAlumno() {
  const { user } = useContext(AuthContext);
  const [filtro, setFiltro] = useState("todas");

  const {
  data: anotaciones = [],
  isLoading: loading,
  isError,
} = useQuery({
  queryKey: ["anotaciones", user?.uid],
  queryFn: async () => {
    const { data } = await getAnotacionesPorUsuario(user.uid);
    const lista = Array.isArray(data) ? data : [];
    // normaliza boolean -> string para mantener consistencia con el resto de la UI
    return lista.map((a) => ({
      ...a,
      tipo: a.tipo === true || a.tipo === "true" ? "positiva" : "negativa",
    }));
  },
  enabled: !!user,
  staleTime: 5 * 60 * 1000,
});

  // filtrado
  const filtradas = useMemo(() => {
    return anotaciones.filter((a) =>
      filtro === "todas" ? true : a.tipo === filtro,
    );
  }, [filtro, anotaciones]);

  const positivas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "positiva").length,
    [anotaciones],
  );

  const negativas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "negativa").length,
    [anotaciones],
  );

  const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

  return {
    filtro,
    setFiltro,
    filtradas,
    positivas,
    negativas,
    getTipoBadge,
    loading,
    isError,
  };
}

export default useAnotacionesAlumno;
