import React from "react";
import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Input from "../../atoms/Input";
import Boton from "../../atoms/Boton";
import "../../../styles/molecules/admin/modalFormularioUsuario.css";

function ModalFormularioUsuario({
  tipoUsuario,
  valores,
  errores,
  manejarCambio,
  manejarEnvio,
  cerrarModal,
  contrasenaGenerada,
  modoEdicion,
}) {
  return (
    <div className="modal-fondo" onClick={cerrarModal}>
      <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
        {/* ← título cambia según modo */}
        <Titulo level={2}>
          {modoEdicion ? `editar ${tipoUsuario}` : `nuevo ${tipoUsuario}`}
        </Titulo>

        {contrasenaGenerada ? (
          <div className="modal-contrasena">
            <Texto>usuario creado exitosamente</Texto>
            <Texto size="sm">contraseña temporal:</Texto>
            <Texto className="contrasena-valor">{contrasenaGenerada}</Texto>
            <Texto size="sm" color="muted">
              copia esta contraseña y entrégasela al usuario
            </Texto>
            <Boton onClick={cerrarModal}>cerrar</Boton>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="modal-formulario">
            <Input
              label="nombre"
              name="nombre"
              value={valores.nombre}
              onChange={manejarCambio}
              error={errores.nombre}
            />
            <Input
              label="apellido"
              name="apellido"
              value={valores.apellido}
              onChange={manejarCambio}
              error={errores.apellido}
            />

            {/* ← email solo al crear */}
            {!modoEdicion && (
              <Input
                label="email"
                name="email"
                type="email"
                value={valores.email}
                onChange={manejarCambio}
                error={errores.email}
              />
            )}

            <Input label="rol" name="rol" value={valores.rol} disabled />

            <div className="modal-botones">
              <Boton type="button" variant="secondary" onClick={cerrarModal}>
                cancelar
              </Boton>

              {/* ← texto del botón cambia según modo */}
              <Boton type="submit">
                {modoEdicion ? "guardar cambios" : "crear usuario"}
              </Boton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalFormularioUsuario;
