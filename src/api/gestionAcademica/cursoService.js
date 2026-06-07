import api from "../axiosConfig";

export const getCursos = () => 
    api.get("/api/academica/cursos");

export const getCursoPorId = (id) =>
    api.get(`/api/academica/cursos/${id}`);

export const crearCurso = (data) => 
    api.post("/api/academica/cursos", data);

export const actualizarCurso = (id, data) => 
    api.put(`/api/academica/cursos/${id}`, data);

export const eliminarCurso = (id) => 
    api.delete(`/api/academica/cursos/${id}`);