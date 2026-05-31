import React from "react";
import "../../styles/pages/alumno/notas.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import NotaRow from "../../components/molecules/NotaRow";
import PanelLayout from "../../layouts/PanelLayout";
import useNotasAlumno from "../../hooks/alumno/useNotasAlumno";

function Notas() {
  const { notas, promedioGeneral, loading } = useNotasAlumno();

  const getTipo = (nota) => {
    if (nota >= 6.0) return "success";
    if (nota >= 4.0) return "warning";
    return "danger";
  };

  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <Texto>cargando notas...</Texto>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="alumno">
      <div className="notas-container">
        {/* HEADER */}
        <div className="notas-header">
          <div>
            <Titulo level={1}>Mis notas</Titulo>

            <Texto color="muted">resumen de evaluaciones del semestre</Texto>
          </div>

          {/* PROMEDIO */}
          <div className="notas-promedio-general">
            <Texto size="sm">promedio general</Texto>

            <Titulo level={2}>{promedioGeneral}</Titulo>
          </div>
        </div>

        {/* TABLA */}
        <div className="notas-tabla-wrapper">
          <table className="notas-tabla">
            <thead>
              <tr>
                <th>asignatura</th>
                {notas[0]?.notas.map((_, i) => (
                  <th key={i}>nota {i + 1}</th>
                ))}
                <th>promedio</th>
              </tr>
            </thead>

            <tbody>
              {notas.map((n, i) => (
                <NotaRow
                  key={i}
                  notas={n.notas}
                  getTipo={getTipo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PanelLayout>
  );
}

export default Notas;
