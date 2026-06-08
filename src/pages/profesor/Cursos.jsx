import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/cursos.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import CursoProfesorCard from "../../components/molecules/profesor/CursoProfesorCard";
import useCursosProfesor from "../../hooks/profesor/useCursosProfesor";


function CursosProfesor() {
  const navigate = useNavigate();
  const { asignaturas, loading, error } = useCursosProfesor();

  const irDetalle = (asignatura) => {
    navigate(`/profesor/asignatura/${asignatura.id_asignatura}`, {
      state: {
        id: asignatura.id_asignatura,
        nombre: asignatura.nombre,
        curso: asignatura.curso?.nombre ?? `Curso ${asignatura.curso_id}`,
      },
    });
  };


  if (loading) {
    return (
      <PanelLayout rol="profesor">
        <div className="cursos-profesor-container">
          <Spinner texto="cargando clases..." />
        </div>
      </PanelLayout>
    );
  }

  if (error) {
    return (
      <PanelLayout rol="profesor">
        <div className="cursos-profesor-container">
          <Texto color="danger">{error}</Texto>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="profesor">
      <div className="cursos-profesor-container">
        {/* HEADER */}
        <div className="cursos-header">
          <Titulo level={1}>mis clases</Titulo>
          <Texto color="muted">selecciona un curso para gestionarlo</Texto>
        </div>

        {/* GRID */}
        {asignaturas.length === 0 ? (
          <Texto color="muted">no tienes asignaturas asignadas aún</Texto>
        ) : (
          <div className="cursos-grid">
            {asignaturas.map((a) => (
              <CursoProfesorCard
                key={a.id_asignatura}
                nombre={a.nombre}
                curso={a.curso?.nombre ?? `Curso ${a.curso_id}`}
                horario={a.horario ?? ""}
                onGestionar={() => irDetalle(a)}
              />
            ))}
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

export default CursosProfesor;
