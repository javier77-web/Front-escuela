import React, { useState } from "react";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/admin/gestionUsuarios.css";
import useFormulario from "../../hooks/useFormulario";
import { validarContacto } from "../../hooks/validaciones/validarContacto";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";

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

// pagina para que el admin cree y vea usuarios
function GestionUsuarios({ tipoUsuario }) {
  // controla si el modal esta abierto o cerrado
  const [modalAbierto, setModalAbierto] = useState(false);

  // guarda la contrasena generada para mostrarla al admin
  const [contrasenaGenerada, setContrasenaGenerada] = useState("");

  // hook reutilizable de formulario con validaciones
  const { valores, errores, manejarCambio, manejarSubmit } = useFormulario(
    { nombre: "", apellido: "", email: "", rol: tipoUsuario },
    validarContacto,
  );

  // datos de prueba — reemplazar con llamada al api gateway cuando este listo
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@colegio.cl",
      rol: "alumno",
    },
    {
      id: 2,
      nombre: "Profe",
      apellido: "Silva",
      email: "silva@colegio.cl",
      rol: "profesor",
    },
  ]);

  // filtramos segun el tipo de usuario que se esta gestionando
  const filtrados = usuarios.filter((u) => u.rol === tipoUsuario);

  // maneja el envio del formulario validado
  const manejarEnvio = manejarSubmit(() => {
    const contrasenaTemporal = generarContrasena();

    // simulacion local mientras no hay api
    setUsuarios([...usuarios, { id: usuarios.length + 1, ...valores }]);

    // mostramos la contrasena al admin
    setContrasenaGenerada(contrasenaTemporal);
  });

  // cierra el modal y limpia todo
  const cerrarModal = () => {
    setModalAbierto(false);
    setContrasenaGenerada("");
  };

  return (
    <div className="panel-container">
      <Sidebar rol="admin" />

      <div className="panel-contenido">
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
                    <Boton variant="danger">borrar</Boton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                  placeholder="nombre del usuario"
                  error={errores.nombre}
                />

                <Input
                  label="apellido"
                  name="apellido"
                  value={valores.apellido}
                  onChange={manejarCambio}
                  placeholder="apellido del usuario"
                  error={errores.apellido}
                />

                <Input
                  label="email"
                  name="email"
                  type="email"
                  value={valores.email}
                  onChange={manejarCambio}
                  placeholder="correo@colegio.cl"
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
  );
}

export default GestionUsuarios;
