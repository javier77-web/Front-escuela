import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  useObtenerUsuariosQuery,
  useEliminarUsuarioMutation,
} from "../../store/api/usuariosApi";

// genera contraseña temporal
function generarContrasena() {
  const caracteres = "1234567"

  let contrasena = caracteres;

  return contrasena;
}

function useUsuarios(tipoUsuario) {
  // funcion register del AuthContext — crea en Firebase + PostgreSQL
  const { register } = useContext(AuthContext);

  // RTK Query — obtiene usuarios filtrados por rol
  const {
    data: usuarios = [],
    isLoading,
    isError,
  } = useObtenerUsuariosQuery(tipoUsuario);

  // RTK Query — eliminar usuario
  const [eliminarUsuarioMutation] = useEliminarUsuarioMutation();

  // crea usuario: Firebase Auth + PostgreSQL via register()
  const crearUsuario = async ({ nombre, apellido, email, rol }) => {
    const contrasenaTemporal = generarContrasena();

    // idRol: 1 = alumno, 2 = profesor (ajusta segun tu BD)
    const idRol = rol === "alumno" ? 1 : 2;

    const resultado = await register(
      email,
      contrasenaTemporal,
      nombre,
      apellido,
      idRol,
    );

    if (!resultado.ok) {
      throw new Error(resultado.message);
    }

    return { ok: true, contrasena: contrasenaTemporal };
  };

  // elimina usuario por id
  const eliminarUsuario = async (id) => {
    await eliminarUsuarioMutation(id);
  };

  return {
    usuarios,
    isLoading,
    isError,
    crearUsuario,
    eliminarUsuario,
  };
}

export default useUsuarios;
