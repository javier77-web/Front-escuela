import React from "react";
import "../styles/pages/home.css";

function Home() {
  return (
    <section className="hero">
      {/* contenido */}
      <div className="hero-contenido">
        <h2 className="titu2">Colegio</h2> 
        <h1 className="titulo"> Bernardo O’Higgins</h1>

        <p className="subtitulo">
          excelencia académica, formación integral y compromiso con la comunidad
        </p>

        <div className="botones">
          <button className="btn-principal">comenzar</button>
          <button className="btn-secundario">ver mas</button>
        </div>
      </div>

      {/* forma diagonal */}
      <div className="hero-forma"></div>

      {/* brillo extra */}
      <div className="glow"></div>
    </section>
  );
}

export default Home;
