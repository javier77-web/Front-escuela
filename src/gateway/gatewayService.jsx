import api from "../api/axiosConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authSecundaria } from "../firebaseConfig/config";

// Esta función es para registrar en PostgreSQL el usuario creado copn firebase por el admin
// Usa el token directo de firebaseUser porque auth.currentUser
// todavía no está disponible en el interceptor
export const syncUserWithBackend = async (firebaseUser, nombre, apellido, idRol) => {
    const idToken = await firebaseUser.getIdToken(true);

    //Log paara comprobar que se captura el token
    console.log("Token para sync:", idToken ? "presente" : "vacío")

    const {data} = await api.post(`/api/usuarios/usuarios`, {
        firebaseuid: firebaseUser.uid,
        nombre,
        apellido,
        idRol
    }, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    });
    return data;
};

//Register llega acá porque generaba conflicto al contexto del usuario activo
//Lo logico es llevar el metodo a donde corresponde
//En nuestro contexto el metodo register de firebase el es crear usuario tipo
export const crearUsuarioAdmin = async (email, password, nombre, apellido, idRol) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
        authSecundaria,
        email,
        password,
        );
        const firebaseUser = userCredential.user;

        await new Promise((resolve) => setTimeout(resolve, 500));
        await syncUserWithBackend(firebaseUser, nombre, apellido, idRol);
        await signOut(authSecundaria);

        return { ok: true };
    } catch (error) {
    // asegura cerrar la sesión secundaria aunque falle
        return {
        ok: false,
        message: error.message?.includes("email-already-in-use")
            ? "El correo ya está registrado"
            : error.message || "Error al crear cuenta",
        };
    }
};