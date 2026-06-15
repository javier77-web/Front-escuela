import api from "../axiosConfig";

//get
export const getEvaluaciones = () => 
    api.get("/api/academica/evaluaciones");

export const getEvaluacionPorId = (id) =>
    api.get(`/api/academica/evaluaciones/${id}`);

export const getEvaluacionesPorAsignatura = (asignaturaId) =>
    api.get(`/api/academica/evaluaciones/asignatura/${asignaturaId}`);

//post
export const crearEvaluacion = (data) => 
    api.post("/api/academica/evaluaciones", data);

export const actualizarEvaluacion = (id, data) => 
    api.put(`/api/academica/evaluaciones/${id}`, data);

export const eliminarEvaluacion = (id) => 
    api.delete(`/api/academica/evaluaciones/${id}`);