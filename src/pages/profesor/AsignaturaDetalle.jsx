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
        {/* TITULO */}
        <Titulo level={1}>
          {asignatura
            ? `${asignatura.nombre} - ${asignatura.curso}`
            : `asignatura ${id}`}
        </Titulo>

        {/* ACCIONES */}
        <div className="acciones-curso">
          <AccionCursoCard
            texto="asistencia"
            onClick={() =>
              navigate(`/profesor/${id}/asistencia`, {
                state: {
                  cursoId: asignatura?.curso_id,
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
            onClick={() => navigate(`/profesor/${id}/anotaciones`, {
              state: {
                cursoId: asignatura?.curso_id
              }
            })}
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
