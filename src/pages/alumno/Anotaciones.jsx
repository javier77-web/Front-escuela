import React, { useState } from "react";
import "../../styles/pages/alumno/anotaciones.css";
// layout
import PanelLayout from "../../layouts/PanelLayout";
// atoms
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import Boton from "../../components/atoms/Boton";

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

  const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

  return (
    <PanelLayout rol="alumno">
      <div className="anotaciones-container">
        {/* HEADER */}
        <div className="anotaciones-header">
          <Titulo level={1}>Anotaciones</Titulo>
          <Texto color="muted">historial de anotaciones del semestre</Texto>
        </div>

        {/* RESUMEN */}
        <div className="anotaciones-resumen">
          <div className="resumen-card positiva">
            <Titulo level={2}>{positivas}</Titulo>
            <Texto size="sm">positivas</Texto>
          </div>

          <div className="resumen-card negativa">
            <Titulo level={2}>{negativas}</Titulo>
            <Texto size="sm">negativas</Texto>
          </div>
        </div>

        {/* FILTROS */}
        <div className="anotaciones-filtros">
          {["todas", "positiva", "negativa"].map((f) => (
            <Boton
              key={f}
              onClick={() => setFiltro(f)}
              variant={filtro === f ? "primary" : "secondary"}
            >
              {f}
            </Boton>
          ))}
        </div>

        {/* LISTA */}
        <div className="anotaciones-lista">
          {filtradas.map((a) => (
            <div key={a.id} className={`anotacion-card ${a.tipo}`}>
              <div className="anotacion-info">
                {/* TOP */}
                <div className="anotacion-top">
                  <Badge texto={a.tipo} tipo={getTipoBadge(a.tipo)} />

                  <Texto>{a.asignatura}</Texto>

                  <Texto size="sm" color="muted">
                    • {a.profesor}
                  </Texto>
                </div>

                {/* DESCRIPCIÓN */}
                <Texto>{a.descripcion}</Texto>
              </div>

              {/* FECHA */}
              <Texto size="sm" color="muted">
                {a.fecha}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Anotaciones;
