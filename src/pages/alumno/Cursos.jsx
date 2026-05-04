import React from "react";
import "../../styles/pages/alumno/cursos.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
// layout
import PanelLayout from "../../layouts/PanelLayout";

// pagina de cursos del alumno — muestra los cursos inscritos del semestre
function Cursos() {
  const cursos = [
    {
      id: 1,
      nombre: "Matemáticas",
      profesor: "Prof. García",
      horario: "Lun/Mié 08:00",
      creditos: 4,
    },
    {
      id: 2,
      nombre: "Lenguaje",
      profesor: "Prof. Martínez",
      horario: "Mar/Jue 10:00",
      creditos: 3,
    },
    {
      id: 3,
      nombre: "Historia",
      profesor: "Prof. López",
      horario: "Vie 09:00",
      creditos: 3,
    },
    {
      id: 4,
      nombre: "Ciencias",
      profesor: "Prof. Rodríguez",
      horario: "Lun/Mié 14:00",
      creditos: 4,
    },
    {
      id: 5,
      nombre: "Inglés",
      profesor: "Prof. Smith",
      horario: "Mar/Jue 08:00",
      creditos: 3,
    },
  ];

  return (
    <PanelLayout rol="alumno">
      <div className="cursos-container">
        {/* HEADER */}
        <div className="cursos-header">
          <Titulo level={1}>Mis cursos</Titulo>

          <Texto color="muted">
            tienes {cursos.length} ramos este semestre
          </Texto>
        </div>

        {/* GRID */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              <div className="curso-card-header">
                <Titulo level={3}>{curso.nombre}</Titulo>
              </div>

              {/* INFO */}
              <Texto>{curso.profesor}</Texto>

              <Texto size="sm" color="muted">
                {curso.horario}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Cursos;
