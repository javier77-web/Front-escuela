import { useState, useMemo, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getAnotacionesPorUsuario } from "../../api/gestionAcademica/anotacionService";

function useAnotacionesAlumno() {
  const { user } = useContext(AuthContext);
  const [filtro, setFiltro] = useState("todas");
  const [anotaciones, setAnotaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getAnotacionesPorUsuario(user.uid);
        setAnotaciones(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar las anotaciones.");
        console.error("Error al cargar anotaciones:", err.response?.data ?? err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [user]);

  // filtrado
  const filtradas = useMemo(() => {
    return anotaciones.filter((a) =>
      filtro === "todas" ? true : a.tipo === filtro
    );
  }, [filtro, anotaciones]);

  const positivas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "positiva").length,
    [anotaciones]
  );

  const negativas = useMemo(
    () => anotaciones.filter((a) => a.tipo === "negativa").length,
    [anotaciones]
  );

  const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

  return { filtro, setFiltro, filtradas, positivas, negativas, getTipoBadge, loading, error };
}


export default useAnotacionesAlumno;
