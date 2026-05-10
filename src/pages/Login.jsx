import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import Input from "../components/atoms/Input";
import Boton from "../components/atoms/Boton";
import Spinner from "../components/atoms/Spinner";

function Login() {
  // estados para inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funciones de auth
  const { login, authLoading } = useAuth();

  // hook para redireccionar
  const navegar = useNavigate();

  // funcion login
  const manejarLogin = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    //lee el rol del perfil que ya devuelve login()
    if (res.ok) {
      const rol = res.perfil?.rol?.nombre?.trim().toLowerCase();

      if (rol === "admin") navegar("/panel/admin");
      else if (rol === "alumno") navegar("/panel/alumno");
      else if (rol === "profesor") navegar("/panel/profesor");
      else navegar("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">iniciar sesion</h2>

        <form onSubmit={manejarLogin}>
          <Input
            type="email"
            name="email"
            placeholder="correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            name="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {authLoading ? (
            <Spinner texto="ingresando..." />
          ) : (
            <Boton type="submit" variant="primary">
              ingresar
            </Boton>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
