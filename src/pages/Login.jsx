import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import Input from "../components/atoms/Input";
import Boton from "../components/atoms/Boton";
import Spinner from "../components/atoms/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // NUEVO

  const { login, authLoading } = useAuth();
  const navegar = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // NUEVO
    const res = await login(email, password);

    if (res.ok) {
      const rol = res.perfil?.rol?.nombre?.trim().toLowerCase();
      if (rol === "admin") navegar("/panel/admin");
      else if (rol === "alumno") navegar("/panel/alumno");
      else if (rol === "profesor") navegar("/panel/profesor");
      else navegar("/");
    } else {
      setErrorMsg(res.message); // NUEVO
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Iniciar Sesion</h2>

        <form onSubmit={manejarLogin}>
          <Input type="email" name="email" placeholder="Correo"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <Input type="password" name="password" placeholder="Contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* NUEVO — mensaje de error visible */}
          {errorMsg && (
            <p style={{ color: "red", fontSize: "0.875rem", marginTop: "8px" }}>
              {errorMsg}
            </p>
          )}

          {authLoading ? (
            <Spinner texto="Ingresando..." />
          ) : (
            <Boton type="submit" variant="primary">Ingresar</Boton>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
