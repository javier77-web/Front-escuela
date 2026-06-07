import api from "../axiosConfig";


// Devuelve AsistenciaUsuarioResponseDto: { firebaseuid, totalRegistros, asistencias[] }
export const getAsistenciasUsuario = (firebaseuid) =>
    api.get(`/api/usuarios/asistencias/usuario/${firebaseuid}`);

export const getAsistenciasPorFecha = (fecha) =>
    api.get(`/api/usuarios/asistencias/fecha/${fecha}`);

export const getAsistenciasPorAsignaturaYFecha = (idAsignatura, fecha) =>
    api.get(`/api/usuarios/asistencias/asignatura/${idAsignatura}/fecha/${fecha}`);


export const getAsistenciasPorUsuarioYAsignatura = (firebaseuid, idAsignatura) =>
    api.get(`/api/usuarios/asistencias/usuario/${firebaseuid}/asignatura/${idAsignatura}`);

// POST
// data: { fecha, estado, idAsignatura, usuario: { firebaseuid } }
export const registrarAsistencia = (data) =>
    api.post("/api/usuarios/asistencias", data);

export const eliminarAsistencia = (id) =>
    api.delete(`/api/usuarios/asistencias/${id}`);
