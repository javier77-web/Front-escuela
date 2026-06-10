import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Spinner from "../../components/atoms/Spinner";
import AsistenciaRegistroCard from "../../components/molecules/profesor/AsistenciaRegistroCard";
import useAsistencia from "../../hooks/profesor/useAsistencia";
import useUsuariosCurso from "../../hooks/useUsuariosCurso";

function AsistenciaProfesor() {
  const { id } = useParams();

  const location = useLocation();
  const cursoId = location.state?.cursoId;
  console.log("cursoId:", cursoId);

  const {
    alumnos,
    loading: cargandoAlumnos,
  } = useUsuariosCurso(cursoId);

  const {
    lista,
    fecha,
    setFecha,
    cambiarEstado,
    porcentaje,
    guardar,
    guardado,
    loading,
  } = useAsistencia(id, alumnos);

  const getTipo = (estado) =>
    estado === "presente" ? "success" : "danger";

  if (loading || cargandoAlumnos) {
    return (
      <PanelLayout rol="profesor">
        <div className="asistencia-profesor-container">
          <Spinner texto="cargando asistencia..." />
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="profesor">
      <div className="asistencia-profesor-container">
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>
              asistencia asignatura {id}
            </Titulo>

            <Texto color="muted">
              selecciona fecha y marca asistencia
            </Texto>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="input-fecha"
            />
          </div>

          <div className="asistencia-global">
            <Texto size="sm">asistencia</Texto>
            <Titulo level={2}>{porcentaje}%</Titulo>
          </div>
        </div>

        {lista.length === 0 ? (
          <Texto color="muted">
            no hay alumnos en este curso
          </Texto>
        ) : (
          <div className="asistencia-lista">
            {lista.map((alumno) => (
              <AsistenciaRegistroCard
                key={alumno.id}
                alumno={alumno}
                cambiarEstado={cambiarEstado}
                getTipo={getTipo}
              />
            ))}
          </div>
        )}

        <div className="asistencia-footer">
          <Boton onClick={guardar}>
            guardar asistencia
          </Boton>

          {guardado && (
            <Texto color="success">
              asistencia guardada para {fecha}
            </Texto>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsistenciaProfesor;