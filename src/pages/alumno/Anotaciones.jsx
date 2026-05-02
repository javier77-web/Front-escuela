import React, { useState } from "react";
import "../../styles/pages/alumno/anotaciones.css";
import Sidebar from "../../components/organisms/Sidebar";

// pagina de anotaciones del alumno — muestra historial con filtros
function Anotaciones() {
  // filtro activo: todas, positiva o negativa
  const [filtro, setFiltro] = useState("todas");

  // datos estaticos — despues se conectan con el microservicio de anotaciones
  const anotaciones = [
    {
      id: 1,
      tipo: "positiva",
      asignatura: "Matemáticas",
      descripcion: "Excelente participación en clases",
      fecha: "2024-04-10",
      profesor: "Prof. García",
    },
    {
      id: 2,
      tipo: "negativa",
      asignatura: "Historia",
      descripcion: "No entregó tarea a tiempo",
      fecha: "2024-04-08",
      profesor: "Prof. López",
    },
    {
      id: 3,
      tipo: "positiva",
      asignatura: "Inglés",
      descripcion: "Ayudó a sus compañeros en la actividad grupal",
      fecha: "2024-04-05",
      profesor: "Prof. Smith",
    },
    {
      id: 4,
      tipo: "negativa",
      asignatura: "Ciencias",
      descripcion: "Llegó tarde a la clase",
      fecha: "2024-04-03",
      profesor: "Prof. Rodríguez",
    },
    {
      id: 5,
      tipo: "positiva",
      asignatura: "Lenguaje",
      descripcion: "Presentación oral sobresaliente",
      fecha: "2024-03-28",
      profesor: "Prof. Martínez",
    },
  ];

  // filtra las anotaciones segun el filtro activo
  const filtradas = anotaciones.filter((a) =>
    filtro === "todas" ? true : a.tipo === filtro,
  );

  const positivas = anotaciones.filter((a) => a.tipo === "positiva").length;
  const negativas = anotaciones.filter((a) => a.tipo === "negativa").length;

  return (
    <div className="panel-container">
      {/* sidebar con navegacion */}
      <Sidebar rol="alumno" />
      <div className="panel-contenido">
        <div className="anotaciones-container">
          {/* encabezado */}
          <div className="anotaciones-header">
            <h1 className="anotaciones-titulo">anotaciones</h1>
            <p className="anotaciones-subtitulo">
              historial de anotaciones del semestre
            </p>
          </div>

          {/* resumen positivas y negativas */}
          <div className="anotaciones-resumen">
            <div className="resumen-card positiva">
              <p className="resumen-numero">{positivas}</p>
              <p className="resumen-label">positivas</p>
            </div>
            <div className="resumen-card negativa">
              <p className="resumen-numero">{negativas}</p>
              <p className="resumen-label"> negativas</p>
            </div>
          </div>

          {/* botones de filtro */}
          <div className="anotaciones-filtros">
            {["todas", "positiva", "negativa"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`filtro-btn ${filtro === f ? "filtro-activo" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* lista de anotaciones */}
          <div className="anotaciones-lista">
            {filtradas.map((a) => (
              <div key={a.id} className={`anotacion-card ${a.tipo}`}>
                <div className="anotacion-info">
                  <div className="anotacion-top">
                    <span>{a.tipo === "positiva"}</span>
                    <span className="anotacion-asignatura">{a.asignatura}</span>
                    <span className="anotacion-profesor">• {a.profesor}</span>
                  </div>
                  <p className="anotacion-descripcion">{a.descripcion}</p>
                </div>
                <span className="anotacion-fecha">{a.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anotaciones;
