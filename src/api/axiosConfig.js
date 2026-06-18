import axios from "axios";
import { auth } from "../firebaseConfig/config";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Hay problemas cuando del inicio intentamos volver al panel
const getToken = () => {
  return new Promise((resolve) => {
    //si hay usuario activo devuelve token directo
    if (auth.currentUser){
      auth.currentUser
        .getIdToken(false) //false porque usa caché, no forzamos un refresh en cada request
        .then(resolve)
        .catch(() => resolve(null));
      return;
    }

    //Firebase aún no termina de inicializar - hay que esperar
    const unsub = auth.onAuthStateChanged((u) => {
      unsub(); // ← antes era unsub(u), eso pasaba el usuario como argumento a la función de desuscripción
      if (u) {
        u.getIdToken(false).then(resolve).catch(() => resolve(null));
      } else {
        resolve(null);
      }
    });
  });
};

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    return Promise.reject(new axios.CanceledError("Sin token de autenticación"));
  }
  return config;
});

export default api;
