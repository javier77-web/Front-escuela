// hooks/admin/useUsuarios.js — versión sin Redux, con axios
import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { getUsuarios, deleteUsuario, updateUsuario } from "../../api/usuariosApi";
import { crearUsuarioAdmin } from  "../../gateway/gatewayService";

//Lógica sencilla, luego debe migrar a backend o analizar
function generarContrasena() {
  return "1234567";
}

function useUsuarios(tipoUsuario) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: usuarios = [], isLoading, isError } = useQuery({
    queryKey: ["usuarios", tipoUsuario],
    queryFn: async () => {
      const { data } = await getUsuarios();
      return data.filter(
        (u) => u.rol?.nombre?.toLowerCase() === tipoUsuario.toLowerCase()
      );
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const crearUsuario = async ({ nombre, apellido, email, rol }) => {
    const contrasenaTemporal = generarContrasena();
    // Mapear rol a ID esperado por backend
    const rolesMap = { alumno: 1, profesor: 2, admin: 3 };
    const idRol = rolesMap[rol?.toLowerCase()] ?? 1;

    const resultado = await crearUsuarioAdmin(
      email,
      contrasenaTemporal,
      nombre,
      apellido,
      idRol,
    );
    if (!resultado.ok) throw new Error(resultado.message);

    await queryClient.invalidateQueries({ queryKey: ["usuarios", tipoUsuario] });
    return { ok: true, contrasena: contrasenaTemporal };
  };

  const eliminarUsuario = async (firebaseuid) => {
    await deleteUsuario(firebaseuid);
    await queryClient.invalidateQueries({ queryKey: ["usuarios", tipoUsuario] });
  };

  // dentro del hook, después de eliminarUsuario:
  const actualizarUsuario = async (firebaseuid, { nombre, apellido, rol }) => {
    const rolesMap = { alumno: 1, profesor: 2, admin: 3 };
    const idRol = rolesMap[rol?.toLowerCase()] ?? 1;
    await updateUsuario(firebaseuid, { nombre, apellido, idRol });
    await queryClient.invalidateQueries({ queryKey: ["usuarios", tipoUsuario] });
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
