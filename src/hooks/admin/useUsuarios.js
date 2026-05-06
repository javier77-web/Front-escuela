import { useState, useEffect } from "react";

function useUsuarios(tipoUsuario) {
  const [usuarios, setUsuarios] = useState([]);

  // simula carga inicial (luego será fetch)
  useEffect(() => {
    const data = [
      {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@colegio.cl",
        rol: "alumno",
      },
      {
        id: 2,
        nombre: "Profe",
        apellido: "Silva",
        email: "silva@colegio.cl",
        rol: "profesor",
      },
    ];

    setUsuarios(data);
  }, []);

  const crearUsuario = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, { id: Date.now(), ...nuevoUsuario }]);
  };

  const eliminarUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    usuarios,
    crearUsuario,
    eliminarUsuario,
  };
}

export default useUsuarios;
