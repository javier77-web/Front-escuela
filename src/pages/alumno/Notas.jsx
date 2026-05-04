import React from "react";
import "../../styles/pages/alumno/notas.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";

import PanelLayout from "../../layouts/PanelLayout";

// pagina de notas del alumno — muestra evaluaciones por asignatura
function Notas() {
  const notas = [
    {
      asignatura: "Matemáticas",
      nota1: 6.5,
      nota2: 5.8,
      nota3: 7.0,
      promedio: 6.4,
    },
    {
      asignatura: "Lenguaje",
      nota1: 5.5,
      nota2: 6.2,
      nota3: 6.8,
      promedio: 6.2,
    },
    {
      asignatura: "Historia",
      nota1: 7.0,
      nota2: 6.5,
      nota3: 6.9,
      promedio: 6.8,
    },
    {
      asignatura: "Ciencias",
      nota1: 4.5,
      nota2: 5.0,
      nota3: 5.5,
      promedio: 5.0,
    },
    { asignatura: "Inglés", nota1: 6.8, nota2: 7.0, nota3: 6.5, promedio: 6.8 },
  ];

  const getTipo = (nota) => {
    if (nota >= 6.0) return "success";
    if (nota >= 4.0) return "warning";
    return "danger";
  };

  const promedioGeneral = (
    notas.reduce((acc, n) => acc + n.promedio, 0) / notas.length
  ).toFixed(1);

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
                <th>nota 1</th>
                <th>nota 2</th>
                <th>nota 3</th>
                <th>promedio</th>
              </tr>
            </thead>

            <tbody>
              {notas.map((n, i) => (
                <tr key={i}>
                  <td className="notas-asignatura">
                    <Texto>{n.asignatura}</Texto>
                  </td>

                  {[n.nota1, n.nota2, n.nota3].map((nota, j) => (
                    <td key={j}>
                      <Badge texto={nota.toFixed(1)} tipo={getTipo(nota)} />
                    </td>
                  ))}

                  <td>
                    <Badge
                      texto={n.promedio.toFixed(1)}
                      tipo={getTipo(n.promedio)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PanelLayout>
  );
}

export default Notas;
