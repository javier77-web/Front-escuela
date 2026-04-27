// src/components/sections/Noticias.jsx
import React from "react";
import useHora from "../../hooks/useHora";
import "../../styles/sections/noticias.css";

function Noticias() {
  const hora = useHora();

  return (
    <section className="seccion-noticias">
      <div className="contenedor-noticias">
        <h2 className="titulo-seccion">Noticias del día</h2>

        {/* info en tiempo real */}
        <div className="info-tiempo">
          <div className="hora">🕒 {hora}</div>

          
        </div>

        {/* noticias */}
        <div className="lista-noticias">
          <div className="noticia">
            <h3>Inicio de semestre</h3>
            <p>Se dio inicio al nuevo periodo académico.</p>
          </div>

          <div className="noticia">
            <h3>Actividad deportiva</h3>
            <p>Gran participación de estudiantes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Noticias;
