import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword, //Crea usuario con email y pass: metodo especifico hay mas metodos auth
  signInWithEmailAndPassword, //iniciar sesion
  signOut, //cerrar sesion
  onAuthStateChanged,
} from "firebase/auth"; //funciones especificas de firebase, salen en la documentación que envié
import { auth } from "../firebaseConfig/config";
//import { syncUserWithBackend } from '../gateway/gatewayService';
const API_URL = import.meta.env.VITE_API_URL;

//se crea el espacio para compartir datos, yo lo entiendo como el contexto del user
const AuthContext = createContext();
//Acá establezco el proveedor de los estados de la auth
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  //useEffect, por como lo entiendo funciona como una interacción en pantalla, al estar vacío reacciona al momento de ser llamado
  useEffect(() => {
    //onAuthChanged es la función que sirve para los cambios en la sesion
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      //Se utiliza el metodo auth de firebase y se crea el user y sus credenciales
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      //prueba en localhost (sincronización de front y el gateway)
      const idToken = await firebaseUser.getIdToken();
      const res = await fetch(`${API_URL}/test/token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Gateway respondió:", data);
      // Si ves esto en consola, el front llegó al gateway correctamente

      // Sincroniza con el backend para crear el perfil en PostgreSQL
       //await syncUserWithBackend(firebaseUser, nombre, apellido);

      setAuthLoading(false);
      return { ok: true, user: firebaseUser };
    } catch (error) {
      setAuthLoading(false);
      return {
        ok: false,
        message: error.message?.includes("email-already-in-use")
          ? "El correo ya está registrado"
          : error.message || "Error al crear cuenta",
      };
    }
  };

  //Metodo inicio sesión
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      //variable con los datos del usuario
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setAuthLoading(false);
      //Respuesta de firebase
      return { ok: true, user: userCredential.user };
      //Manejo del error
    } catch (error) {
      setAuthLoading(false);
      return {
        ok: false,
        message:
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
            ? "Correo o contraseña incorrectos"
            : error.message || "Error al iniciar sesión",
      };
    }
  };

  //función de cerrar sesión
  const logout = async () => {
    await signOut(auth);
  };

  //Se em paquetan todos los datos del usuario en una sola variable
  const value = {
    user,
    login,
    register,
    logout,
    authLoading,
    isAuthenticated: !!user, //los !! convierten el user a boolean, sirve para manejar auth
  };

  return (
    // AuthContext.Provider es el componente que "envuelve" a los demás metodos de firebase (children).
    //todos los datos del value (info users) quedará guardada en su context correpsondiente
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
