import React from "react";
import "../../styles/pages/alumno/cursos.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import CursoCard from "../../components/molecules/alumno/CursoCard";
import PanelLayout from "../../layouts/PanelLayout";
import useCursosAlumno from "../../hooks/alumno/useCursosAlumno";

// pagina de cursos del alumno — muestra las asignaturas del sistema
function Cursos() {
  const { cursos, loading, error } = useCursosAlumno();

  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <div className="cursos-container">
          <Spinner texto="cargando cursos..." />
        </div>
      </PanelLayout>
    );
  }

  if (error) {
    return (
      <PanelLayout rol="alumno">
        <div className="cursos-container">
          <Texto color="danger">{error}</Texto>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="alumno">
      <div className="cursos-container">
        {/* HEADER */}
        <div className="cursos-header">
          <div>
            <Titulo level={1}>Mis cursos</Titulo>
            <Texto color="muted">
              {cursos.length > 0
                ? `Tienes ${cursos.length} ramos este semestre`
                : "No tienes cursos inscritos aún"}
            </Texto>
          </div>
        </div>

        {/* GRID */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id_asignatura}
              nombre={curso.nombre}
              profesor={curso.profesor ?? "sin asignar"}
              horario={curso.horario ?? ""}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Cursos;
