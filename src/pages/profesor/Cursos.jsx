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

  // Una tarjeta por cada combinación asignatura + curso.
  // Así cada curso se gestiona de forma independiente
  const cursosImpartidos = asignaturas.flatMap((asignatura) =>
    (asignatura.cursos ?? []).map((curso) => ({
      asignaturaId: asignatura.id_asignatura,
      asignaturaNombre: asignatura.nombre,
      cursoId: curso.id_curso,
      cursoNombre: curso.nombre,
      horario: asignatura.horario ?? "",
    })),
  );

  const irDetalle = (item) => {
    navigate(`/profesor/asignatura/${item.asignaturaId}`, {
      state: {
        id: item.asignaturaId,
        nombre: item.asignaturaNombre,
        curso: item.cursoNombre,
        cursoId: item.cursoId,
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
        <div className="cursos-header">
          <Titulo level={1}>Mis clases</Titulo>
          <Texto color="muted">Selecciona un curso para gestionarlo</Texto>
        </div>

        {cursosImpartidos.length === 0 ? (
          <Texto color="muted">No tienes asignaturas asignadas aún</Texto>
        ) : (
          <div className="cursos-grid">
            {cursosImpartidos.map((item) => (
              <CursoProfesorCard
                key={`${item.asignaturaId}-${item.cursoId}`}
                asignatura={item.asignaturaNombre}
                curso={item.cursoNombre}
                horario={item.horario}
                onGestionar={() => irDetalle(item)}
              />
            ))}
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

export default CursosProfesor;