import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaProtegida({ children, rolRequerido }) {
  const { user, perfil } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (
    rolRequerido &&
    perfil?.rol?.nombre?.trim().toLowerCase() !== rolRequerido.toLowerCase()
  ) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
}

export default RutaProtegida;
