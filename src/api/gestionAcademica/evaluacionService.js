import api from "../axiosConfig";

export const getEvaluaciones = () => 
    api.get("/api/academica/evaluaciones");

export const crearEvaluacion = (data) => 
    api.post("/api/academica/evaluaciones", data);

export const actualizarEvaluacion = (id, data) => 
    api.put(`/api/academica/evaluaciones/${id}`, data);

export const eliminarEvaluacion = (id) => 
    api.delete(`/api/academica/evaluaciones/${id}`);