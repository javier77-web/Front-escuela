import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, authSecundaria } from "../firebaseConfig/config";
import { getUsuarioPorUid } from "../api/usuariosApi";
import { syncUserWithBackend } from "../gateway/gatewayService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Obtiene el perfil del usuario desde PostgreSQL usando axios
  const obtenerPerfil = async (firebaseUser) => {
    try {
      const { data } = await getUsuarioPorUid(firebaseUser.uid);
      setPerfil(data);
      return data;
    } catch (error) {
      console.error("Error al obtener perfil:", error.message);
      setPerfil(null);
      return null;
    }
  };

  // Escucha cambios de sesión de Firebase
  // Si hay usuario activo, también carga su perfil desde la BD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await obtenerPerfil(currentUser);
      } else {
        setPerfil(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      // Carga el perfil inmediatamente después del login
      const perfilData = await obtenerPerfil(firebaseUser);

      setAuthLoading(false);
      return { ok: true, user: firebaseUser, perfil: perfilData };
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

  const register = async (email, password, nombre, apellido, idRol) => {
    setAuthLoading(true);
    try {
      // usa la instancia secundaria, no toca la sesión del admin
      const userCredential = await createUserWithEmailAndPassword(
        authSecundaria, // 
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      await new Promise((resolve) => setTimeout(resolve, 500));
      await syncUserWithBackend(firebaseUser, nombre, apellido, idRol);

      // cierra sesión solo en la instancia secundaria
      await signOut(authSecundaria);

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

  const logout = async () => {
    await signOut(auth);
    setPerfil(null); // limpia el perfil al cerrar sesión
  };

  const value = {
    user,
    perfil, // ← ahora disponible en toda la app
    login,
    register,
    logout,
    authLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
