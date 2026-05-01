import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
//import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";

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

    if (res.ok) {
      console.log("login correcto");
      
      navegar("/"); // redirige al home
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">iniciar sesion</h2>

        <form onSubmit={manejarLogin}>
          <input
            type="email"
            placeholder="correo"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={authLoading}>
            {authLoading ? "cargando..." : "ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
