import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/profesor/anotaciones.css";

function AnotacionesProfesor() {
  const { id } = useParams();

  // lista de alumnos (simulada por curso)
  const alumnos = ["juan", "maria", "pedro"];

  const [anotaciones, setAnotaciones] = useState([]);

  const [form, setForm] = useState({
    alumno: "",
    tipo: "positiva",
    descripcion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarAnotacion = () => {
    if (!form.alumno || !form.descripcion) return;

    setAnotaciones([
      ...anotaciones,
      {
        ...form,
        fecha: new Date().toISOString().split("T")[0],
      },
    ]);

    // limpiar form
    setForm({
      alumno: "",
      tipo: "positiva",
      descripcion: "",
    });
  };

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        {/* 👇 contenedor propio */}
        <div className="anotaciones-profesor-container">
          <h1>anotaciones curso {id}</h1>

          {/* FORMULARIO */}
          <div className="form-anotacion">
            <select name="alumno" value={form.alumno} onChange={handleChange}>
              <option value="">seleccionar alumno</option>
              {alumnos.map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="positiva">positiva</option>
              <option value="negativa">negativa</option>
            </select>

            <textarea
              name="descripcion"
              placeholder="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />

            <button onClick={agregarAnotacion}>guardar anotacion</button>
          </div>

          {/* LISTA */}
          <div className="lista-anotaciones">
            {anotaciones.map((a, i) => (
              <div key={i} className={`card ${a.tipo}`}>
                <h3>{a.alumno}</h3>
                <p>{a.descripcion}</p>
                <span>{a.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnotacionesProfesor;
