import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import useCursos from "../../hooks/admin/useCursos";
import useFormulario from "../../hooks/useFormulario";
import { validarCurso } from "../../hooks/validaciones/validarCursos";
import "../../styles/pages/admin/gestionCursos.css";
import "../../styles/pages/admin/gestionUsuarios.css";

function GestionCursos() {
  const { cursos, isLoading, error, agregarCurso, editarCurso, borrarCurso } =
    useCursos();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [errorServidor, setErrorServidor] = useState("");

  const { valores, errores, manejarCambio, manejarSubmit, resetForm, setValores } =
    useFormulario({ nombre: "" }, validarCurso);

  const abrirModalNuevo = () => {
    setCursoEditando(null);
    resetForm();
    setErrorServidor("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (curso) => {
    setCursoEditando(curso);
    setValores({ nombre: curso.nombre });
    setErrorServidor("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCursoEditando(null);
    resetForm();
    setErrorServidor("");
  };

  const manejarEnvio = manejarSubmit(async () => {
    setErrorServidor("");
    try {
      if (cursoEditando) {
        await editarCurso(cursoEditando.id_curso, { nombre: valores.nombre.trim() });
      } else {
        await agregarCurso({ nombre: valores.nombre.trim() });
      }
      cerrarModal();
    } catch (err) {
      // Si el backend devuelve errores de validación (400), los mostramos tal cual
      const erroresBackend = err.response?.data?.errores;
      if (erroresBackend?.length > 0) {
        setErrorServidor(erroresBackend.map((e) => e.msg).join(" "));
      } else {
        setErrorServidor("No se pudo guardar el curso. Intenta nuevamente.");
      }
    }
  });

  return (
    <PanelLayout rol="admin">
      <div className="gestion-container">
        {/* HEADER */}
        <div className="gestion-header">
          <Titulo level={1}>Gestión de Cursos</Titulo>
          <Boton className="boton-nuevo" onClick={abrirModalNuevo}>Nuevo curso</Boton>
        </div>

        {/* ESTADOS */}
        {isLoading && <p>Cargando cursos...</p>}
        {error && <p>{error}</p>}

        {/* TABLA */}
        {!isLoading && !error && (
          <div className="cursos-tabla-wrapper">
            <table className="cursos-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cursos.length === 0 ? (
                  <tr>
                    <td colSpan={2}>No hay cursos registrados</td>
                  </tr>
                ) : (
                  cursos.map((curso) => (
                    <tr key={curso.id_curso}>
                      <td>{curso.nombre}</td>
                      <td>
                        <div className="cursos-acciones">
                          <Boton
                            className="boton-editar"
                            onClick={() => abrirModalEditar(curso)}
                          >
                            Editar
                          </Boton>
                          <Boton
                            className="boton-cancelar"
                            onClick={() => borrarCurso(curso.id_curso)}
                          >
                            Borrar
                          </Boton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {modalAbierto && (
          <div className="cursos-modal-overlay">
            <div className="cursos-modal-contenido">
              <Titulo level={2}>
                {cursoEditando ? "editar curso" : "nuevo curso"}
              </Titulo>

              <Input
                name="nombre"
                type="text"
                placeholder="ej: 1ro basico A, 4to medio D"
                value={valores.nombre}
                onChange={manejarCambio}
                error={errores.nombre}
              />

              {errorServidor && (
                <p className="cursos-error-servidor">{errorServidor}</p>
              )}

              <div className="cursos-modal-acciones">
                <Boton onClick={manejarEnvio}>
                  {cursoEditando ? "Guardar cambios" : "Crear curso"}
                </Boton>
                <Boton className="boton-cancelar" onClick={cerrarModal}>
                  Cancelar
                </Boton>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

export default GestionCursos;