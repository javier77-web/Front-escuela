import React from "react";
import "../styles/pages/nuestroColegio.css";
import img from "../assets/nuestroColegio/nuestrocolegio.webp";
import Titulo from "../components/atoms/Titulo";
import Boton from "../components/atoms/Boton";
import Texto from "../components/atoms/Texto";

function NuestroColegio() {
  return (
    <div className="colegio-container">
      {/* HERO */}
      <section className="colegio-hero">
        {/* TEXTO */}
        <div className="colegio-texto">
          <Titulo level={1}>Colegio Bernardo O'higgins</Titulo>

          <Texto>
            Nuestra institución educativa enfocada en la excelencia académica, la
            formación integral y el desarrollo de estudiantes preparados para
            enfrentar los desafíos del futuro.
          </Texto>

          <Boton variant="primary" className="btn-colegio">
            Conocer más
          </Boton>

          {/* CARDS */}
          <div className="colegio-caracteristicas">
            <div className="card">
              <Titulo level={3}>Excelencia Académica</Titulo>
              <Texto size="sm" color="muted">
                Programas educativos modernos centrados en el aprendizaje real.
              </Texto>
            </div>

            <div className="card">
              <Titulo level={3}>Formación Integral</Titulo>
              <Texto size="sm" color="muted">
                Desarrollo de valores, habilidades sociales y pensamiento
                crítico.
              </Texto>
            </div>

            <div className="card">
              <Titulo level={3}>Innovación</Titulo>
              <Texto size="sm" color="muted">
                El uso de tecnología para mejorar el proceso educativo.
              </Texto>
            </div>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="colegio-imagen">
          <img src={img} alt="colegio" />
        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="colegio-frase">
        <Titulo level={2}>"Educar es formar personas para el futuro de nuestro pais"</Titulo>
      </section>
    </div>
  );
}

export default NuestroColegio;
