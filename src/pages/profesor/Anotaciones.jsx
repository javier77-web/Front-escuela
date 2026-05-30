import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/anotaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Input from "../../components/atoms/Input";
import Boton from "../../components/atoms/Boton";
import AnotacionCard from "../../components/molecules/AnotacionCard";
import useAnotaciones from "../../hooks/profesor/useAnotaciones";

// Luego reemplazar por fetch a /api/academica/asignaturas/:id/alumnos
const ALUMNOS_MOCK = ["juan", "maria", "pedro"];

const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

function AnotacionesProfesor() {
  const { id } = useParams();
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
    setForm({ alumno: "", tipo: "positiva", descripcion: "", fecha: form.fecha });
  };

  return (
    <PanelLayout rol="profesor">
      <div className="anotaciones-profesor-container">
        <div className="anotaciones-header">
          <Titulo level={1}>anotaciones curso {id}</Titulo>
        </div>

        <div className="form-anotacion">
          <select name="alumno" value={form.alumno} onChange={handleChange}>
            <option value="">seleccionar alumno</option>
            {ALUMNOS_MOCK.map((a) => (
              <option key={a} value={a}>{a}</option>
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
            name="descripcion"
            placeholder="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />

          <Boton onClick={handleSubmit}>guardar anotacion</Boton>
        </div>

        <div className="lista-anotaciones">
          {anotaciones.map((a) => (
            <AnotacionCard
              key={a.id}
              vista="profesor"
              tipo={a.tipo}
              alumno={a.alumno}
              descripcion={a.descripcion}
              fecha={a.fecha}
              getTipoBadge={getTipoBadge}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AnotacionesProfesor;