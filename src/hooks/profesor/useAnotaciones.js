import { useState } from "react";

export default function useAnotaciones() {
  const [anotaciones, setAnotaciones] = useState([]);

  const agregarAnotacion = (form) => {
    if (!form.alumno || !form.descripcion) return;

    const nueva = {
      ...form,
      id: Date.now(),
    };

    setAnotaciones((prev) => [...prev, nueva]);
  };

  return {
    anotaciones,
    agregarAnotacion,
  };
}
