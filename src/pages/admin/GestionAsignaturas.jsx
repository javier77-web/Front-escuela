import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import useAsignaturas from "../../hooks/admin/useAsignaturas";
import useCursos from "../../hooks/admin/useCursos";
import useUsuarios from "../../hooks/admin/useUsuarios";
import "../../styles/pages/admin/gestionAsignaturas.css";

function GestionAsignaturas() {
  const {
    asignaturas,
    isLoading,
    error,
    agregarAsignatura,
    editarAsignatura,
    borrarAsignatura,
    asignarProfesor,
    asignarCursos,
  } = useAsignaturas();
  const { cursos } = useCursos();
  const { usuarios: profesores } = useUsuarios("profesor");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalProfesorAbierto, setModalProfesorAbierto] = useState(false);
  const [modalCursosAbierto, setModalCursosAbierto] = useState(false);
  const [asignaturaEditando, setAsignaturaEditando] = useState(null);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState("");
  const [profesorUid, setProfesorUid] = useState("");
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  const abrirModalNuevo = () => {
    setAsignaturaEditando(null);
    setNombre("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (asignatura) => {
    setAsignaturaEditando(asignatura);
    setNombre(asignatura.nombre);
    setModalAbierto(true);
  };

  const abrirModalProfesor = (asignatura) => {
    setAsignaturaSeleccionada(asignatura);
    setProfesorUid(asignatura.profesor_uid ?? "");
    setModalProfesorAbierto(true);
  };

  const abrirModalCursos = (asignatura) => {
    setAsignaturaSeleccionada(asignatura);
    // precarga los cursos que ya tiene asignados
    const idsActuales = asignatura.cursos?.map((c) => c.id_curso) ?? [];
    setCursosSeleccionados(idsActuales);
    setModalCursosAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAsignaturaEditando(null);
    setNombre("");
    setProfesorUid("");
  };

  const cerrarModalProfesor = () => {
    setModalProfesorAbierto(false);
    setAsignaturaSeleccionada(null);
    setProfesorUid("");
  };

  const cerrarModalCursos = () => {
    setModalCursosAbierto(false);
    setAsignaturaSeleccionada(null);
    setCursosSeleccionados([]);
  };

  const manejarEnvio = async () => {
    if (!nombre.trim()) return;
    try {
      if (asignaturaEditando) {
        await editarAsignatura(asignaturaEditando.id_asignatura, { nombre });
      } else {
        await agregarAsignatura({ nombre, profesor_uid: profesorUid || null });
      }
      cerrarModal();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const manejarAsignarProfesor = async () => {
    if (!profesorUid) return;
    try {
      await asignarProfesor(asignaturaSeleccionada.id_asignatura, profesorUid);
      cerrarModalProfesor();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const manejarAsignarCursos = async () => {
    if (cursosSeleccionados.length === 0) return;
    try {
      await asignarCursos(
        asignaturaSeleccionada.id_asignatura,
        cursosSeleccionados,
      );
      cerrarModalCursos();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const toggleCurso = (idCurso) => {
    setCursosSeleccionados((prev) =>
      prev.includes(idCurso)
        ? prev.filter((id) => id !== idCurso)
        : [...prev, idCurso],
    );
  };

  // función helper para buscar el nombre
  const obtenerNombreProfesor = (uid) => {
    const profesor = profesores.find((p) => p.firebaseuid === uid);
    return profesor
      ? `${profesor.nombre} ${profesor.apellido}`
      : "sin profesor";
  };

  return (
    <PanelLayout rol="admin">
      <div className="gestion-asignaturas-container">
        {/* HEADER */}
        <div className="gestion-asignaturas-header">
          <Titulo level={1}>Gestión de Asignaturas</Titulo>
          <Boton onClick={abrirModalNuevo}>Nueva asignatura</Boton>
        </div>

        {/* ESTADOS */}
        {isLoading && <p>Cargando asignaturas...</p>}
        {error && <p>{error}</p>}

        {/* TABLA */}
        {!isLoading && !error && (
          <div className="asignaturas-tabla-wrapper">
            <table className="asignaturas-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cursos</th>
                  <th>Profesor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asignaturas.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No hay asignaturas registradas</td>
                  </tr>
                ) : (
                  asignaturas.map((asignatura) => (
                    <tr key={asignatura.id_asignatura}>
                      <td>{asignatura.nombre}</td>
                      <td>
                        {asignatura.cursos?.length > 0
                          ? asignatura.cursos.map((c) => c.nombre).join(", ")
                          : "sin cursos"}
                      </td>
                      <td>
                        {asignatura.profesor_uid
                          ? obtenerNombreProfesor(asignatura.profesor_uid)
                          : "sin profesor"}
                      </td>
                      <td>
                        <div className="asignaturas-acciones">
                          <Boton
                            variant="secondary"
                            onClick={() => abrirModalEditar(asignatura)}
                          >
                            Editar
                          </Boton>
                          <Boton
                            variant="secondary"
                            onClick={() => abrirModalCursos(asignatura)}
                          >
                            Asignar cursos
                          </Boton>
                          <Boton
                            variant="secondary"
                            onClick={() => abrirModalProfesor(asignatura)}
                          >
                            Asignar profesor
                          </Boton>
                          <Boton
                            variant="danger"
                            onClick={() =>
                              borrarAsignatura(asignatura.id_asignatura)
                            }
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

        {/* MODAL CREAR/EDITAR */}
        {modalAbierto && (
          <div className="asignaturas-modal-overlay">
            <div className="asignaturas-modal-contenido">
              <Titulo level={2}>
                {asignaturaEditando ? "editar asignatura" : "nueva asignatura"}
              </Titulo>

              {/* Campo nombre */}
              <Input
                type="text"
                placeholder="Nombre de la asignatura"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              {/* Dropdown de profesores */}
              <select
                value={profesorUid}
                onChange={(e) => setProfesorUid(e.target.value)}
                style={{ marginTop: "12px", marginBottom: "12px" }}
              >
                <option value="">-- Selecciona un profesor --</option>
                {profesores.map((prof) => (
                  <option key={prof.firebaseuid} value={prof.firebaseuid}>
                    {prof.nombre} {prof.apellido}
                  </option>
                ))}
              </select>

              <div className="asignaturas-modal-acciones">
                <Boton onClick={manejarEnvio}>
                  {asignaturaEditando ? "Guardar cambios" : "Crear asignatura"}
                </Boton>
                <Boton className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </Boton>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ASIGNAR CURSOS */}
        {modalCursosAbierto && (
          <div className="asignaturas-modal-overlay">
            <div className="asignaturas-modal-contenido">
              <Titulo level={2}>Asignar cursos</Titulo>
              <p>{asignaturaSeleccionada?.nombre}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  margin: "12px 0",
                }}
              >
                <p className="asignatura-seleccionada">
                  {asignaturaSeleccionada?.nombre}
                </p>

                <div className="asignaturas-cursos-lista">
                  {cursos.map((curso) => (
                    <label
                      key={curso.id_curso}
                      className={`asignaturas-curso-item ${cursosSeleccionados.includes(curso.id_curso)
                          ? "seleccionado"
                          : ""
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={cursosSeleccionados.includes(curso.id_curso)}
                        onChange={() => toggleCurso(curso.id_curso)}
                      />
                      {curso.nombre}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-acciones">
                <Boton onClick={manejarAsignarCursos}>Asignar</Boton>
                  <Boton className="boton-cancelar" onClick={cerrarModalCursos}>
                  Cancelar
                </Boton>
                
              </div>
            </div>
          </div>
        )}

        {/* MODAL ASIGNAR PROFESOR */}
        {modalProfesorAbierto && (
          <div className="asignaturas-modal-overlay">
            <div className="asignaturas-modal-contenido">
              <Titulo level={2}>Asignar Profesor</Titulo>

              <p className="asignatura-seleccionada">
                {asignaturaSeleccionada?.nombre}
              </p>

              <div className="profesores-grid">
                {profesores.map((profesor) => (
                  <div
                    key={profesor.firebaseuid}
                    className={`profesor-card ${profesorUid === profesor.firebaseuid ? "selected" : ""
                      }`}
                    onClick={() => setProfesorUid(profesor.firebaseuid)}
                  >
                    <div className="profesor-avatar">
                      {profesor.nombre.charAt(0)}
                      {profesor.apellido.charAt(0)}
                    </div>

                    <div className="profesor-info">
                      <h4>
                        {profesor.nombre} {profesor.apellido}
                      </h4>
                      <span>Profesor</span>
                    </div>

                    {profesorUid === profesor.firebaseuid && (
                      <div className="profesor-check">✓</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="asignaturas-modal-acciones">
                <Boton onClick={manejarAsignarProfesor}>Asignar Profesor</Boton>

                <Boton className="boton3-cancelar" onClick={cerrarModalProfesor}>
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

export default GestionAsignaturas;
