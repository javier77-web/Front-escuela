import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/organisms/Navbar.css";
import { useAuth } from "../../hooks/useAuth";

function NavBar() {
  const { user, perfil, logout } = useAuth();

  const rutaPanel = perfil?.rol?.nombre
    ? `/panel/${perfil.rol.nombre.trim().toLowerCase()}`
    : "/";

  return (
    <Navbar
      bg="transparent"
      variant="light"
      expand="lg"
      collapseOnSelect
      fixed="top"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-centro">
            <Nav.Link as={Link} to="/" className="nav-boton">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/NuestroColegio" className="nav-boton">
              Nuestro Colegio
            </Nav.Link>

            <Nav.Link as={Link} to="/noticias" className="nav-boton">
              Noticias
            </Nav.Link>

            <Nav.Link as={Link} to="/contacto" className="nav-boton">
              Contacto
            </Nav.Link>
          </Nav>

          <div className="navbar-login">
            {user ? (
              <div className="navbar-user">
                <Link to={rutaPanel} className="btn-login">
                  Mi panel
                </Link>

                <button onClick={logout} className="btn-login">
                  Cerrar Sesion
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                Iniciar Sesion
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;