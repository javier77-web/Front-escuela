// hooks/admin/useUsuarios.js — versión sin Redux, con axios
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  getUsuarios,
  deleteUsuario,
  updateUsuario,
} from "../../api/usuariosApi";

function generarContrasena() {
  return "1234567"; // misma lógica que tenías
}

function useUsuarios(tipoUsuario) {
  const { register, user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cargarUsuarios = async () => {
    setIsLoading(true);
    setUsuarios([]); //  limpia antes de cargar
    try {
      const { data } = await getUsuarios();
      // Filtrar por nombre del rol
      const filtrados = data.filter(
        (u) => u.rol?.nombre?.toLowerCase() === tipoUsuario.toLowerCase(),
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
    if (user) {
      cargarUsuarios();
    }
  }, [user, tipoUsuario]);

  const crearUsuario = async ({ nombre, apellido, email, rol }) => {
    const contrasenaTemporal = generarContrasena();

    // Mapear rol a ID esperado por backend
    const rolesMap = { alumno: 1, profesor: 2, admin: 3 };
    const idRol = rolesMap[rol?.toLowerCase()] ?? 1;

    const resultado = await register(
      email,
      contrasenaTemporal,
      nombre,
      apellido,
      idRol,
    );
    if (!resultado.ok) throw new Error(resultado.message);

    await cargarUsuarios(); // refresca la lista
    return { ok: true, contrasena: contrasenaTemporal };
  };

  const eliminarUsuario = async (firebaseuid) => {
    await deleteUsuario(firebaseuid);
    await cargarUsuarios();
  };

  // dentro del hook, después de eliminarUsuario:
  const actualizarUsuario = async (firebaseuid, { nombre, apellido, rol }) => {
    const rolesMap = { alumno: 1, profesor: 2, admin: 3 };
    const idRol = rolesMap[rol?.toLowerCase()] ?? 1;
    await updateUsuario(firebaseuid, { nombre, apellido, idRol });
    await cargarUsuarios();
  };

  return {
    usuarios,
    isLoading,
    isError,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
  };
}

export default useUsuarios;
