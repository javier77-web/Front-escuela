import React from "react";
import "../../styles/pages/alumno/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Badge from "../../components/atoms/Badge";
import Texto from "../../components/atoms/Texto";
import AsistenciaCard from "../../components/molecules/alumno/AsistenciaCard";
import useAsistenciaAlumno from "../../hooks/alumno/useAsistenciaAlumno";

// pagina de asistencia del alumno — muestra porcentaje por asignatura
function Asistencia() {
  const { asistencia, promedioGlobal, getTipo, loading } =
    useAsistenciaAlumno();

  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <Texto>cargando asistencia...</Texto>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="alumno">
      <div className="asistencia-container">
        {/* HEADER */}
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>Asistencia</Titulo>

            <Texto color="muted">registro por asignatura</Texto>
          </div>

          <Badge texto={`${promedioGlobal}%`} tipo={getTipo(promedioGlobal)} />
        </div>

        {/* LISTA */}
        <div className="asistencia-lista">
          {asistencia.map((a) => (
            <AsistenciaCard
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
