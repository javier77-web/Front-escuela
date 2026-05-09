import React from "react";
import "../../../styles/molecules/profesor/notaEditableRow.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Input from "../../atoms/Input";

function NotaEditableRow({
  alumno,
  i,
  actualizarNota,
  calcularPromedio,
  getTipo,
}) {
  const promedio = calcularPromedio(alumno.notas);

  return (
    <tr className="nota-editable-row">
      {/* NOMBRE */}
      <td className="alumno-columna">
        <Texto>{alumno.nombre}</Texto>
      </td>

      {/* NOTAS */}
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

      {/* PROMEDIO */}
      <td>
        <Badge texto={promedio.toFixed(1)} tipo={getTipo(promedio)} />
      </td>
    </tr>
  );
}

export default NotaEditableRow;
