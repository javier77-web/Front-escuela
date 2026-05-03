import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/organisms/Navbar.css";
import useHora from "../../hooks/useHora";
import { useAuth } from "../../hooks/useAuth";

function NavBar() {
  const hora = useHora();
  const { user, logout } = useAuth();

  return (
    <Navbar bg="transparent" variant="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          {/* hora */}
          <div className="navbar-izquierda">
            <span className="hora-navbar">{hora}</span>
          </div>

          {/* CENTRADO */}
          <Nav className="navbar-centro">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/NuestroColegio">
              Nuestro Colegio
            </Nav.Link>
            <Nav.Link as={Link} to="/noticias">
              Noticias
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          {/* derecha */}
          <div className="navbar-login">
            {user ? (
              <div className="navbar-user">
                {/* boton panel */}
                <Link to="/panel/alumno" className="btn-login">
                  mi panel
                </Link>
                {/*
                <Link to="/panel/{rol}" className="btn-login">
                */}

                {/* logout */}
                <button onClick={logout} className="btn-login">
                  cerrar sesion
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                iniciar sesion
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
