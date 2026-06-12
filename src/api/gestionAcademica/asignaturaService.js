import api from "../axiosConfig";

export const getAsignaturas = () =>
    api.get("/api/academica/asignaturas");

export const getAsignaturaPorId = (id) =>
    api.get(`/api/academica/asignaturas/${id}`);

export const getAsignaturasPorCurso = (cursoId) =>
    api.get(`/api/academica/cursos/${cursoId}/asignaturas`);

// data: { nombre, curso_id }
export const crearAsignatura = (data) =>
    api.post("/api/academica/asignaturas", data);

export const actualizarAsignatura = (id, data) =>
    api.put(`/api/academica/asignaturas/${id}`, data);

export const eliminarAsignatura = (id) =>
    api.delete(`/api/academica/asignaturas/${id}`);

// Asignar varios cursos a una asignatura
export const asignarCursosAsignatura = (id, cursoIds) =>
    api.put(`/api/academica/asignaturas/${id}/cursos`, { cursoIds });

export const getAsignaturasProfesor = (uid) =>
  api.get(`/api/academica/asignaturas/profesor/${uid}`);