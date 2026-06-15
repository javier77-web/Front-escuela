import { useState } from "react";

// este hook sirve para manejar formularios reutilizables
function useFormulario(valoresIniciales, validar) {
  
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nuevosValores = { ...valores, [name]: value };
    setValores(nuevosValores);

    // valida en tiempo real solo el campo que cambió
    // si el campo ya no tiene error lo limpia; si sigue inválido lo actualiza
    const todosLosErrores = validar(nuevosValores);
    setErrores((prev) => ({
      ...prev,
      [name]: todosLosErrores[name],
    }));
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
    setValores,
  };
}

export default useFormulario;