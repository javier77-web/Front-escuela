import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/atoms/Spinner";

function RutaProtegida({ children, rolRequerido }) {
  const { user, perfil, loading, perfilLoading } = useAuth();

  //Primero espera firebase o fetch de perfil en curso
  if (loading || perfilLoading){
    return <Spinner texto = "Verificando sesión..."/>;
  } 

  if (!user) return <Navigate to="/login" />;

  //Si hay user pero perfil null el fetch falló
  if(!perfil) return <Navigate to="/login"/>;

  if (
    rolRequerido &&
    perfil?.rol?.nombre?.trim().toLowerCase() !== rolRequerido.toLowerCase()
  ) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
}

export default RutaProtegida;
