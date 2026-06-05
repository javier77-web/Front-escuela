import api from "../axiosConfig";

export const getAnotaciones = () => 
    api.get("/api/academica/anotaciones");

export const crearAnotacion = (data) => 
    api.post("/api/academica/anotaciones", data);

export const actualizarAnotacion = (id, data) => 
    api.put(`/api/academica/anotaciones/${id}`, data);

export const eliminarAnotacion = (id) => 
    api.delete(`/api/academica/anotaciones/${id}`);


//las rutas ya estan definidas en el backend, falta terminar de implementar el backend para que funcionen
//En el back solo se expone en este caso anotaciones, el gateway enruta con "api/academica"