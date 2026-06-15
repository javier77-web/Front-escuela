import api from "../axiosConfig";

export const getAnotaciones = () => 
    api.get("/api/academica/anotaciones");

//Metodo get anotaciones por alumno
export const getAnotacionesPorUsuario = (uid) =>
    api.get(`/api/academica/anotaciones/usuario/${uid}`);

// data: { descripcion, fecha, usuario_receptor }
export const crearAnotacion = (data) => 
    api.post("/api/academica/anotaciones", data);

export const actualizarAnotacion = (id, data) => 
    api.put(`/api/academica/anotaciones/${id}`, data);

export const eliminarAnotacion = (id) => 
    api.delete(`/api/academica/anotaciones/${id}`);
