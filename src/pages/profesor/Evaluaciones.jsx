import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../styles/pages/profesor/evaluaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Input from "../../components/atoms/Input";
import Boton from "../../components/atoms/Boton";
import Spinner from "../../components/atoms/Spinner";
import EvaluacionCard from "../../components/molecules/profesor/EvaluacionCard";
import useEvaluacionesProfesor from "../../hooks/profesor/useEvaluaciones";

function EvaluacionesProfesor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const nombreAsignatura = location.state?.nombre ?? `Asignatura ${id}`;

  // Se pasa id al hook para que cargue y cree evaluaciones en la asignatura correcta
  const {
    evaluaciones,
    loading,
    error,
    form,
    handleChange,
    agregarEvaluacion,
    getTipoBadge,
  } = useEvaluacionesProfesor(id);

  return (
    <PanelLayout rol="profesor">
      <div className="evaluaciones-container">
        {/* HEADER */}
        <div className="evaluaciones-header">
          <Titulo level={1}>Evaluaciones asignatura {nombreAsignatura}</Titulo>
          <Texto color="muted">Crea y gestiona las evaluaciones del curso</Texto>
        </div>

        {/* FORMULARIO NUEVA EVALUACIÓN */}
        <div className="form-evaluacion">
          <Input
            name="titulo"
            placeholder="título (ej: prueba 1)"
            value={form.titulo}
            onChange={handleChange}
          />

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="select"
          >
            <option value="prueba">Prueba</option>
            <option value="control">Control</option>
            <option value="trabajo">Trabajo</option>
          </select>

          <Input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <Boton onClick={agregarEvaluacion} disabled={loading}>
            Crear una nueva evaluación
          </Boton>
        </div>

        {error && <Texto color="danger">{error}</Texto>}

        {/* LISTA */}
        {loading ? (
          <Spinner texto="cargando evaluaciones..." />
        ) : evaluaciones.length === 0 ? (
          <Texto color="muted">No hay evaluaciones registradas aún</Texto>
        ) : (
          <div className="lista-evaluaciones">
            {evaluaciones.map((e) => (
              <EvaluacionCard
                key={e.id_evaluacion ?? e.id}
                titulo={e.titulo}
                tipo={e.tipo}
                fecha={e.fecha}
                getTipoBadge={getTipoBadge}
              />
            ))}
          </div>
        )}
        {/* BOTÓN VOLVER */}
        <button onClick={() => navigate(-1)} className="btn-volver">
          Volver
        </button>
      </div>
    </PanelLayout>
  );
}

export default EvaluacionesProfesor;
