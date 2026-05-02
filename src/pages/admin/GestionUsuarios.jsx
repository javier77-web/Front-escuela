import React, { useState } from "react";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/admin/gestionUsuarios.css";
import useFormulario from "../../hooks/useFormulario";
import { validarContacto } from "../../hooks/validaciones/validarContacto";

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
        <div className="gestion-header">
          <h1>gestión de {tipoUsuario}s</h1>

          {/* boton que abre el modal */}
          <button className="btn-crear" onClick={() => setModalAbierto(true)}>
            nuevo {tipoUsuario}
          </button>
        </div>

        {/* tabla de usuarios */}
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
                    <button className="btn-edit">editar</button>
                    <button className="btn-delete">borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal para crear nuevo usuario */}
      {modalAbierto && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-titulo">nuevo {tipoUsuario}</h2>

            {/* si ya se creo el usuario mostramos la contrasena */}
            {contrasenaGenerada ? (
              <div className="modal-contrasena">
                <p>usuario creado exitosamente</p>
                <p>contraseña temporal:</p>
                <span className="contrasena-valor">{contrasenaGenerada}</span>
                <p className="contrasena-aviso">
                  copia esta contraseña y entrégasela al usuario. no se
                  mostrará de nuevo.
                </p>
                <button className="btn-crear" onClick={cerrarModal}>
                  cerrar
                </button>
              </div>
            ) : (
              // formulario con hook useFormulario
              <form onSubmit={manejarEnvio} className="modal-formulario">
                <label>nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={valores.nombre}
                  onChange={manejarCambio}
                  placeholder="nombre del usuario"
                />
                {errores.nombre && (
                  <span className="error">{errores.nombre}</span>
                )}

                <label>apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={valores.apellido}
                  onChange={manejarCambio}
                  placeholder="apellido del usuario"
                />
                {errores.apellido && (
                  <span className="error">{errores.apellido}</span>
                )}

                <label>email</label>
                <input
                  type="email"
                  name="email"
                  value={valores.email}
                  onChange={manejarCambio}
                  placeholder="correo@colegio.cl"
                />
                {errores.email && (
                  <span className="error">{errores.email}</span>
                )}

                {/* rol fijo segun la pagina donde estamos */}
                <label>rol</label>
                <input
                  type="text"
                  name="rol"
                  value={valores.rol}
                  disabled
                  className="input-deshabilitado"
                />

                <div className="modal-botones">
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={cerrarModal}
                  >
                    cancelar
                  </button>
                  <button type="submit" className="btn-crear">
                    crear usuario
                  </button>
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
