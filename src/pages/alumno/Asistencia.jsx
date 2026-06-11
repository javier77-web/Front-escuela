import React from "react";
import "../../styles/pages/alumno/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Badge from "../../components/atoms/Badge";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import AsistenciaResumenCard from "../../components/molecules/alumno/AsistenciaResumenCard";
import useAsistenciaAlumno from "../../hooks/alumno/useAsistenciaAlumno";

function Asistencia() {
  const { asistencia, promedioGlobal, getTipo, loading, error } =
    useAsistenciaAlumno();

  //  Estado: cargando 
  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <div className="asistencia-container asistencia-center">
          <Spinner />
          <Texto color="muted">Cargando Asistencia...</Texto>
        </div>
      </PanelLayout>
    );
  }

  //  Estado: error de red o del servidor 
  if (error) {
    return (
      <PanelLayout rol="alumno">
        <div className="asistencia-container asistencia-center">
          <Texto color="danger">{error}</Texto>
        </div>
      </PanelLayout>
    );
  }

  //  Estado: sin registros 
  if (asistencia.length === 0) {
    return (
      <PanelLayout rol="alumno">
        <div className="asistencia-container">
          <div className="asistencia-header">
            <Titulo level={1}>Asistencia</Titulo>
          </div>
          <Texto color="muted">Aún no hay registros de asistencia.</Texto>
        </div>
      </PanelLayout>
    );
  }

  //  Estado: datos OK 
  return (
    <PanelLayout rol="alumno">
      <div className="asistencia-container">
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>Asistencia</Titulo>
            <Texto color="muted">Registro por asignatura</Texto>
          </div>
          <Badge texto={`${promedioGlobal}%`} tipo={getTipo(promedioGlobal)} />
        </div>

        <div className="asistencia-lista">
          {asistencia.map((a) => (
            <AsistenciaResumenCard
              key={a.id}
              asignatura={a.asignatura}
              presentes={a.presentes}
              ausentes={a.ausentes}
              porcentaje={a.porcentaje}
              getTipo={getTipo}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Asistencia;