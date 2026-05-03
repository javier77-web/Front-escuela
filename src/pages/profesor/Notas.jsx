import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/profesor/notas.css";

function NotasProfesor() {
  const { id } = useParams();

  // datos simulados
  const [alumnos, setAlumnos] = useState([
    { nombre: "juan", notas: [6.5, 5.8, 7.0] },
    { nombre: "maria", notas: [5.5, 6.2, 6.8] },
    { nombre: "pedro", notas: [7.0, 6.5, 6.9] },
  ]);

  // actualizar nota
  const actualizarNota = (i, j, valor) => {
    const nuevos = [...alumnos];
    nuevos[i].notas[j] = parseFloat(valor) || 0;
    setAlumnos(nuevos);
  };

  // promedio
  const calcularPromedio = (notas) => {
    return (notas.reduce((acc, n) => acc + n, 0) / notas.length).toFixed(1);
  };

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        <div className="notas-profesor-container">
          <h1>notas curso {id}</h1>

          <div className="tabla-wrapper">
            <table className="tabla-notas">
              <thead>
                <tr>
                  <th>alumno</th>
                  <th>nota 1</th>
                  <th>nota 2</th>
                  <th>nota 3</th>
                  <th>promedio</th>
                </tr>
              </thead>

              <tbody>
                {alumnos.map((alumno, i) => (
                  <tr key={i}>
                    <td>{alumno.nombre}</td>

                    {alumno.notas.map((nota, j) => (
                      <td key={j}>
                        <input
                          type="number"
                          value={nota}
                          step="0.1"
                          onChange={(e) => actualizarNota(i, j, e.target.value)}
                        />
                      </td>
                    ))}

                    {/* promedio con color */}
                    <td>
                      <span
                        className={`promedio ${
                          calcularPromedio(alumno.notas) >= 6
                            ? "alto"
                            : calcularPromedio(alumno.notas) >= 4
                              ? "medio"
                              : "bajo"
                        }`}
                      >
                        {calcularPromedio(alumno.notas)}
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

export default NotasProfesor;
