import api from "../axiosConfig";

export const getCurso = () => 
    api.get("/api/academica/cursos");

export const crearCurso = (data) => 
    api.post("/api/academica/cursos", data);

export const actualizarCurso = (id, data) => 
    api.put(`/api/academica/cursos/${id}`, data);

export const eliminarCurso = (id) => 
    api.delete(`/api/academica/cursos/${id}`);