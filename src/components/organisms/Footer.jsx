import React from "react";
import "../../styles/organisms/Footer.css";
import { Link } from "react-router-dom";

// datos de redes sociales
const redes = [
  { nombre: "instagram", url: "#", icono: "fab fa-instagram" },
  { nombre: "youtube", url: "#", icono: "fab fa-youtube" },
  { nombre: "facebook", url: "#", icono: "fab fa-facebook-f" },
  {
    nombre: "gmail",
    url: "mailto:contacto@colegio.cl",
    icono: "fas fa-envelope",
  },
];

// datos de navegacion
const navegacion = [
  { nombre: "inicio", ruta: "/" },
  { nombre: "nuestro colegio", ruta: "/NuestroColegio" },
  { nombre: "noticias", ruta: "/noticias" },
  { nombre: "contacto", ruta: "/contacto" },
];

function Footer() {
  return (
    <footer className="footer">
      {/* redes arriba */}
      <div className="redes-superior">
        <h4>redes sociales</h4>

        <div className="iconos-redes">
          {redes.map((red) => (
            <a key={red.nombre} href={red.url}>
              <i className={red.icono}></i>
            </a>
          ))}
        </div>
      </div>

      {/* contenedor central */}
      <div className="footer-centro">
        {/* links centrados abajo */}
        <div className="footer-links">
          {navegacion.map((item) => (
            <Link key={item.nombre} to={item.ruta}>
              {item.nombre}
            </Link>
          ))}
        </div>
      </div>

      {/* copy */}
      <div className="footer-copy">© 2026 sistema academico</div>
    </footer>
  );
}

export default Footer;
