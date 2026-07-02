import React from "react";
import "../styles/pages/home.css";
import Acerca from "../components/sections/NuestroColegioPreview";
import Noticias from "../components/sections/Noticias";
import Boton from "../components/atoms/Boton";
import imagenPortada from "../assets/homee/cole.webp";

function Home() {
  return (
    <>
      <section className="hero">
        {/* contenido */}
        <div className="hero-contenido">
          <h2 className="titu2">Colegio</h2>
          <h1 className="titulo"> Bernardo O’Higgins</h1>
          <p className="subtitulo">
            Excelencia académica, formación integral y compromiso con la
            comunidad
          </p>

          <Boton
            onClick={() => (window.location.href = "#nuestro-colegio")}
            variant="primary"
          >
            Comenzar
          </Boton>
        </div>
        <div className="hero-imagen-container">
          <img
            src={imagenPortada}
            alt="Colegio Bernardo O'Higgins"
            className="hero-imagen"
          />
        </div>

        {/* forma diagonal */}
        <div className="hero-forma"></div>

        {/* brillo extra */}
        <div className="glow"></div>
      </section>

      {/* Acerca fuera del hero */}
      <section className="acerca-container">
        <Acerca />
      </section>

      {/* Noticias fuera del hero */}
      <section className="noticias-container">
        <Noticias />
      </section>
    </>
  );
}

export default Home;
