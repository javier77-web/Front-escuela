import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/notas.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import Input from "../../components/atoms/Input";

function NotasProfesor() {
  const { id } = useParams();

  const [alumnos, setAlumnos] = useState([
    { nombre: "juan", notas: [6.5, 5.8, 7.0] },
    { nombre: "maria", notas: [5.5, 6.2, 6.8] },
    { nombre: "pedro", notas: [7.0, 6.5, 6.9] },
  ]);

  const actualizarNota = (i, j, valor) => {
    const nuevos = [...alumnos];
    nuevos[i].notas[j] = parseFloat(valor) || 0;
    setAlumnos(nuevos);
  };

  // devuelve NUMBER (buena práctica)
  const calcularPromedio = (notas) =>
    notas.reduce((acc, n) => acc + n, 0) / notas.length || 0;

  const getTipo = (promedio) => {
    if (promedio >= 6) return "success";
    if (promedio >= 4) return "warning";
    return "danger";
  };

  return (
    <PanelLayout rol="profesor">
      <div className="notas-profesor-container">
        {/* HEADER */}
        <div className="notas-header">
          <Titulo level={1}>notas curso {id}</Titulo>

          <Texto color="muted">edita las calificaciones de los alumnos</Texto>
        </div>

        {/* TABLA */}
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
              {alumnos.map((alumno, i) => {
                const promedio = calcularPromedio(alumno.notas);

                return (
                  <tr key={i}>
                    <td>
                      <Texto>{alumno.nombre}</Texto>
                    </td>

                    {alumno.notas.map((nota, j) => (
                      <td key={j}>
                        <Input
                          type="number"
                          value={nota}
                          step="0.1"
                          onChange={(e) => actualizarNota(i, j, e.target.value)}
                        />
                      </td>
                    ))}

                    <td>
                      <Badge
                        texto={promedio.toFixed(1)}
                        tipo={getTipo(promedio)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PanelLayout>
  );
}

export default NotasProfesor;
