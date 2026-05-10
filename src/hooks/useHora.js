import { useEffect, useState } from "react";

function useHora() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();

      const horaFormateada = ahora.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setHora(horaFormateada);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return hora;
}

export default useHora;
