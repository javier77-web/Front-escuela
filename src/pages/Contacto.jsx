import React from "react";
import useFormulario from "../hooks/useFormulario";
import { validarContacto } from "../hooks/validaciones/validarContacto";
import "../styles/pages/contacto.css";

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
      <h1 className="contacto-titulo">contacto</h1>

      <div className="contacto-contenido">
        {/* formulario */}
        <form className="contacto-form" onSubmit={manejarSubmit(enviar)}>
          <input
            name="nombre"
            placeholder="nombre"
            value={valores.nombre}
            onChange={manejarCambio}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          <input
            name="correo"
            placeholder="correo"
            value={valores.correo}
            onChange={manejarCambio}
          />
          {errores.correo && <p className="error">{errores.correo}</p>}

          <textarea
            name="mensaje"
            placeholder="mensaje"
            value={valores.mensaje}
            onChange={manejarCambio}
          />
          {errores.mensaje && <p className="error">{errores.mensaje}</p>}

          <button>enviar</button>
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
