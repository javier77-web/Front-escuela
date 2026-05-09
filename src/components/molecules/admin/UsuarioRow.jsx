import React from "react";
import "../../../styles/molecules/admin/usuarioRow.css";

import Texto from "../../atoms/Texto";
import Boton from "../../atoms/Boton";

function UsuarioRow({ usuario, onEditar, onEliminar }) {
  return (
    <tr className="usuario-row">
      {/* NOMBRE */}
      <td>
        <Texto>{usuario.nombre}</Texto>
      </td>

      {/* APELLIDO */}
      <td>
        <Texto>{usuario.apellido}</Texto>
      </td>

      {/* EMAIL */}
      <td>
        <Texto>{usuario.email}</Texto>
      </td>

      {/* ACCIONES */}
      <td>
        <div className="usuario-acciones">
          <Boton variant="secondary" onClick={() => onEditar(usuario)}>
            editar
          </Boton>

          <Boton variant="danger" onClick={() => onEliminar(usuario.id)}>
            borrar
          </Boton>
        </div>
      </td>
    </tr>
  );
}

export default UsuarioRow;
