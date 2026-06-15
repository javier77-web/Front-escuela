import React from "react";
import "../styles/pages/noticias.css";
import img from "../assets/noticias/noti.webp";
import Titulo from "../components/atoms/Titulo";

function Noticias() {
  return (
    <div className="noticias-container">

      {/* header */}
      <div className="noticias-header">
        <Titulo level={1} className="titulo-noticias">
          Noticias del dia
        </Titulo>  
      </div>

      {/* noticia principal */}
      <section className="noticia-principal">
        <img src={img} alt="noticia" />

        <div className="contenido">
          <h2>Evento Academico Destacado</h2>
          <p>
            Nuestros estudiantes participaron en una jornada educativa enfocada en la
            innovacion y tecnologia.
          </p>
        </div>
      </section>

      {/* lista de noticias */}
      <section className="lista-noticias">

        <div className="card-noticia">
          <h3>Feria Cientifica</h3>
          <p>Gran participacion de alumnos.</p>
        </div>

        <div className="card-noticia">
          <h3>Actividad Deportiva</h3>
          <p>Torneo interno del colegio.</p>
        </div>

        <div className="card-noticia">
          <h3>Reunion Apoderados</h3>
          <p>Informacion importante de cada mes.</p>
        </div>

      </section>

    </div>
  );
}

export default Noticias;