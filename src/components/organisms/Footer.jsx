import React from "react";
import "../../styles/organisms/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* CONTENIDO PRINCIPAL */}
      <div className="footer-grid">
        {/* LOGO */}
        <div>
          <h2 className="logo">Sistema Académico</h2>
          <p>Gestión moderna de clases y estudiantes.</p>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h4>Navegación</h4>
          <a href="/">Inicio</a>
          <a href="/cursos">Cursos</a>
          <a href="/contacto">Contacto</a>
        </div>

        {/* INFORMACIÓN */}
        <div>
          <h4>Información</h4>
          <a href="#">Sobre nosotros</a>
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>

        {/* CONTACTO */}
        <div>
          <h4>Contacto</h4>

          {/* Ubicación */}
          <a
            href="https://www.google.com/maps?q=Santiago+Chile"
            target="_blank"
            rel="noopener noreferrer"
            className="ubicacion"
          >
            📍 Santiago, Chile
          </a>

          {/* Input tipo newsletter */}
          <div className="input-contacto">
            <input type="email" placeholder="tu@email.com" />
            <button>➤</button>
          </div>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="footer-bottom">
        <div className="redes">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>

        <p>© 2026 Sistema Académico</p>
      </div>
    </footer>
  );
}

export default Footer;
