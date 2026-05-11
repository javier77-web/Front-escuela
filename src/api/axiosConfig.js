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
    const unsub = auth.onAuthStateChanged((u) =>{
      unsub(u); //desuscribimos al usuario inmediatamente
      if(u){
        u.getIdToken(false).then(resolve).catch(() => resolve(null));
      } else {
        resolve(null); // usuario genuinamente no autenticado
      }
    });
  });
};

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log("Token", token ? `${token.substring(0, 20)}...` : "VACÍO");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
