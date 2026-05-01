import React from "react";
import "../styles/pages/nuestroColegio.css";
import img from "../assets/nuestroColegio/nuestrocolegio.webp";

function NuestroColegio() {
  return (
    <div className="colegio-container">
      {/* seccion principal tipo hero */}
      <section className="colegio-hero">
        {/* bloque de texto */}
        <div className="colegio-texto">
          <h1>Colegio Bernardo O’higgins</h1>

          <p>
            institucion educativa enfocada en la excelencia academica, la
            formacion integral y el desarrollo de estudiantes preparados para
            enfrentar los desafios del futuro.
          </p>

          {/* boton decorativo */}
          <button className="btn-colegio">conocer mas</button>

          <div className="colegio-caracteristicas">
            <div className="card">
              <h3>excelencia academica</h3>
              <p>
                programas educativos modernos centrados en el aprendizaje real
              </p>
            </div>

            <div className="card">
              <h3>formacion integral</h3>
              <p>
                desarrollo de valores, habilidades sociales y pensamiento
                critico
              </p>
            </div>

            <div className="card">
              <h3>innovacion</h3>
              <p>uso de tecnologia para mejorar el proceso educativo</p>
            </div>
          </div>
        </div>

        {/* imagen del colegio */}
        <div className="colegio-imagen">
          <img src={img} alt="colegio" />
        </div>
      </section>

      {/* frase final */}
      <section className="colegio-frase">
        <h2>"educar es formar personas para el futuro"</h2>
      </section>
    </div>
  );
}

export default NuestroColegio;
