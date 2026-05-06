import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/evaluaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Input from "../../components/atoms/Input";
import Boton from "../../components/atoms/Boton";
import Badge from "../../components/atoms/Badge";
import useEvaluacionesProfesor from "../../hooks/profesor/useEvaluaciones";

function EvaluacionesProfesor() {
  const { id } = useParams();

  const { evaluaciones, form, handleChange, agregarEvaluacion, getTipoBadge } = useEvaluacionesProfesor();

  return (
    <PanelLayout rol="profesor">
      <div className="evaluaciones-container">
        {/* HEADER */}
        <div className="evaluaciones-header">
          <Titulo level={1}>evaluaciones asignatura {id}</Titulo>
          <Texto color="muted">
            crea y gestiona las evaluaciones del curso
          </Texto>
        </div>

        {/* FORM */}
        <div className="form-evaluacion">
          <Input
            name="titulo"
            placeholder="titulo (ej: prueba 1)"
            value={form.titulo}
            onChange={handleChange}
          />

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="select"
          >
            <option value="prueba">prueba</option>
            <option value="control">control</option>
            <option value="trabajo">trabajo</option>
          </select>

          <Input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <Boton onClick={agregarEvaluacion}>crear evaluación</Boton>
        </div>

        {/* LISTA */}
        <div className="lista-evaluaciones">
          {evaluaciones.map((e) => (
            <div key={e.id} className="card-evaluacion">
              <div className="card-header">
                <Titulo level={3}>{e.titulo}</Titulo>

                <Badge texto={e.tipo} tipo={getTipoBadge(e.tipo)} />
              </div>

              <Texto size="sm" color="muted">
                fecha: {e.fecha}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default EvaluacionesProfesor;
