// src/components/sections/NuestroColegioPreview.jsx
import { useNavigate } from "react-router-dom";
import "../../styles/sections/NuestroColegioPreview.css";
import React from "react";

function NuestroColegioPreview() {
  const navegar = useNavigate();

  return (
    <section id="nuestro-colegio" className="nuestro-colegio">
      <div className="contenedor-colegio">
        <h2 className="titulo-seccion">Nuestro Colegio</h2>

        <p className="descripcion-seccion">
          En nuestro Colegio Bernardo O’Higgins, nos dedicamos a formar estudiantes integrales. Combinamos la excelencia académica con una sólida base de valores, preparando a las futuras generaciones para liderar con visión de futuro.
        </p>

        <div className="contenedor-tarjetas">
          <div className="tarjeta">
            <h3>Excelencia</h3>
            <p>Educación de alto nivel enfocada en el aprendizaje.</p>
          </div>

          <div className="tarjeta">
            <h3>Innovación</h3>
            <p>Uso de tecnología en procesos educativos.</p>
          </div>

          <div className="tarjeta">
            <h3>Comunidad</h3>
            <p>Ambiente colaborativo entre estudiantes y docentes.</p>
          </div>
        </div>

        <button
          className="boton-ver-mas"
          onClick={() => navegar("/nuestroColegio")}
        >
          Ver más
        </button>
      </div>
    </section>
  );
}

export default NuestroColegioPreview;
