import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/anotaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Input from "../../components/atoms/Input";
import Badge from "../../components/atoms/Badge";
import useAnotaciones from "../../hooks/profesor/useAnotaciones";

function AnotacionesProfesor() {
  const { id } = useParams();

  const alumnos = ["juan", "maria", "pedro"];

  const { anotaciones, agregarAnotacion } = useAnotaciones();

  const [form, setForm] = useState({
    alumno: "",
    tipo: "positiva",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    agregarAnotacion(form);

    setForm({
      alumno: "",
      tipo: "positiva",
      descripcion: "",
      fecha: form.fecha,
    });
  };

  return (
    <PanelLayout rol="profesor">
      <div className="anotaciones-profesor-container">
        <Titulo level={1}>anotaciones curso {id}</Titulo>

        {/* FORM */}
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

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="input-fecha"
          />

          <Input
            as="textarea"
            name="descripcion"
            placeholder="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />

          <Boton onClick={handleSubmit}>guardar anotacion</Boton>
        </div>

        {/* LISTA */}
        <div className="lista-anotaciones">
          {anotaciones.map((a) => (
            <div key={a.id} className={`card ${a.tipo}`}>
              <div className="card-top">
                <Badge
                  texto={a.tipo}
                  tipo={a.tipo === "positiva" ? "success" : "danger"}
                />

                <Texto>{a.alumno}</Texto>
              </div>

              <Texto>{a.descripcion}</Texto>

              <Texto size="sm" color="muted">
                {a.fecha}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AnotacionesProfesor;
