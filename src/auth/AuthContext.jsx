import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig/config";
import { getUsuarioPorUid } from "../api/gestionUsuario/usuariosApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [perfilLoading, setPerfilLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Obtiene el perfil del usuario desde PostgreSQL usando axios
  const obtenerPerfil = async (firebaseUser) => {
    setPerfilLoading(true);
    try {
      const { data } = await getUsuarioPorUid(firebaseUser.uid);
      setPerfil(data);
      return data;
    } catch (error) {
      console.error(
        "obtenerPerfil falló:", error,
        error.response?.status,
        error.message,
      );
      setPerfil(null);
      return null;
    } finally {
      setPerfilLoading(false);
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
      const credential = await signInWithEmailAndPassword(auth, email, password);
      // Carga el perfil de inmediato para poder leer el rol en Login.jsx
      // onAuthStateChanged también lo cargará, pero puede llegar tarde para la redirección
      const perfilObtenido = await obtenerPerfil(credential.user);
      return { ok: true, perfil: perfilObtenido };
    } catch (error) {
      return {
        ok: false,
        message:
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
            ? "Correo o contraseña incorrectos"
            : error.message || "Error al iniciar sesión",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setPerfil(null);
  };

  const value = {
    user,
    perfil,
    loading,
    perfilLoading,
    authLoading,
    login,
    logout,
    obtenerPerfil,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
