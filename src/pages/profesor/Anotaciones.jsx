import React, { useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/anotaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Input from "../../components/atoms/Input";
import Boton from "../../components/atoms/Boton";
import Spinner from "../../components/atoms/Spinner";
import Texto from "../../components/atoms/Texto";
import AnotacionCard from "../../components/molecules/AnotacionCard";
import useAnotaciones from "../../hooks/profesor/useAnotaciones";
import useUsuariosCurso from "../../hooks/useUsuariosCurso";

const getTipoBadge = (tipo) => (tipo === "positiva" ? "success" : "danger");

function AnotacionesProfesor() {
  const { id } = useParams();
  const { anotaciones, agregarAnotacion, guardando, error } = useAnotaciones(id);

  const location = useLocation();
  const navigate = useNavigate();
  const nombreAsignatura = location.state?.nombre ?? `Asignatura ${id}`;
  const cursoId = location.state?.cursoId;
  const { alumnos, loading: cargandoAlumnos } = useUsuariosCurso(cursoId);
  const [form, setForm] = useState({
    alumno: "",
    tipo: "positiva",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.alumno || !form.descripcion) return;
    agregarAnotacion(form);
    setForm((prev) => ({
      alumno: "",
      tipo: "positiva",
      descripcion: "",
      fecha: prev.fecha,
    }));
  };

  return (
    <PanelLayout rol="profesor">
      <div className="anotaciones-profesor-container">
        <div className="anotaciones-header">
          <Titulo level={1}>anotaciones asignatura {nombreAsignatura}</Titulo>
        </div>

        {/* formulario de anotaciones */}
        <div className="form-anotacion">
          {cargandoAlumnos ? (
            <Spinner texto="cargando alumnos..." />
          ) : (
            <select name="alumno" value={form.alumno} onChange={handleChange}>
              <option value="">seleccionar alumno</option>
              {alumnos.map((a) => (
                <option key={a.firebaseuid} value={a.firebaseuid}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>
          )}

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
            placeholder="descripción"
            value={form.descripcion}
            onChange={handleChange}
          />

          <Boton onClick={handleSubmit} disabled={guardando}>
            {guardando ? "guardando..." : "guardar anotación"}
          </Boton>
        </div>

        {error && <Texto color="danger">{error}</Texto>}

        {/* lista anotaciones */}
        <div className="lista-anotaciones">
          {anotaciones.length === 0 ? (
            <Texto color="muted">no hay anotaciones registradas aún</Texto>
          ) : (
            anotaciones.map((a) => (
              <AnotacionCard
                key={a.id ?? a.id_anotacion}
                vista="profesor"
                tipo={a.tipo}
                alumno={a.alumno ?? a.usuario_receptor}
                descripcion={a.descripcion}
                fecha={a.fecha}
                getTipoBadge={getTipoBadge}
              />
            ))
          )}
        </div>
        {/* BOTÓN VOLVER */}
        <button onClick={() => navigate(-1)} className="btn-volver">
           volver
        </button>
      </div>
    </PanelLayout>
  );
}

export default AnotacionesProfesor;