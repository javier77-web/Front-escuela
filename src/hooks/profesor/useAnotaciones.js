import { useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../auth/AuthContext";
import { crearAnotacion } from "../../api/gestionAcademica/anotacionService";

//Hook para el uso de la gestion de anotaciones
function useAnotaciones() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [anotaciones, setAnotaciones] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const agregarAnotacion = async (form) => {
    if (!form.alumno || !form.descripcion) return;

    setGuardando(true);
    setError(null);
    try {
      const payload = {
        descripcion: form.descripcion,
        fecha: form.fecha,
        usuario_receptor: form.alumno, // firebaseuid del alumno
      };
      const { data } = await crearAnotacion(payload);

      // Agrega optimistamente a la lista local para feedback inmediato
      setAnotaciones((prev) => [
        ...prev,
        { ...data, tipo: form.tipo, alumno: form.alumno },
      ]);

      // invalida el cache de anotaciones del alumno para que se refresque
      await queryClient.invalidateQueries({
        queryKey: ["anotaciones", form.alumno],
      });
    } catch (err) {
      setError("No se pudo guardar la anotación.");
      console.error(
        "Error al crear anotación:",
        err.response?.data ?? err.message,
      );
    } finally {
      setGuardando(false);
    }
  };

  return { user, anotaciones, agregarAnotacion, guardando, error };
}

export default useAnotaciones;
