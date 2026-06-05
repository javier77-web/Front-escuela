import api from "../axiosConfig";

export const getAsignaturaPorId = (id) =>
    api.get(`/api/academica/Asignaturas/${id}`);

// Este endpoint/ruta está pendiente. Hay que terminar api en node para seguir aplicando asistencia
export const getAlumnosPorAsignatura = (idAsignatura) =>
    api.get(`/api/academica/asignaturas/${idAsignatura}/alumnos`);

export const getAsignaturas = () => 
    api.get("/api/academica/asignaturas");

export const crearAsignatura = (data) => 
    api.post("/api/academica/asignaturas", data);

export const actualizarAsignatura = (id, data) => 
    api.put(`/api/academica/asignaturas/${id}`, data);

export const eliminarAsignatura = (id) => 
    api.delete(`/api/academica/asignaturas/${id}`);