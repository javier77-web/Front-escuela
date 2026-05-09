import React, { useState } from "react";
import "../../styles/pages/admin/gestionUsuarios.css";
import useFormulario from "../../hooks/useFormulario";
import { validarUsuario } from "../../hooks/validaciones/validarUsuario";

// layout
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import UsuarioRow from "../../components/molecules/admin/UsuarioRow";
import ModalFormularioUsuario from "../../components/molecules/admin/ModalFormularioUsuario";
import useUsuarios from "../../hooks/admin/useUsuarios";

function GestionUsuarios({ tipoUsuario }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contrasenaGenerada, setContrasenaGenerada] = useState("");

  // hook usuarios
  const { usuarios, crearUsuario, eliminarUsuario } = useUsuarios(tipoUsuario);

  // formulario
  const { valores, errores, manejarCambio, manejarSubmit, resetForm } =
    useFormulario(
      {
        nombre: "",
        apellido: "",
        email: "",
        rol: tipoUsuario,
      },
      validarUsuario,
    );

  // filtrar usuarios
  const filtrados = usuarios.filter((u) => u.rol === tipoUsuario);

  // crear usuario
  const manejarEnvio = manejarSubmit(async () => {
    try {
      const resultado = await crearUsuario({
        ...valores,
      });

      setContrasenaGenerada(resultado.contrasena);

      resetForm();
    } catch (error) {
      alert(`error al crear usuario: ${error.message}`);
    }
  });

  // cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);

    setContrasenaGenerada("");
  };

  // editar usuario
  const editarUsuario = (usuario) => {
    console.log("editar", usuario);
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
                <UsuarioRow
                  key={usuario.id}
                  usuario={usuario}
                  onEditar={editarUsuario}
                  onEliminar={eliminarUsuario}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {modalAbierto && (
          <ModalFormularioUsuario
            tipoUsuario={tipoUsuario}
            valores={valores}
            errores={errores}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            cerrarModal={cerrarModal}
            contrasenaGenerada={contrasenaGenerada}
          />
        )}
      </div>
    </PanelLayout>
  );
}

export default GestionUsuarios;
