import { useEffect, useState } from "react";

function useClima() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      const res = await fetch("http://localhost:8080/clima"); //URL de tu backend
      const data = await res.json();

      setClima({
        temperatura: data.main.temp,
        descripcion: data.weather[0].description,
      });
    };

    obtenerClima();
  }, []);

  return clima;
}

export default useClima;
