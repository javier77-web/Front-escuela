import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/pages/profesor/asignaturaDetalle.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import AccionCursoCard from "../../components/molecules/profesor/AccionCursoCard";
import useUsuariosCurso from "../../hooks/useUsuariosCurso";

function AsignaturaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const asignatura = location.state;
  const cursoId = asignatura?.cursoId;

  const { alumnos, loading: cargandoAlumnos, error: errorAlumnos } =
    useUsuariosCurso(cursoId);

  // estado base que se reenvía a todas las sub-secciones
  const estadoNavegacion = {
    nombre: asignatura?.nombre,
    curso: asignatura?.curso,
    cursoId,
  };

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
            texto="Asistencia"
            onClick={() =>
              navigate(`/profesor/${id}/asistencia`, { state: estadoNavegacion })
            }
          />

          <AccionCursoCard
            texto="Notas"
            onClick={() =>
              navigate(`/profesor/${id}/notas`, { state: estadoNavegacion })
            }
          />

          <AccionCursoCard
            texto="Anotaciones"
            onClick={() =>
              navigate(`/profesor/${id}/anotaciones`, { state: estadoNavegacion })
            }
          />

          <AccionCursoCard
            texto="Evaluaciones"
            onClick={() =>
              navigate(`/profesor/${id}/evaluaciones`, { state: estadoNavegacion })
            }
          />
          BOTÓN VOLVER
          <button onClick={() => navigate(-1)} className="btn-volver">
            Volver
          </button>
        </div>

        {/* LISTA DE ALUMNOS DEL CURSO */}
        <div className="asignatura-detalle-alumnos">
          <Titulo level={2}>Alumnos del curso</Titulo>

          {cargandoAlumnos ? (
            <Spinner texto="cargando alumnos..." />
          ) : errorAlumnos ? (
            <Texto color="danger">{errorAlumnos}</Texto>
          ) : alumnos.length === 0 ? (
            <Texto color="muted">No hay alumnos registrados en este curso</Texto>
          ) : (
            <ul className="asignatura-detalle-alumnos-lista">
              {alumnos.map((a) => (
                <li key={a.firebaseuid}>
                  {a.nombre} {a.apellido}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsignaturaDetalle;