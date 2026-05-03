import React from "react";
import useFormulario from "../hooks/useFormulario";
import { validarContacto } from "../hooks/validaciones/validarContacto";
import "../styles/pages/contacto.css";
import Input from "../components/atoms/Input";
import Boton from "../components/atoms/Boton";
import Titulo from "../components/atoms/Titulo";

function Contacto() {
  const { valores, errores, manejarCambio, manejarSubmit } = useFormulario(
    { nombre: "", correo: "", mensaje: "" },
    validarContacto,
  );

  const enviar = () => {
    console.log("form correcto", valores);
  };

  return (
    <div className="contacto-container">
      {/* titulo */}
      <Titulo level={1}>contacto</Titulo>

      <div className="contacto-contenido">
        {/* formulario */}
        <form className="contacto-form" onSubmit={manejarSubmit(enviar)}>
          <Input
            name="nombre"
            placeholder="nombre"
            value={valores.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
          />

          <Input
            name="correo"
            placeholder="correo"
            value={valores.correo}
            onChange={manejarCambio}
            error={errores.correo}
          />

          <Input
            name="mensaje"
            placeholder="mensaje"
            value={valores.mensaje}
            onChange={manejarCambio}
            error={errores.mensaje}
          />

          <Boton type="submit" variant="primary">
            enviar
          </Boton>
        </form>

        {/* info lateral */}
        <div className="contacto-info">
          <h3>informacion</h3>
          <p>santiago, chile</p>
          <p>+56 9 1234 5678</p>
          <p>contacto@colegio.cl</p>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
