import axios from "axios";
import { auth } from "../firebaseConfig/config";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  // Espera a que Firebase tenga un usuario con token fresco
  const token = await new Promise((resolve) => {
    // Si ya hay usuario, fuerza refresh del token para asegurar que es válido
    if (auth.currentUser) {
      auth.currentUser
        .getIdToken(true) // true = fuerza refresh
        .then(resolve)
        .catch(() => resolve(null));
      return;
    }
    // Si no hay usuario todavía, espera el primer cambio de estado
    const unsub = auth.onAuthStateChanged((u) => {
      unsub();
      if (u) {
        u.getIdToken(true)
          .then(resolve)
          .catch(() => resolve(null));
      } else {
        resolve(null);
      }
    });
  });

  console.log("Token:", token ? `${token.substring(0, 20)}...` : "VACÍO");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
