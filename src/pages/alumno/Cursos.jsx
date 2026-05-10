import React from "react";
import "../../styles/pages/alumno/cursos.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import CursoCard from "../../components/molecules/alumno/CursoCard";
// layout
import PanelLayout from "../../layouts/PanelLayout";

// pagina de cursos del alumno — muestra los cursos inscritos del semestre
function Cursos() {
  const cursos = [
    {
      id: 1,
      nombre: "Matemáticas",
      profesor: "Prof. García",
      horario: "Lun/Mié 08:00"
    },
    {
      id: 2,
      nombre: "Lenguaje",
      profesor: "Prof. Martínez",
      horario: "Mar/Jue 10:00"
    },
    {
      id: 3,
      nombre: "Historia",
      profesor: "Prof. López",
      horario: "Vie 09:00"
    },
    {
      id: 4,
      nombre: "Ciencias",
      profesor: "Prof. Rodríguez",
      horario: "Lun/Mié 14:00"
    },
    {
      id: 5,
      nombre: "Inglés",
      profesor: "Prof. Smith",
      horario: "Mar/Jue 08:00"
    },
  ];

  return (
    <PanelLayout rol="alumno">
      <div className="cursos-container">
        {/* HEADER */}
        <div className="cursos-header">
          <div>
            <Titulo level={1}>Mis cursos</Titulo>

            <Texto color="muted">
              tienes {cursos.length} ramos este semestre
            </Texto>
          </div>
        </div>

        {/* GRID */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              nombre={curso.nombre}
              profesor={curso.profesor}
              horario={curso.horario}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Cursos;
