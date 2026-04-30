import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
//import { useNavigate } from "react-router-dom";
import "../styles/pages/register.css";


function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const [ error, setError] = useState("");
    const { register, authLoading } = useAuth();

    const manejarRegister = async (e) => {
        e.preventDefault();
        setError("");

        //Validacion antes de llamar a Firebase
        if (password !== confirmPassword){
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length <6){
            setError("La contraseña debe tener 6 o más caracteres")
            return;
        }

        const res = await register(email, password, nombre, apellido);

        if (res.ok){
            console.log("registro correcto");
            //navigate("/perfil"); //Acá le arreglas la ruta cuando termines el perfil
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="login-container"> {/* reutiliza el fondo */}
            <div className="login-card">
                <h2 className="login-titulo">crear cuenta</h2>

                {error && <p className="register-error">{error}</p>}

                <form onSubmit={manejarRegister}>
                    <input
                        type="text"
                        placeholder="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button disabled={authLoading}>
                        {authLoading ? "cargando..." : "registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
