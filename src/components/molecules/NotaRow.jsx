import React from "react";
import Texto from "../atoms/Texto";
import Badge from "../atoms/Badge";
import Input from "../atoms/Input";

// Antes había dos NotaRow, una para profesor y otra para alumno.
// Ahora se usa una sola molecule dinámica.
function NotaRow({
  alumno,
  notas = [],
  editable = false,
  onCambiarNota,
  getTipo,
}) {
  const promedio =
    notas.length > 0
      ? notas.reduce((acc, n) => acc + n, 0) / notas.length
      : 0;

  return (
    <tr className={`nota-row${editable ? " nota-row--editable" : ""}`}>
      {/* Nombre del alumno o asignatura */}
      <td className="nota-alumno">
        <Texto>{alumno}</Texto>
      </td>

      {/* Notas */}
      {notas.map((nota, i) => (
        <td key={i}>
          {editable ? (
            <Input
              type="number"
              value={nota}
              step="0.1"
              onChange={(e) =>
                onCambiarNota(i, parseFloat(e.target.value) || 0)
              }
            />
          ) : (
            <Badge texto={nota.toFixed(1)} tipo={getTipo(nota)} />
          )}
        </td>
      ))}

      {/* Promedio */}
      <td>
        <Badge texto={promedio.toFixed(1)} tipo={getTipo(promedio)} />
      </td>
    </tr>
  );
}

export default NotaRow;