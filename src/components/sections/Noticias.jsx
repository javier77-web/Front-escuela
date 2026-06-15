// src/components/sections/Noticias.jsx
import React from "react";
import "../../styles/sections/noticias.css";

function Noticias() {

  return (
    <section className="seccion-noticias">
      <div className="contenedor-noticias">
        <h2 className="titulo-seccion">Noticias Del Día</h2>

        {/* noticias */}
        <div className="lista-noticias">
          <div className="noticia">
            <h3>Inicio De Semestre</h3>
            <p>Se dio inicio al nuevo periodo académico.</p>
          </div>

          <div className="noticia">
            <h3>Actividad Deportiva</h3>
            <p>Gran participación de estudiantes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Noticias;
