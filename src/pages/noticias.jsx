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
          noticias del dia
        </Titulo>

        {/* esto despues lo conectas */}
        <div className="info-tiempo">
          <span>22°c</span>
        </div>
      </div>

      {/* noticia principal */}
      <section className="noticia-principal">
        <img src={img} alt="noticia" />

        <div className="contenido">
          <h2>evento academico destacado</h2>
          <p>
            estudiantes participaron en una jornada educativa enfocada en la
            innovacion y tecnologia.
          </p>
        </div>
      </section>

      {/* lista de noticias */}
      <section className="lista-noticias">

        <div className="card-noticia">
          <h3>feria cientifica</h3>
          <p>gran participacion de alumnos</p>
        </div>

        <div className="card-noticia">
          <h3>actividad deportiva</h3>
          <p>torneo interno del colegio</p>
        </div>

        <div className="card-noticia">
          <h3>reunion apoderados</h3>
          <p>informacion importante del semestre</p>
        </div>

      </section>

    </div>
  );
}

export default Noticias;