import React from "react";
import "../../styles/pages/alumno/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Badge from "../../components/atoms/Badge";

// pagina de asistencia del alumno — muestra porcentaje por asignatura
function Asistencia() {
  const asistencia = [
    { asignatura: "Matemáticas", presentes: 18, ausentes: 2, porcentaje: 90 },
    { asignatura: "Lenguaje", presentes: 20, ausentes: 0, porcentaje: 100 },
    { asignatura: "Historia", presentes: 15, ausentes: 5, porcentaje: 75 },
  ];

  const getTipo = (p) => {
    if (p >= 90) return "success";
    if (p >= 75) return "warning";
    return "danger";
  };

  const promedioGlobal = Math.round(
    asistencia.reduce((acc, a) => acc + a.porcentaje, 0) / asistencia.length,
  );

  return (
    <PanelLayout rol="alumno">
      <div className="asistencia-container">
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>Asistencia</Titulo>
            <p>registro por asignatura</p>
          </div>

          <Badge texto={`${promedioGlobal}%`} tipo="success" />
        </div>

        <div className="asistencia-lista">
          {asistencia.map((a, i) => (
            <div key={i} className="asistencia-card">
              <h3>{a.asignatura}</h3>

              <div>
                <span>{a.presentes} presentes</span>
                <span>{a.ausentes} ausentes</span>
                <Badge
                  texto={`${a.porcentaje}%`}
                  tipo={getTipo(a.porcentaje)}
                />
              </div>

              <div className="barra-fondo">
                <div
                  className={`barra-progreso ${getTipo(a.porcentaje)}`}
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
