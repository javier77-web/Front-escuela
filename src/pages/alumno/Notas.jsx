import React from "react";
import "../../styles/pages/alumno/notas.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import NotaRow from "../../components/molecules/NotaRow";
import Spinner from "../../components/atoms/Spinner";
import PanelLayout from "../../layouts/PanelLayout";
import useNotasAlumno from "../../hooks/alumno/useNotasAlumno";

function Notas() {
  const { notas, promedioGeneral, loading, error } = useNotasAlumno();

  const getTipo = (nota) => {
    if (nota >= 6.0) return "success";
    if (nota >= 4.0) return "warning";
    return "danger";
  };

  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <div className="notas-container">
          <Spinner texto="Cargando notas..." />
        </div>
      </PanelLayout>
    );
  }

  if (error) {
    return (
      <PanelLayout rol="alumno">
        <div className="notas-container">
          <Texto color="danger">{error}</Texto>
        </div>
      </PanelLayout>
    );
  }

  const maxNotas = notas.reduce(
    (max, n) => Math.max(max, n.notas.length),
    0
  );

  return (
    <PanelLayout rol="alumno">
      <div className="notas-container">
        {/* HEADER */}
        <div className="notas-header">
          <div>
            <Titulo level={1}>Mis notas</Titulo>

            <Texto color="muted">Resumen de evaluaciones del semestre</Texto>
          </div>

          {/* PROMEDIO GENERAL */}
          <div className="notas-promedio-general">
            <Texto size="sm">Promedio general</Texto>
            <Titulo level={2}>
              <Badge texto={promedioGeneral} tipo={getTipo(parseFloat(promedioGeneral))} />
            </Titulo>
          </div>
        </div>

        {/* TABLA */}
        {notas.length === 0 ? (
          <Texto color="muted">No hay notas registradas aún</Texto>
        ) : (
          <div className="notas-tabla-wrapper">
            <table className="notas-tabla">
              <thead>
                <tr>
                  <th>Asignatura</th>
                  {Array.from({ length: maxNotas }, (_, i) => (
                    <th key={i}>Nota {i + 1}</th>
                  ))}
                  <th>Promedio</th>
                </tr>
              </thead>

              <tbody>
                {notas.map((n, i) => (
                  <NotaRow
                    key={i}
                    alumno={n.asignatura}
                    notas={n.notas}
                    editable={false}
                    getTipo={getTipo}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

export default Notas;
