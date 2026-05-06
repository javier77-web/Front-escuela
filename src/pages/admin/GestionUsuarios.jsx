import React, { useState } from "react";
import "../../styles/pages/admin/gestionUsuarios.css";
import useFormulario from "../../hooks/useFormulario";
import { validarContacto } from "../../hooks/validaciones/validarContacto";

// layout
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import useUsuarios from "../../hooks/admin/useUsuarios";

// genera una contraseña temporal automatica para el nuevo usuario
function generarContrasena() {
  const caracteres =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#";
  let contrasena = "";
  for (let i = 0; i < 10; i++) {
    contrasena += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length),
    );
  }
  return contrasena;
}

function GestionUsuarios({ tipoUsuario }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contrasenaGenerada, setContrasenaGenerada] = useState("");

  // HOOK DE USUARIOS (reemplaza useState local)
  const { usuarios, crearUsuario, eliminarUsuario } = useUsuarios(tipoUsuario);

  // formulario
  const { valores, errores, manejarCambio, manejarSubmit, resetForm } =
    useFormulario(
      { nombre: "", apellido: "", email: "", rol: tipoUsuario },
      validarContacto,
    );

  // filtrados
  const filtrados = usuarios.filter((u) => u.rol === tipoUsuario);

  // enviar form
  const manejarEnvio = manejarSubmit(() => {
    const contrasenaTemporal = generarContrasena();

    crearUsuario({
      ...valores,
      password: contrasenaTemporal,
    });

    setContrasenaGenerada(contrasenaTemporal);
    resetForm();
  });

  const cerrarModal = () => {
    setModalAbierto(false);
    setContrasenaGenerada("");
  };

  return (
    <PanelLayout rol="admin">
      <div className="gestion-container">
        {/* HEADER */}
        <div className="gestion-header">
          <Titulo level={1}>gestión de {tipoUsuario}s</Titulo>

          <Boton onClick={() => setModalAbierto(true)}>
            nuevo {tipoUsuario}
          </Boton>
        </div>

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>nombre</th>
                <th>apellido</th>
                <th>email</th>
                <th>acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <Boton variant="secondary">editar</Boton>

                    <Boton
                      variant="danger"
                      onClick={() => eliminarUsuario(usuario.id)}
                    >
                      borrar
                    </Boton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {modalAbierto && (
          <div className="modal-fondo" onClick={cerrarModal}>
            <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
              <Titulo level={2}>nuevo {tipoUsuario}</Titulo>

              {contrasenaGenerada ? (
                <div className="modal-contrasena">
                  <Texto>usuario creado exitosamente</Texto>

                  <Texto size="sm">contraseña temporal:</Texto>

                  <Texto className="contrasena-valor">
                    {contrasenaGenerada}
                  </Texto>

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

                  <Input
                    label="email"
                    name="email"
                    type="email"
                    value={valores.email}
                    onChange={manejarCambio}
                    error={errores.email}
                  />

                  <Input label="rol" name="rol" value={valores.rol} disabled />

                  <div className="modal-botones">
                    <Boton
                      type="button"
                      variant="secondary"
                      onClick={cerrarModal}
                    >
                      cancelar
                    </Boton>

                    <Boton type="submit">crear usuario</Boton>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

export default GestionUsuarios;
