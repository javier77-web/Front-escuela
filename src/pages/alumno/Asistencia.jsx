import React from "react";
import "../../styles/pages/alumno/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Badge from "../../components/atoms/Badge";
import Texto from "../../components/atoms/Texto";
import useAsistenciaAlumno from "../../hooks/alumno/useAsistenciaAlumno";

// pagina de asistencia del alumno — muestra porcentaje por asignatura
function Asistencia() {
  const { asistencia, promedioGlobal, getTipo, loading } =
    useAsistenciaAlumno();

  if (loading) return <p>cargando...</p>;

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
          {asistencia.map((a, i) => (
            <div key={i} className="asistencia-card">
              {/* HEADER CARD */}
              <div className="asistencia-card-header">
                {/* IZQUIERDA */}
                <Titulo level={3} className="asistencia-nombre">
                  {a.asignatura}
                </Titulo>

                {/* CENTRO */}
                <div className="asistencia-detalle">
                  <Texto className="presentes">{a.presentes} presentes</Texto>
                  <Texto className="ausentes">{a.ausentes} ausentes</Texto>
                </div>

                {/* DERECHA */}
                <Badge
                  texto={`${a.porcentaje}%`}
                  tipo={getTipo(a.porcentaje)}
                />
              </div>

              {/* BARRA */}
              <div className="barra-fondo">
                <div
                  className={`barra-progreso asistencia-${getTipo(
                    a.porcentaje,
                  )}`}
                  style={{ width: `${a.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Asistencia;
