import api from "../axiosConfig";

export const getAsignaturaPorId = (id) =>
    api.get(`/api/academica/Asignaturas/${id}`);

// Este endpoint/ruta está pendiente. Hay que terminar api en node para seguir aplicando asistencia
export const getAlumnosPorAsignatura = (idAsignatura) =>
    api.get(`/api/academica/asignaturas/${idAsignatura}/alumnos`);