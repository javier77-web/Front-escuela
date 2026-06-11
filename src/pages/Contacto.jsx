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
            placeholder="Nombre"
            value={valores.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
          />

          <Input
            name="correo"
            placeholder="Correo"
            value={valores.correo}
            onChange={manejarCambio}
            error={errores.correo}
          />

          <Input
            name="mensaje"
            placeholder="Mensaje"
            value={valores.mensaje}
            onChange={manejarCambio}
            error={errores.mensaje}
          />

          <Boton type="submit" variant="primary">
            Enviar
          </Boton>
        </form>

        {/* info lateral */}
        <div className="contacto-info">
          <h3>Informacion</h3>
          <p> Santiago, Chile </p>
          <p>+56 9 9087 5678</p>
          <p>Contacto@colegio.cl</p>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
