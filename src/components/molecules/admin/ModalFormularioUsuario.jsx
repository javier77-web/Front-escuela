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
  cursos = [], // ← lista de cursos para el selector
}) {
  return (
    <div className="modal-fondo" onClick={cerrarModal}>
      <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
        <Titulo level={2}>
          {modoEdicion ? `editar ${tipoUsuario}` : `nuevo ${tipoUsuario}`}
        </Titulo>

        {contrasenaGenerada ? (
          <div className="modal-contrasena">
            <Texto>Usuario creado exitosamente</Texto>
            <Texto size="sm">Contraseña temporal:</Texto>
            <Texto className="contrasena-valor">{contrasenaGenerada}</Texto>
            <Texto size="sm" color="muted">
              Copia esta contraseña y entrégasela al usuario
            </Texto>
            <Boton onClick={cerrarModal}>Cerrar</Boton>
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

            {/* selector de curso solo para alumnos en modo edición */}
            {tipoUsuario === "alumno" && (
              <div className="modal-campo">
                <label className="modal-label">Curso</label>
                <select
                  name="cursoId"
                  value={valores.cursoId ?? ""}
                  onChange={manejarCambio}
                  className="modal-select"
                >
                  <option value="">Sin curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id_curso} value={curso.id_curso}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="modal-botones">
              <Boton type="submit">
                {modoEdicion ? "Guardar cambios" : "Crear usuario"}
              </Boton>
              <Boton type="button" variant="secondary" className="btn-modal-cancelar" onClick={cerrarModal}>
                Cancelar
              </Boton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalFormularioUsuario;
