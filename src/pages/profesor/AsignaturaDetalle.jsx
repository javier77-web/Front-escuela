import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/pages/profesor/asignaturaDetalle.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import AccionCursoCard from "../../components/molecules/profesor/AccionCursoCard";

function AsignaturaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const asignatura = location.state;

  return (
    <PanelLayout rol="profesor">
      <div className="asignatura-detalle-container">
        <Titulo level={1}>
          {asignatura
            ? `${asignatura.nombre} - ${asignatura.curso}`
            : `asignatura ${id}`}
        </Titulo>

        <div className="acciones-curso">
          <AccionCursoCard
            texto="asistencia"
            onClick={() =>
              navigate(`/profesor/${id}/asistencia`, {
                state: {
                  id: asignatura?.id,
                  nombre: asignatura?.nombre,
                  curso: asignatura?.curso,
                  cursoId: asignatura?.curso_id, // ← fix: era asignatura.cursoId
                },
              })
            }
          />

          <AccionCursoCard
            texto="notas"
            onClick={() => navigate(`/profesor/${id}/notas`)}
          />

          <AccionCursoCard
            texto="anotaciones"
            onClick={() => navigate(`/profesor/${id}/anotaciones`)}
          />

          <AccionCursoCard
            texto="evaluaciones"
            onClick={() => navigate(`/profesor/${id}/evaluaciones`)}
          />
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsignaturaDetalle;
