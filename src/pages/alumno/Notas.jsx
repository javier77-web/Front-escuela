import React from "react";
import "../../styles/pages/alumno/notas.css";
import Sidebar from "../../components/organisms/Sidebar";

// pagina de notas del alumno — muestra evaluaciones por asignatura
function Notas() {
  // datos estaticos — despues se conectan con la api de evaluaciones
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

  // retorna color segun la nota
  const getColor = (nota) => {
    if (nota >= 6.0) return "nota-alta";
    if (nota >= 4.0) return "nota-media";
    return "nota-baja";
  };

  // calcula el promedio general de todas las asignaturas
  const promedioGeneral = (
    notas.reduce((acc, n) => acc + n.promedio, 0) / notas.length
  ).toFixed(1);

  return (
    <div className="panel-container">
      {/* sidebar con navegacion */}
      <Sidebar rol="alumno" />
      <div className="panel-contenido">
        <div className="notas-container">
          {/* encabezado con promedio general */}
          <div className="notas-header">
            <div>
              <h1 className="notas-titulo">mis notas</h1>
              <p className="notas-subtitulo">
                resumen de evaluaciones del semestre
              </p>
            </div>

            {/* card promedio general */}
            <div className="notas-promedio-general">
              <p className="promedio-label">promedio general</p>
              <p className="promedio-valor">{promedioGeneral}</p>
            </div>
          </div>

          {/* tabla de notas */}
          <div className="notas-tabla-wrapper">
            <table className="notas-tabla">
              <thead>
                <tr className="notas-tabla-head">
                  <th>asignatura</th>
                  <th>nota 1</th>
                  <th>nota 2</th>
                  <th>nota 3</th>
                  <th>promedio</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((n, i) => (
                  <tr key={i} className="notas-tabla-row">
                    <td className="notas-asignatura">{n.asignatura}</td>
                    {[n.nota1, n.nota2, n.nota3].map((nota, j) => (
                      <td key={j} className={`nota-valor ${getColor(nota)}`}>
                        {nota.toFixed(1)}
                      </td>
                    ))}
                    <td>
                      <span className={`nota-badge ${getColor(n.promedio)}`}>
                        {n.promedio.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notas;
