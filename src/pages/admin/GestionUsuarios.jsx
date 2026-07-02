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
import useCursos from "../../hooks/admin/useCursos";

function GestionUsuarios({ tipoUsuario }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contrasenaGenerada, setContrasenaGenerada] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const { cursos } = useCursos();

  // hook usuarios
  const {
    usuarios,
    isLoading,
    isError,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
  } = useUsuarios(tipoUsuario);

  // formulario
  const {
    valores,
    errores,
    manejarCambio,
    manejarSubmit,
    resetForm,
    setValores,
  } = useFormulario(
    { nombre: "", apellido: "", email: "", cursoId: "" },
    (valores) => validarUsuario(valores, !!usuarioEditando),
  );

  const cerrarModal = () => {
    setModalAbierto(false);
    setContrasenaGenerada("");
    setUsuarioEditando(null);
    resetForm();
  };

  // crear o editar según el modo
  const manejarEnvio = manejarSubmit(async () => {
    try {
      if (usuarioEditando) {
        console.log("llamando actualizarUsuario");
        await actualizarUsuario(usuarioEditando.firebaseuid, valores);
        console.log("actualizado ok");
        cerrarModal();
      } else {
        const resultado = await crearUsuario({ ...valores });
        setContrasenaGenerada(resultado.contrasena);
        resetForm();
      }
    } catch (error) {
      console.log("ERROR:", error);
      alert(`error: ${error.message}`);
    }
  });

  // abre el modal precargado con los datos del usuario
  const editarUsuario = (usuario) => {
    setValores({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: "",
      cursoId: usuario.cursoId ?? "",
    });
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  return (
    <PanelLayout rol="admin">
      <div className="gestion-container">
        {/* HEADER */}
        <div className="gestion-header">
          <Titulo level={1}>Gestión de {tipoUsuario}</Titulo>
          <Boton onClick={() => setModalAbierto(true)}>
            Nuevo {tipoUsuario}
          </Boton>
        </div>

        {/* ESTADOS DE CARGA */}
        {isLoading && <p>Cargando usuarios...</p>}
        {isError && <p>Error al cargar usuarios</p>}

        {/* TABLA */}
        {!isLoading && !isError && (
          <div className="tabla-wrapper">
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No hay {tipoUsuario} registrados</td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <UsuarioRow
                      key={usuario.firebaseuid}
                      usuario={usuario}
                      onEditar={editarUsuario}
                      onEliminar={() => eliminarUsuario(usuario.firebaseuid)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

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
            modoEdicion={!!usuarioEditando}
            cursos={cursos}
          />
        )}
      </div>
    </PanelLayout>
  );
}

export default GestionUsuarios;
