import React from "react";
import "../../../styles/molecules/alumno/notaRow.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function NotaRow({ asignatura, nota1, nota2, nota3, promedio, getTipo }) {
  return (
    <tr className="nota-row">
      <td className="nota-asignatura">
        <Texto>{asignatura}</Texto>
      </td>

      {[nota1, nota2, nota3].map((nota, i) => (
        <td key={i}>
          <Badge texto={nota.toFixed(1)} tipo={getTipo(nota)} />
        </td>
      ))}

      <td>
        <Badge texto={promedio.toFixed(1)} tipo={getTipo(promedio)} />
      </td>
    </tr>
  );
}

export default NotaRow;
