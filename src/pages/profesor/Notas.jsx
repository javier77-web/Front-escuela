import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/notas.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import EvaluacionConNotas from "../../components/molecules/profesor/EvaluacionConNotas";
import useNotasProfesor from "../../hooks/profesor/useNotas";
import useUsuariosCurso from "../../hooks/useUsuariosCurso";

function NotasProfesor() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const nombreAsignatura = location.state?.nombre ?? `Asignatura ${id}`;
  const cursoNombre = location.state?.curso;
  const cursoId = location.state?.cursoId;

  const { evaluaciones, getTipo, loading, error } = useNotasProfesor(id);
  const { alumnos, loading: cargandoAlumnos, error: errorAlumnos } =
    useUsuariosCurso(cursoId);

  if (loading || cargandoAlumnos) {
    return (
      <PanelLayout rol="profesor">
        <div className="notas-profesor-container">
          <Spinner texto="cargando notas..." />
        </div>
      </PanelLayout>
    );
  }

  if (error || errorAlumnos) {
    return (
      <PanelLayout rol="profesor">
        <div className="notas-profesor-container">
          <Texto color="danger">{error ?? errorAlumnos}</Texto>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="profesor">
      <div className="notas-profesor-container">
        <div className="notas-header">
          <Titulo level={1}>
            Notas {nombreAsignatura}
            {cursoNombre ? ` - ${cursoNombre}` : ""}
          </Titulo>
          <Texto color="muted">Seleccione una evaluación para poner notas</Texto>
        </div>

        {evaluaciones.length === 0 ? (
          <Texto color="muted">No hay evaluaciones registradas aún</Texto>
        ) : (
          <div className="lista-evaluaciones-notas">
            {evaluaciones.map((e) => (
              <EvaluacionConNotas
                key={e.id_evaluacion ?? e.id}
                evaluacion={e}
                alumnos={alumnos}
                getTipo={getTipo}
              />
            ))}
          </div>
        )}

        <button onClick={() => navigate(-1)} className="btn-volver">
          Volver
        </button>
      </div>
    </PanelLayout>
  );
}

export default NotasProfesor;