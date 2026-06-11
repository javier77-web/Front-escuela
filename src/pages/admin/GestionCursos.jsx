import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import useCursos from "../../hooks/admin/useCursos";
import "../../styles/pages/admin/gestionCursos.css";

function GestionCursos() {
  const { cursos, isLoading, error, agregarCurso, editarCurso, borrarCurso } =
    useCursos();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [nombre, setNombre] = useState("");

  const abrirModalNuevo = () => {
    setCursoEditando(null);
    setNombre("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (curso) => {
    setCursoEditando(curso);
    setNombre(curso.nombre);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCursoEditando(null);
    setNombre("");
  };

  const manejarEnvio = async () => {
    if (!nombre.trim()) return;
    try {
      if (cursoEditando) {
        await editarCurso(cursoEditando.id_curso, { nombre });
      } else {
        await agregarCurso({ nombre });
      }
      cerrarModal();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <PanelLayout rol="admin">
      <div className="gestion-cursos-container">
        {/* HEADER */}
        <div className="gestion-cursos-header">
          <Titulo level={1}>Gestión de Cursos</Titulo>
          <Boton onClick={abrirModalNuevo}>nuevo curso</Boton>
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
                            variant="secondary"
                            onClick={() => abrirModalEditar(curso)}
                          >
                            editar
                          </Boton>
                          <Boton
                            variant="danger"
                            onClick={() => borrarCurso(curso.id_curso)}
                          >
                            borrar
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
            <div className="modal-contenido">
              <Titulo level={2}>
                {cursoEditando ? "editar curso" : "nuevo curso"}
              </Titulo>
              <Input
                type="text"
                placeholder="ej: 5 A  o  1ero medio A"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="modal-acciones">
                <Boton onClick={manejarEnvio}>
                  {cursoEditando ? "guardar cambios" : "crear curso"}
                </Boton>
                <Boton variant="secondary" onClick={cerrarModal}>
                  cancelar
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
