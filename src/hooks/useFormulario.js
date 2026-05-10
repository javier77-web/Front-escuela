import { useState } from "react";

// este hook sirve para manejar formularios reutilizables
function useFormulario(valoresIniciales, validar) {
  // estado de los inputs
  const [valores, setValores] = useState(valoresIniciales);

  // estado de errores
  const [errores, setErrores] = useState({});

  // manejar cambios en inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setValores({
      ...valores,
      [name]: value,
    });
  };

  // resetear formulario
  const resetForm = () => {
    setValores(valoresIniciales);
    setErrores({});
  };

  // manejar submit
  const manejarSubmit = (callback) => (e) => {
    e.preventDefault();

    const erroresDetectados = validar(valores);
    setErrores(erroresDetectados);

    // si no hay errores ejecuta lo que le mandes
    if (Object.keys(erroresDetectados).length === 0) {
      callback();
    }
  };

  return {
    valores,
    errores,
    manejarCambio,
    manejarSubmit,
    resetForm,
    setValores
  };
}

export default useFormulario;
