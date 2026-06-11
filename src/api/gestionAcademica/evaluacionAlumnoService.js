import api from "../axiosConfig";

export const getEvaluacionAlumnos = () => 
    api.get("/api/academica/evaluacionalumnos");

export const getEvaluacionAlumnoPorId = (id) =>
    api.get(`/api/academica/evaluacionalumnos/${id}`);

export const crearEvaluacionAlumno = (data) => 
    api.post("/api/academica/evaluacionalumnos", data);

export const actualizarEvaluacionAlumno = (id, data) => 
    api.put(`/api/academica/evaluacionalumnos/${id}`, data);

export const eliminarEvaluacionAlumno = (id) => 
    api.delete(`/api/academica/evaluacionalumnos/${id}`);