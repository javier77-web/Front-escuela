import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/organisms/Navbar.css";
import useHora from "../../hooks/useHora";

function NavBar() {
  const hora = useHora();

  return (
    <Navbar bg="transparent" variant="light" expand="lg">
      <Container>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* IZQUIERDA: hora */}
          <div className="navbar-izquierda">
            <span className="hora-navbar">
              {hora}
            </span>
          </div>

          {/* CENTRADO */}
          <Nav className="navbar-centro">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/colegio">Nuestro Colegio</Nav.Link>
            <Nav.Link as={Link} to="/noticias">Noticias</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* LOGIN */}
          <div className="navbar-login">
            <Link to="/login" className="btn-login">
              Iniciar sesión
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
