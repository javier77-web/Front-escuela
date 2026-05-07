// hooks/admin/useUsuarios.js — versión sin Redux, con axios
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { apiGet, apiDelete } from "../../gateway/gatewayService";

function generarContrasena() {
  return "1234567"; // misma lógica que tenías
}

function useUsuarios(tipoUsuario) {
  const { register,user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cargarUsuarios = async () => {
    setIsLoading(true);
    try {
      const data = await apiGet("/api/usuarios/usuarios");
      // Filtrar por nombre del rol
      const filtrados = data.filter(
        (u) => u.rol?.nombre?.toLowerCase() === tipoUsuario.toLowerCase()
      );
      setUsuarios(filtrados);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user){
      cargarUsuarios();
    }
  }, [user, tipoUsuario]);

  const crearUsuario = async ({ nombre, apellido, email, rol }) => {
    const contrasenaTemporal = generarContrasena();
    const idRol = rol === "alumno" ? 1 : 2;

    const resultado = await register(email, contrasenaTemporal, nombre, apellido, idRol);
    if (!resultado.ok) throw new Error(resultado.message);

    await cargarUsuarios(); // refresca la lista
    return { ok: true, contrasena: contrasenaTemporal };
  };

  const eliminarUsuario = async (firebaseuid) => {
    await apiDelete(`/api/usuarios/usuarios/${firebaseuid}`);
    await cargarUsuarios();
  };

  return { usuarios, isLoading, isError, crearUsuario, eliminarUsuario };
}

export default useUsuarios;