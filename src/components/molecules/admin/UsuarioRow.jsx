import React from "react";
import "../../../styles/molecules/admin/usuarioRow.css";

import Texto from "../../atoms/Texto";
import Boton from "../../atoms/Boton";

function UsuarioRow({ usuario, onEditar, onEliminar }) {
  return (
    <tr className="usuario-row">
      <td>
        <Texto>{usuario.nombre}</Texto>
      </td>

      <td>
        <Texto>{usuario.apellido}</Texto>
      </td>

      <td>
        <Texto>{usuario.fecha_registro}</Texto>
      </td>

      <td>
        <div className="usuario-acciones">
          <Boton variant="secondary" onClick={() => onEditar(usuario)}>
            editar
          </Boton>

          <Boton
            variant="danger"
            onClick={() => onEliminar(usuario.firebaseuid)}
          >
            borrar
          </Boton>
        </div>
      </td>
    </tr>
  );
}

export default UsuarioRow;
