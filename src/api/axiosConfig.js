import axios from "axios";
import {auth} from "../firebaseConfig/config";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

//Para que las consultas sean válidas deben portar siempre el token
//Entonces creamos un interceptor para cargarlo en cada consultas

api.interceptors.request.use(async (config) =>{
    if(!auth.currentUser){
        //Promise es una promesa (xd) de que algo va a pasar
        //eso que pasa es el resolve (el current user que está cargando, es pa que no tire error por si otras partes cargan antes)
        await new Promise((resolve) =>{
            //unsub unsubscribe
            const unsub = auth.onAuthStateChanged((u) => {unsub(); resolve(u);});
        });
    }
    const token = await auth.currentUser?.getIdToken();

    //log de control del token obtenido
    // Agrega esto temporalmente para diagnosticar
    console.log("Token en interceptor:", token ? `${token.substring(0, 20)}...` : "VACÍO");

    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;