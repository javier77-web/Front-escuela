import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/profesor/evaluaciones.css";

function EvaluacionesProfesor() {
  const { id } = useParams(); // id de asignatura

  const [evaluaciones, setEvaluaciones] = useState([]);

  const [form, setForm] = useState({
    titulo: "",
    tipo: "prueba",
    fecha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarEvaluacion = () => {
    if (!form.titulo || !form.fecha) return;

    setEvaluaciones([
      ...evaluaciones,
      {
        ...form,
        id: Date.now(),
      },
    ]);

    setForm({
      titulo: "",
      tipo: "prueba",
      fecha: "",
    });
  };

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        <div className="evaluaciones-container">
          <h1>evaluaciones asignatura {id}</h1>

          {/* FORM */}
          <div className="form-evaluacion">
            <input
              name="titulo"
              placeholder="titulo (ej: prueba 1)"
              value={form.titulo}
              onChange={handleChange}
            />

            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="prueba">prueba</option>
              <option value="control">control</option>
              <option value="trabajo">trabajo</option>
            </select>

            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />

            <button onClick={agregarEvaluacion}>crear evaluacion</button>
          </div>

          {/* LISTA */}
          <div className="lista-evaluaciones">
            {evaluaciones.map((e) => (
              <div key={e.id} className="card-evaluacion">
                <h3>{e.titulo}</h3>
                <p>{e.tipo}</p>
                <span>{e.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluacionesProfesor;
